import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT,
});
const linstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

export default instance;
export { linstance };
