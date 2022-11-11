import logger from "./logger";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      template_params,
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    )
    .then(
      (response) => {
        if (response && response.status === 200) {
          return response;
        }
      },
      (error) => {
        logger.log(error);
        return error;
      }
    );
}
