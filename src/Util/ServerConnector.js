import axios, { AxiosHeaders } from "axios";
import { AxiosProxy } from "./Proxy";

const Axios = AxiosProxy(axios);
window.Axios = Axios;

async function checkLock() {
  let val;
  if (!localStorage.getItem("token")) {
    val = await new Promise((resolve) => setTimeout(resolve, 500));
    return await checkLock(!val);
  } else {
    return true;
  }
}

/**
 * Creates the bearer token header
 * @param {AxiosHeaders} otherHeaderInfo
 * @returns
 */
const createAuthHeader = async (otherHeaderInfo) => ({
  checkLock: await checkLock(),
  headers: {
    ...(otherHeaderInfo || {}),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//checks to see if user is already logged in
export async function loginStillValid() {
  if (localStorage.getItem("token")) {
    let { status, data } = await Axios.get(
      "/api/refresh",
      await createAuthHeader(),
      localStorage.getItem("token")
    );
    if (status === 200) {
      localStorage.setItem("token", data);
      autoRefreshToken();
      return true;
    }

    return false;
  }
}

let timeoutID = null;
const TOKEN_REFRESH_TIME = 1000 * 60 * 60; // 1 hour (token expires after 2)
function autoRefreshToken(time = TOKEN_REFRESH_TIME) {
  clearTimeout(timeoutID); // in case of duplicate refresh

  timeoutID = setTimeout(async () => {
    let { status, data } = await Axios.get(
      "/api/refresh",
      await createAuthHeader(),
      localStorage.getItem("token")
    );
    if (status === 200) {
      localStorage.setItem("token", data);
      autoRefreshToken(time);
    } else {
      localStorage.removeItem("token");
    }
  }, time);
}

/**
 * Create an account and login
 * @param {String} username
 * @param {String} password
 * @returns {{success:boolean, response:String}}
 */
export async function createUser(
  username,
  password,
  name,
  dateOfBirth,
  gender,
  weight,
  height,
  fitnessGoals,
  bio
) {
  let { status, data } = await Axios.post("/api/create", {
    username,
    password,
    name,
    dateOfBirth,
    gender,
    weight,
    height,
    fitnessGoals,
    bio,
  });

  console.log(
    username,
    password,
    name,
    dateOfBirth,
    gender,
    weight,
    height,
    fitnessGoals,
    bio,
  );
  if (status !== 200) return { success: false, response: data };

  return await login(username, password);
}

/**
 * Login to the backend. saves token to session storage
 * @param {String} username
 * @param {String} password
 * @returns {{success:boolean, response:String}}
 */
export async function login(username, password) {
  let currentTime = Date.now();

  let { data, status } = await Axios.post("/api/authenticate", {
    username,
    password,
  });

  console.log(Date.now() - currentTime + " ms taken for login");

  if (status === 200) {
    localStorage.setItem("token", data);
    setTimeout(() => autoRefreshToken(), 5000);
    return { success: true, response: data };
  }

  return { success: false, response: data };
}

export async function getUsername() {
  let { data, status } = await Axios.get(
    "/api/user/username",
    await createAuthHeader()
  );
  return { data };
}

/**
 * Uploads a profile picture
 * @param {File} file - The profile picture file
 * @returns {{success:boolean, response:String}}
 */
export async function uploadProfilePicture(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await Axios.put(
      "/api/pfp",
      formData,
      await createAuthHeader()
    );
    return { success: true, response: response.data };
  } catch (error) {
    if (error.response) {
      return { success: false, response: error.response.data };
    } else {
      return { success: false, response: "Failed to upload profile picture." };
    }
  }
}

/**
 * Uploads a picture
 * @param {File} file - The  picture file'
 * @param {String} id - The id of the post
 * @returns {{success:boolean, response:String}}
 */
export async function uploadPicturePost(file, post) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "post",
    new Blob([JSON.stringify(post)], { type: "application/json" })
  );

  try {
    const response = await Axios.post(
      "/api/posts/create/picture",
      formData,
      await createAuthHeader()
    );
    return { success: true, response: response.data };
  } catch (error) {
    if (error.response) {
      return { success: false, response: error.response.data };
    } else {
      return { success: false, response: "Failed to upload profile picture." };
    }
  }
}

/**
 * Retrieves a post's picture
 * @param {String} id - The id of the post
 * @returns {Promise<Object>} - The response entity containing the post picture
 */
