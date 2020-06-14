import logger from "./logger";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

export async function sendEmail(data) {
  // Cypress Testing Coverage //
  /* istanbul ignore file */
  const template_params = {
    to_name: "Kevin Seabourne",
    from_name: data.firstName,
    reply_to: data.Email,
    message_html: data.Message,
  };
  return emailjs
    .send(
      "outlook",
      process.env.EMAILJS_TEMPLATEID,
      template_params,
      process.env.EMAILJS_USERID
    )
    .then((response) => {
      toast.success("Email Sent ✅", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
