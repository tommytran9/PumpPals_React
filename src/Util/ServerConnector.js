import axios, { AxiosHeaders } from "axios";
import { AxiosProxy } from './Proxy';


const Axios = AxiosProxy(axios);

// username of user
let user = null;
export let getUsername = () => user;

/**
 * Creates the bearer token header
 * @param {AxiosHeaders} otherHeaderInfo
 * @returns 
 */
const createAuthHeader = otherHeaderInfo => ({
    headers: { ...(otherHeaderInfo || {}), Authorization: `Bearer ${sessionStorage.getItem('token')}`, }
});

const AxiosRequestWrapper = async _ => { }
/**
 * Private method to refresh the token if it expires
 * @param {String} username 
 * @param {String} password 
 */
async function refreshToken() {
    await login()
}

/**
 * Create an account and login
 * @param {String} username 
 * @param {String} password
 */
export async function createUser(username, password) {
    let { status } = await Axios.post("/api/create", { username, password })

    if (status !== 200) return false;

    return true //await login(username, password);
}

/**
 * Login to the backend. saves token to session storage
 * @param {String} username 
 * @param {String} password
 */
export async function login(username, password) {
    let { data, status } = await Axios.post("/api/authenticate", { username, password })

    if (status === 200) {
        sessionStorage.setItem('token', data)
        user = username;
        return true;
    }

    return false;
}

export async function getDirectory(){
    
}