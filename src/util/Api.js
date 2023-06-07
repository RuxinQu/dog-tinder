const getOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const signIn = async (data, request) => {
  try {
    const response = await fetch(`http://localhost:3001/user/${request}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
