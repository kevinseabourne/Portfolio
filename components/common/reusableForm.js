import React, { Component } from "react";
import Joi from "joi-browser";
import { Input } from "./input";
import { TextBox } from "./textBox";
import styled from "styled-components";
const loadingIcon = "/images/loadingIcon.svg";

export default class ReusableForm extends Component {
  state = {
    data: {},
    errors: {},
    errorsOnChange: false,
  };

  validate = () => {
    const options = { abortEarly: false };
    const data = { ...this.state.data };

    const { error } = Joi.validate(data, this.Schema, options);
    if (!error) {
      return null;
    }
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.Schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (status, e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      this.setState({ errorsOnChange: true });
      return;
    }
    this.setState({ errorsOnChange: false });
    if (status !== "pending") {
      this.doSubmit();
    }
  };

  handleChange = ({ currentTarget }) => {
    const { errorsOnChange } = this.state;
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMesssage = this.validateProperty(currentTarget);

    if (errorMesssage) {
      errors[currentTarget.name] = errorMesssage;
    } else {
      delete errors[currentTarget.name];
    }

    data[currentTarget.name] = currentTarget.value;
    this.setState({ data });

    if (errorsOnChange) {
      this.setState({ errors });
    }
  };

  ClearInputOnClick = (name, ref) => {
    const data = { ...this.state.data };
    data[name] = "";
    this.setState({ data });
    ref.current.focus();
  };

  renderInput(name, label, maxLength, ref, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        ref={ref}
        onChange={this.handleChange}
        onClick={() => this.ClearInputOnClick(name, ref)}
        error={errors[name]}
        maxLength={maxLength}
      />
    );
  }

  renderTextBox(name, label, ref) {
    const { data, errors } = this.state;
    return (
      <TextBox
        name={name}
        value={data[name]}
        label={label}
        ref={ref}
        onChange={this.handleChange}
        onClick={() => this.ClearInputOnClick(name, ref)}
        error={errors[name]}
      />
    );
  }

  renderButton = (label, status) => {
    return (
      <SubmitButton
        id={label}
        data-testid={label}
        onClick={(e) => this.handleSubmit(status, e)}
      >
        {status === "pending" ? (
          <Loading data-testid="loading-spinner" loadingIcon={loadingIcon} />
        ) : (
          label
        )}
      </SubmitButton>
    );
  };
}

const SubmitButton = styled.button`
  min-width: 91.3px;
  min-height: 49px;
  font-size: 1.1em;
  padding: 14px 24px;
  border-radius: 40px;
  border: none;
  color: #f5f5eb;
  margin-top: 30px;
  font-weight: 700;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  background-color: #08aeea;
  background: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
  -webkit-transform: translateY(0px) scale(1);
  -ms-transform: translateY(0px) scale(1);
  transform: translateY(0px) scale(1);
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  position: relative;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
    transform: scale(1) translateY(-3.5px);
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0 auto;
  background-image: url(${(props) => props.loadingIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 42%;
`;
