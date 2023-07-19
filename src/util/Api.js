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

export const getUser = async (id) => {
  try {
    const response = await fetch(`/user/one/${id}`, getOptions);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addMatch = async (myId, id) => {
  const response = await fetch(`/user/add-match?myId=${myId}&yourId=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  return response;
};

export const updateProfile = async (id, data) => {
  try {
    const response = await fetch(`/user/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

// export const deletePet = async (id) => {
//   try {
//     const pet = await getPetById(id);
//     const imagesArr = pet.images;
//     imagesArr.forEach(async (i) => {
//       const url = new URL(i.url);
//       await deleteImg(url.pathname.slice(1), id, i._id);
//     });
//     const response = await fetch(`/admin/delete-pet/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     window.location.reload();
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const uploadImgs = async (data) => {
  try {
    const response = await fetch("/user/upload-imgs", {
      mode: "cors",
      method: "POST",
      body: data,
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

export const deleteImg = async (key, petId, imgId) => {
  try {
    const response = await fetch(
      `/admin/delete-img/${key}/pet/${petId}/img/${imgId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};
