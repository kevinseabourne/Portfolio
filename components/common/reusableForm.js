import React, { Component } from "react";
import Joi from "joi-browser";
import { Input } from "./input";
import { TextBox } from "./textBox";
import styled, { keyframes, css } from "styled-components";
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
    const handleLoading = (status, label) => {
      if (status === "pending" || status === "resolved") {
        return (
          <LoadingContainer viewBox="35 35 35 35">
            {status === "resolved" && <Tick data-testid="sentCheckmarkIcon" />}
            <Sv status={status} data-testid="loading-spinner">
              <circle
                id="path"
                cx="17.5"
                cy="17.5"
                r="16.1"
                fill="none"
              ></circle>
            </Sv>
            {/* <Loading>
              <Spinner status={status} data-testid="loading-spinner"></Spinner>
              {status === "resolved" && <Tick />}
            </Loading> */}
          </LoadingContainer>
        );
      } else {
        return label;
      }
    };
    return (
      <SubmitButton
        id={label}
        data-testid={label}
        onClick={(e) => this.handleSubmit(status, e)}
      >
        {handleLoading(status, label)}
      </SubmitButton>
    );
  };
}

const SubmitButton = styled.button`
  min-width: 91.3px;
  min-height: 49px;
  max-height: 49px;
  font-size: 1.1em;
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

// try svg

const rotate = keyframes`
 100% {
   transform: rotate(360deg);
 }
`;

const dash = keyframes`
0% {
stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
}

50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
}
100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
}
`;

const dashOut = keyframes`
0% {
stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
}
100% {
    stroke-dasharray: 200, 200;
    stroke-dashoffset: 1;
}
`;

const pendingAnimation = css`
  ${dash} 1.5s ease infinite;
`;

const resolvedAnimation = css`
  ${dashOut} 1.5s ease forwards;
`;

const rotateAnimation = css`
  ${rotate} 2s linear infinite;
`;

const Sv = styled.svg`
  animation: ${({ status }) =>
    status === "resolved" ? "none" : rotateAnimation};
  height: 35px;
  width: 35px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  & #path {
    width: 35px;
    height: 35px;
    margin-left: 20px;
    display: block;
    fill: transparent;
    stroke: white;
    stroke-linecap: round;
    stroke-dasharray: ${({ status }) => (status === "resolved" ? 1 : 283)};
    stroke-dashoffset: 280;
    stroke-width: 1.4px;
    transform-origin: 50% 50%;
    animation: ${({ status }) =>
      status === "resolved" ? resolvedAnimation : pendingAnimation};
    animation-iteration-count: ${({ status }) =>
      status === "resolved" ? 1 : "infinite"};
  }
`;

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const afterAnimation = keyframes`
 0% {
   height: 0%;
   transform: scaleX(0);
   border-bottom: 1.4px solid rgb(33, 75, 255, 0);
 }
 100% {
    transform: scaleX(1);
    border-bottom: 1.4px solid rgb(33, 75, 255, 1);
 }
`;

const checkmark = keyframes`
0% {
  height: 0;
  width: 0em;
  border-right: 2.5px solid rgba(245, 245, 247, 0);
  border-top: 2.5px solid rgba(245, 245, 247, 0);
}
50% {
    border-top: 2.5px solid rgba(245, 245, 247, 1);
    width: 0.34em;
    height: 0;

}
100% {
  height: 1em;
      width: 0.34em;
  border-right: 2.5px solid rgba(245, 245, 247, 1);
  border-top: 2.5px solid rgba(245, 245, 247, 1);
}
`;

const Tick = styled.div`
  height: 1em;
  width: 0.34em;
  &::after {
    opacity: 1;
    height: 1em;
    width: 0.34em;
    transform-origin: left top;
    border-right: 2.5px solid rgba(245, 245, 247, 1);
    border-top: 2.5px solid rgba(245, 245, 247, 1);
    content: "";
    left: 0px;
    right: 12px;
    margin: 0 auto;
    top: 27.6px;
    position: absolute;
    animation: ${checkmark} 0.5s ease;
    transform: scaleX(-1) rotate(135deg);
    border-top-right-radius: 9%;
    border-top-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }
`;
