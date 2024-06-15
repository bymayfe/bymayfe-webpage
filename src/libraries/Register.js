const register = async (data) => {
  const response = await fetch("/api/auth/database", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
  //   console.log(data);
};

export { register };
