import mongooseUser from "@/database/schemas/mongooseUser";
import MongoConnect from "@/libraries/MongoConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
// import { userAgent } from "next/server";

async function updateUserData(email) {
  await MongoConnect();

  const user = await mongooseUser.findOne({ email: email });

  const user2 = {
    username: user?.username,
    age: user?.age,
    email: user?.email,
    image: user?.image,
    name: user?.name,
    userID: user?.userID,
    role: user?.role,
    firstname: user?.firstname,
    lastname: user?.lastname,
  };

  return user2;
}

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials, req) {
        await MongoConnect();

        try {
          const user = await mongooseUser.findOne({ email: credentials.email });
          if (!user) throw new Error("No user found");

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) throw new Error("Credentials are invalid");

          const user2 = {
            username: user?.username,
            age: user?.age,
            email: user?.email,
            image: user?.image,
            name: user?.name,
            userID: user?.userID,
            role: user?.role,
            firstname: user?.firstname,
            lastname: user?.lastname,
          };

          // console.log("1");
          return user2;

          // user.password = "şşşşşşş it's a secret";

          // return user;
        } catch (error) {
          console.error(error);
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/user/login",
  },

  callbacks: {
    async session({ session, token }) {
      // console.log("asas", token);
      session.user = token;
      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      const newUser = await updateUserData(token.email);
      // console.log("sasa", token, newUser);

      return { ...token, ...newUser };
    },
  },
});

export { handler as GET, handler as POST };
