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
export async function createUser(username, password, name, dateOfBirth, age, weight, height, fitnessGoals) {
  let { status, data } = await Axios.post("/api/create", {
    username,
    password,
    name,
    dateOfBirth,
    age,
    weight,
    height,
    fitnessGoals,
  });

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

/**
 * Deletes the user account
 * @returns {{success:boolean, response:String}}
 */
export async function deleteAccount() {
  let { data, status } = await Axios.delete(
    "/api/delete",
    await createAuthHeader(),
    {}
  );

  return { success: true, response: data };
}

/**
 * gets all files in the users directory
 * @returns {{success:boolean, response:String}}
 */
export async function getDirectory() {
  let { data, status } = await Axios.get(
    "/api/user/listFiles",
    await createAuthHeader(),
    { loggedIn: await checkLock() }
  );
  return { success: status === 200, response: data };
}

/**
 * uploads a file to the server
 * @param {String} directory
 * @param {File} file
 * @returns {{success:boolean, response:String}}
 */
export async function uploadFile(directory, file) {
  let currentTime = Date.now();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("directory", directory);

  let { data, status } = await Axios.post("/api/user/upload", formData, {
    ...(await createAuthHeader()),
    body: { loggedIn: await checkLock() },
  });

  console.log(Date.now() - currentTime + " ms taken for upload");

  return { success: status === 200, response: data };
}

/**
 * deletes a file in the server
 * @param {String} directory
 * @param {File} file
 * @returns {{success:boolean, response:String}}
 */
export async function deleteFile(name, directory) {
  let { data, status } = await Axios.delete("/api/user/deleteFile", {
    data: { name, directory },
    ...(await createAuthHeader()),
  });
  return { success: status === 200, response: data };
}

/**
 * deletes a folder in the server
 * @param {String} directory
 * @param {File} file
 * @returns {{success:boolean, response:String}}
 */
export async function deleteFolder(name, directory) {
  let { data, status } = await Axios.delete("/api/user/deleteFolder", {
    data: { name, directory },
    ...(await createAuthHeader()),
  });
  return { success: status === 200, response: data };
}

/**
 * downloads a file
 * @param {String} directory
 * @param {File} file
 * @returns {{success:boolean, response:String}}
 */
export async function downloadFile(filename, directory) {
  let currentTime = Date.now();
  const response = await fetch(
    `/api/user/download?filename=${encodeURIComponent(
      filename
    )}&directory=${encodeURIComponent(directory)}&loggedIn=${encodeURIComponent(
      await checkLock()
    )}`,
    {
      headers: (await createAuthHeader()).headers,
      method: "GET",
      credentials: "include",
    }
  );

  if (response.ok) {
    try {
      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });

      const blob = await new Response(stream).blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log("internal downloading error");
      return {
        success: false,
        response: "Internal Failure, Browser Incompatible",
      };
    }
  }

  console.log(Date.now() - currentTime + " ms taken for download");

  return { success: response.ok, response: response.statusText };
}

/**
 * Creates a new folder in the specified directory
 * @param {String} name
 * @param {String} directory
 * @returns {{success:boolean, response:String}}
 */
export async function createFolder(name, directory) {
  let { data, status } = await Axios.post(
    "/api/user/newfolder",
    { name, directory, loggedIn: await checkLock() },
    await createAuthHeader()
  );
  return { success: status === 200, response: data };
}

export async function getUsername() {
  let { data, status } = await Axios.get(
    "/api/user/username",
    await createAuthHeader()
  );
  return { success: status === 200, response: data };
}