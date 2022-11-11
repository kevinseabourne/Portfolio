import React from "react";
import ReusableForm from "./common/reusableForm";
import styled from "styled-components";
import { sendEmail } from "../pages/api/email";
import AOS from "aos";
import "aos/dist/aos.css";
import Joi from "joi-browser";
import logger from ".././pages/api/logger";
import { toast } from "react-toastify";

class ContactForm extends ReusableForm {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.messageRef = React.createRef();
    this.timeout = React.createRef();
  }

  state = {
    data: {
      name: "",
      email: "",
      message: "",
    },
    errors: {},
    status: "idle",
  };

  Schema = {
    name: Joi.string()
      .required()
      .regex(/^[a-z][a-z]*[a-z][a-z\s]*$/i, "letter's only")

      .max(100)
      .options({
        language: {
          key: "",
          string: {
            regex: {
              name: "Enter a name (letter's only)",
            },
          },
        },
      }),
    email: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .options({
        language: {
          key: "",
          any: {
            empty: "Enter a email",
          },
          string: {
            email: "Enter a valid email",
          },
        },
      }),
    message: Joi.string()
      .required()
      .min(1)
      .options({
        language: {
          key: "",
          string: {
            min: "Message must be at least 1 character long",
          },
          any: {
            empty: "Enter a message",
          },
        },
      }),
  };

  doSubmit = async () => {
    this.setState({ status: "pending" });
    const response = await sendEmail(this.state.data);
    if (response && response.status === 200) {
      this.clearInputsAfterEmailSent();
      this.setState({ status: "resolved" });
      this.timeout.current = setTimeout(
        () => this.setState({ status: "idle" }),
        3000
      );
    } else {
      toast.error("An unexpected error has occurred 😔", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  clearInputsAfterEmailSent = () => {
    const data = { ...this.state.data };
    const updatedData = {};
    for (let value in data) {
      updatedData[value] = "";
    }
    this.setState({ data: updatedData });
  };

  render() {
    return (
      <Form>
        {this.renderInput("name", "Name", "", this.nameRef, 100)}
        {this.renderInput("email", "Email", "", this.emailRef, 200)}
        {this.renderTextBox("message", "Message", this.messageRef, 300)}
        {this.renderButton("Send", this.state.status)}
      </Form>
    );
  }
}

export default ContactForm;

const Form = styled.form`
  width: 100%;
  max-width: 460px;
`;
