import React, { Component } from "react";
import Joi from "joi-browser";
import { Input } from "./input";
import { TextBox } from "./textBox";
import { SubmitButton } from "./submitButton";

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

  renderButton(label, status) {
    return (
      <SubmitButton
        status={status}
        label={label}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
