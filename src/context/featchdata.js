import {
  validatelogin,
  leavesbyemail,
  getallteacher,
  getallrector,
} from "../util/Allapi";
import { useAuth } from "./AuthContext";
import axios from "axios";

const fetchData = async (
  token,
  userRole,
  setUserData,
  setleaves,
  setteacher,
  setrector
) => {
  try {
    const res1 = await axios.get(validatelogin, {
      headers: {
        Authorization: token,
      },
    });
    console.log("Log 1");
    console.log(res1.data.user);
    setUserData(res1.data.user);

    const res2 = await axios.get(`${leavesbyemail}/${res1.data.user.email}`);
    console.log("Log 2");
    console.log(res2.data.leaves);
    setleaves(res2.data.leaves);
    const res3 = await axios.get(`${getallteacher}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log("Log 3");
    console.log(res3.data);
    setteacher(res3.data);

    const res4 = await axios.get(`${getallrector}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log("Log 3");
    console.log(res4.data);
    setrector(res4.data);
  } catch (error) {
    alert(error.response.data.message);
    console.log(error.response.data.message);
    localStorage.clear();
  }
};
export default fetchData;