export async function getPostPicture(id) {
  try {
    const response = await Axios.get(`/api/posts/picture/${id}`, {
      responseType: "arraybuffer",
      ...(await createAuthHeader()),
    });
    if (response.status !== 200) {
      return null;
    }
    // Create a Blob with type 'image/png'
    const blob = new Blob([response.data], { type: "image/png" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to retrieve post picture:", error);
    return "Failed to download picture.";
  }
}


/**
 * Retrieves the profile picture for a given username
 * @param {String} username - The username of the user
 * @returns {Promise<String>} - The URL of the profile picture
 */
export async function getProfilePicture(username) {
  const fileExtension = "png";
  const targetLocation = `/api/pfp/${username}.${fileExtension}`;

  try {
    const response = await Axios.get(targetLocation, {
      responseType: "arraybuffer",
      ...(await createAuthHeader()),
    });
    if (response.status !== 200) {
      return null;
    }
    const imageBytes = new Uint8Array(response.data);
    const blob = new Blob([imageBytes], { type: "image/png" });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error("Failed to retrieve profile picture:", error);
    return null;
  }
}

// returns a list of all recent posts
export async function getAllPosts() {
  try {
    const response = await Axios.get("/api/posts", await createAuthHeader());
    return response.data;
  } catch (error) {
    console.error("Failed to get all posts:", error);
    return [];
  }
}

// returns a list of all posts by a user
export async function getPostsByUsername(username) {
  try {
    const response = await Axios.get(
      `/api/posts/${username}`,
      await createAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get posts by username:", error);
    return [];
  }
}

// creates a new post
export async function createPost(post) {
  try {
    const response = await Axios.post(
      "/api/posts/create",
      post,
      await createAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
    return null;
  }
}

// updates a post
export async function updatePost(post) {
  try {
    const response = await Axios.put(
      "/api/posts/update",
      post,
      await createAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update post:", error);
    return null;
  }
}

// deletes a post
export async function deletePost(id) {
  try {
    await Axios.delete(`/api/posts/delete/${id}`, await createAuthHeader());
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}

// returns a list of posts that a user follows
export async function getFollowingPosts() {
  try {
    const response = await Axios.get(
      "/api/posts/following",
      await createAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get following posts:", error);
    return [];
  }
}

// likes a post
export async function likePost(id) {
  try {
    await Axios.put(`/api/posts/like/${id}`, null, await createAuthHeader());
  } catch (error) {
    console.error("Failed to like post:", error);
  }
}

// unlikes a post
export async function unlikePost(id) {
  try {
    await Axios.put(`/api/posts/unlike/${id}`, null, await createAuthHeader());
  } catch (error) {
    console.error("Failed to unlike post:", error);
  }
}

// comments on a post
export async function commentPost(id, comment) {
  try {
    await Axios.put(
      `/api/posts/comment/${id}`,
      comment,
      await createAuthHeader()
    );
  } catch (error) {
    console.error("Failed to comment on post:", error);
    return error;
  }
}

// uncomments on a post
export async function uncommentPost(id, comment) {
  try {
    await Axios.put(
      `/api/posts/uncomment/${id}`,
      comment,
      await createAuthHeader()
    );
  } catch (error) {
    console.error("Failed to uncomment on post:", error);
  }
}

/**
 * Retrieves user information by username
 * @param {String} username - The username of the user
 * @returns {Promise<ResponseEntity<Optional<UserInfo>>>} - The user information
 */
export async function getUserByUsername(username) {
  try {
    const response = await Axios.get(
      `/api/user/${username}`,
      await createAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get user by username:", error);
    return null;
  }
}

/**
 * Create an account and login
 * @param {String} username
 * @param {String} password
 * @param {String} name
 * @param {String} dateOfBirth
 * @param {Number} weight
 * @param {Number} height
 * @param {String} fitnessGoals
 * @returns {{success:boolean, response:String}}
 */
export async function updateUser(
  name,
  dateOfBirth,
  gender,
  weight,
  height,
  fitnessGoals,
  bio,
) {
  let { status, data } = await Axios.put(
    "/api/user/update",
    {
      name,
      dateOfBirth,
      gender,
      weight,
      height,
      fitnessGoals,
      bio,
    },
    await createAuthHeader()
  );

  console.log(
    name,
    dateOfBirth,
    gender,
    weight,
    height,
    fitnessGoals,
    bio,
  );
  if (status !== 200) return { success: false, response: data };

  // Additional code here if needed

  return { success: true, response: data };
}

// follow user
export async function followUser(username) {
  const response = await Axios.put(
    `/api/user/follow/${username}`,
    null,
    await createAuthHeader()
  );
  return response.data;
}

// unfollow user
export async function unfollowUser(username) {
  const response = await Axios.put(
    `/api/user/unfollow/${username}`,
    null,
    await createAuthHeader()
  );
  return response.data;
}

// checks if user is following another user
export async function isFollowing(username) {
  const response = await Axios.get(
    `/api/user/checkfollow/${username}`,
    await createAuthHeader()
  );
  return response.data;
}

// returns a list of recommended users
export async function getRecommendedUsers() {
  const response = await Axios.get(
    "/api/user/recommended",
    await createAuthHeader()
  );
  console.log(response.data);
  return response.data;
}

// get all workouts
export async function getAllWorkouts() {
  const response = await Axios.get('/api/workout/all', await createAuthHeader());
  return response.data;
}

// get all workouts for a user
export async function getWorkoutsByUsername(username) {
  const response = await Axios.get(`/api/workout/${username}`, await createAuthHeader());
  return response.data;
}

// get a workout by workoutId
export async function getWorkoutByWorkoutId(workoutId) {
  const response = await Axios.get(`/api/workout/id/${workoutId}`, await createAuthHeader());
  return response.data;
}

// get a workout by username and date
export async function getWorkoutByUsernameAndDate(username, date) {
  const response = await Axios.get(`/api/workout/${username}/${date}`, await createAuthHeader());
  return response.data;
}

// get all workouts for a date
export async function getWorkoutsByDate(date) {
  const response = await Axios.get(`/api/workout/date/${date}`, await createAuthHeader());
  return response.data;
}

// create a workout
export async function createWorkout(workout) {
  const response = await Axios.post('/api/workout/create', workout, await createAuthHeader());
  return response.data;
}

// get user workouts
export async function getUserWorkouts() {
  const response = await Axios.get('/api/workout/user', await createAuthHeader());
  return response.data;
}

// get workouts from users the user follows
export async function getFollowingWorkouts() {
  const response = await Axios.get('/api/workout/following', await createAuthHeader());
  return response.data;
}