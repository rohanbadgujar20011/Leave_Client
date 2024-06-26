const host = process.env.REACT_APP_API_KEY;
export const register = `${host}student/signup`;
export const login = `${host}student/login`;
export const validatelogin = `${host}student/protected`;
export const createleave = `${host}leave/createleave`;
export const leavesbyemail = `${host}leave/getleavesbyemail`;
export const getallteacher = `${host}teacher/all`;
export const getallrector = `${host}rector/all`;
export const loginteacher = `${host}teacher/login`;
export const teacherleaves = `${host}teacher/getallleaves`;
export const approveleavebyteacher = `${host}teacher/approveleavebyteacher`;
export const rejectleavebyteacher = `${host}teacher/disapproveleavebyteacher`;
