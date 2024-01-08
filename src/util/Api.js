const baseUrl = "https://dog-tinder-backend-da6b7ebb15b3.herokuapp.com";
// const baseUrl = "http://localhost:3001";

const generateOptions = (method, token) => {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

//login or register
export const signIn = async (data, request) => {
  try {
    const response = await fetch(`${baseUrl}/user/${request}`, {
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

export const getUsers = async (token) => {
  const options = generateOptions("GET", token);
  try {
    const response = await fetch(`${baseUrl}/user/all`, options);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id, token) => {
  const options = generateOptions("GET", token);
  try {
    const response = await fetch(`${baseUrl}/user/one/${id}`, options);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (id, data, token) => {
  const options = generateOptions("PUT", token);
  try {
    const response = await fetch(`${baseUrl}/user/profile/${id}`, {
      ...options,
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addMatch = async (myId, id, token) => {
  const options = generateOptions("PUT", token);
  const response = await fetch(
    `${baseUrl}/user/add-match?myId=${myId}&yourId=${id}`,
    {
      ...options,
      body: JSON.stringify({ id }),
    }
  );
  return response;
};

export const uploadImgs = async (data, token) => {
  try {
    const response = await fetch(`${baseUrl}/user/upload-imgs`, {
      mode: "cors",
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

export const deleteImg = async (key, userId, imgId, token) => {
  const options = generateOptions("DELETE", token);
  try {
    const response = await fetch(
      `${baseUrl}/user/delete-img/${key}/user/${userId}/img/${imgId}`,
      options
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getMessage = async (myId, yourId, token) => {
  const options = generateOptions("GET", token);
  try {
    const response = await fetch(
      `${baseUrl}/message/one?fromId=${myId}&receiveId=${yourId}`,
      options
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
