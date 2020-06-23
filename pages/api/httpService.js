import axios from "axios";
import logger from "./logger";
import { toast } from "react-toastify";

/* istanbul ignore file */
// - tested in Cypress - //
axios.interceptors.response.use(null, (error) => {
  if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    logger.log(error);
    return Promise.reject(error);
  }
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
