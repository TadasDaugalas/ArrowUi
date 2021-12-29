import HTTP from "./index";

const getAllPic = () => HTTP.get('/files');
export {getAllPic};