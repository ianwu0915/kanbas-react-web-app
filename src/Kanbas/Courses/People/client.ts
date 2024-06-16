import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};
