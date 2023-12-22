const register = async () => {
  const request = await fetch("http://localhost:5057/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "aliddd",
      email: "heww11qll@gmail.com",
      password: "rrwt2311",
    }),
  });
  const response = await request.json();
  console.log(response);
};
// register();

// TOKEN - EMAIL, MongoDB_ID, SALT;
