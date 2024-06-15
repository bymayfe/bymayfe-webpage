import { NextResponse } from "next/server";
import mongooseUser from "@/database/schemas/mongooseUser";
import MongoConnect from "@/libraries/MongoConnect";
import { hash } from "bcrypt";
// import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";

export async function GET(req) {
  return NextResponse.json({ message: "Hello from the API" });
}
export async function POST(request) {
  await MongoConnect();

  const headersList = headers();
  const referer = headersList.get("referer");
  if (
    !referer ||
    !referer.startsWith(process.env.HOST || process.env.DEV_HOST)
  ) {
    return NextResponse.json(
      { error: "Datas are missing :)" },
      { status: 400 }
    );
  }
  // return false;
  try {
    const allCredentials = await request.json();
    const { username, email, password } = allCredentials;
    if (!email || !password)
      return NextResponse.json({ error: "Datas are missing" }, { status: 400 });

    // console.log("allCredentials", allCredentials);
    // return false;

    const usernameExists = await mongooseUser.findOne({ username });
    const emailExists = await mongooseUser.findOne({ email });

    if (usernameExists || emailExists)
      return NextResponse.json({ error: "User already exists" });

    if (password.length < 8)
      return NextResponse.json(
        {
          error: "Password must be at least 8 characters long",
        },
        { status: 409 }
      );

    const datas = await mongooseUser.find({});
    const idStarter = Number("100000");
    const dataMap = datas.map((x) => (x.userID ? x.userID : idStarter));
    const maxID = Math.max(...dataMap);
    const userID = datas[0] ? maxID + 1 : idStarter;

    // console.log("datas", datas);
    // console.log("idStarter", idStarter);
    // console.log("dataMap", dataMap);
    // console.log("maxID", maxID);
    // console.log("userID", userID);

    const hashedPassword = await hash(password, 12);

    // ROLE IS MEMBER BY DEFAULT
    allCredentials.role = "MEMBER";

    // ADD USER ID AND HASHED PASSWORD
    allCredentials.userID = userID;
    allCredentials.password = hashedPassword;
    allCredentials.username = username ? username : userID.toString();

    const User = allCredentials;

    const data = await mongooseUser.create(User);
    return NextResponse.json({ success: true, data: data });
  } catch (error) {
    if (error.message === "Unexpected end of JSON input")
      return NextResponse.json({ error: "Data is missing" }, { status: 400 });
    else {
      console.error(error);
      return NextResponse.json({ error: "another err kekw" }, { status: 404 });
    }
  }
}

export async function DELETE(req) {}
