import logger from "./logger";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import http from "./httpService";

export async function sendEmail(data) {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const template_params = {
    to_name: "Kevin Seabourne",
    from_name: data.name,
    reply_to: data.email,
    message_html: data.message,
  };
  return emailjs
    .send(
      "outlook",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      template_params,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    )
    .then((response) => {
      if (response && response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      if (error && error.status >= 400 && error.status < 500) {
        toast.error("An unexpected error has occurred 😔", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        logger.log(error);
      }
    });
}
