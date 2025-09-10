import axios from "axios";

const API_URL = "https://96b18888811a.ngrok-free.app"; // change to your backend URL

// Sends OTP to the user's email
export const sendOtp = async ({ email }) => {
  const response = await axios.post(`${API_URL}/api/verify/send`, { email });
  return response.data;
};

// Verifies OTP entered by the user
export const verifyOtp = async ({ email, otp }) => {
  const response = await axios.post(`${API_URL}/api/verify/verify`, { email, otp });
  return response.data;
};

export const signupUser = (userData) => axios.post(`${API_URL}/api/user/signup`, userData);


//export const signinUser = (userData) => axios.post(`${API_URL}/api/user/login`, userData);
export const signinUser = async ({ username, password }) => {
  const response = await axios.post(`${API_URL}/api/user/login`, { username, password });
  return response.data; // return only what backend sends
};
