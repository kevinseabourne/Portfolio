import React, { useState, useEffect } from "react";
import ReusableForm from "./common/reusableForm";
import styled, { keyframes } from "styled-components";
import { sendEmail } from "../pages/api/email";
import Joi from "joi-browser";

class ContactForm extends ReusableForm {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
    this.messageRef = React.createRef();
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
    }
    this.setState({ status: "rejected" });
  };

  clearInputsAfterEmailSent = () => {
    const data = { ...this.state.data };
    const updatedData = {};
    for (let value in data) {
      updatedData[value] = "";
    }
    // if (data.hasOwnProperty(value)) {
    this.setState({ data: updatedData });
  };

  render() {
    return (
      <Form>
        {this.renderInput("name", "Name", "", this.nameRef)}
        {this.renderInput("email", "Email", "", this.emailRef)}
        {this.renderTextBox("message", "Message", this.messageRef)}
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
