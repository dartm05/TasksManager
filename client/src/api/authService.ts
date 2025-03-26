import axios from "axios";
import { User } from "../utils/types";

const API_BASE_URL = "http://127.0.0.1:5001/task-manager-48639/us-central1/api/users";

export const loginUser = async (email: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${email}`);
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid credentials or server error.");
  }
};

export const registerUser = async (email: string): Promise<User> => {
  try {
    const response = await axios.post(API_BASE_URL, { email });
    console.log("Register response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw new Error("Server error.");
  }
}
