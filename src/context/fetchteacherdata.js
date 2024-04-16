import {
  validatelogin,
  teacherleaves,
  getallteacher,
  getallrector,
} from "../util/Allapi";
import axios from "axios";
const fetchteacherData = async (
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

    console.log(res1.data.user);
    setUserData(res1.data.user);
    const res2 = await axios.get(
      `${teacherleaves}/${res1.data.user.teacherId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res2.data.allleaves);
    setleaves(res2.data.allleaves);
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
    alert(error);
  }
};
export default fetchteacherData;
