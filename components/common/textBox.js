import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const dangerIcon = "/images/caution.svg";
const crossIcon = "/images/cross-icon.svg";

export const TextBox = React.forwardRef(
  (
    {
      label,
      error,
      maxLength,
      onChange,
      onClick,
      name,
      doSubmit,
      value,
      ...rest
    },
    ref
  ) => {
    return (
      <Container>
        <Title>{label}</Title>
        <InputContainer error={error}>
          <InnerLabel
            htmlFor={label}
            data-testid={`${label}-label`}
            valueLength={value.length >= 1}
          >
            {label}
          </InnerLabel>
          <TextInput
            {...rest}
            ref={ref}
            type="text"
            name={name}
            onChange={onChange}
            placeholder={label}
            value={value}
            maxLength={maxLength}
            valueLength={value.length >= 1}
            data-testid={`${name}-input`}
            id={label}
          />
          <TransitionGroup component={null}>
            {value.length >= 1 && (
              <CSSTransition
                in={value.length >= 1}
                classNames="clearInput"
                timeout={200}
                unmountOnExit
              >
                <IconBox
                  image={crossIcon}
                  onClick={onClick}
                  valueLength={value.length >= 1}
                  data-testid={`${name}-iconBox`}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </InputContainer>
        <TransitionGroup component={null}>
          {error && (
            <CSSTransition
              in={typeof error !== "undefined"}
              classNames="errorAnimation"
              timeout={300}
              unmountOnExit
            >
              <Error error={error} data-testid={`${name}ErrorMessage`}>
                <Image
                  data-testid={`${name}-ErrorImage`}
                  image={dangerIcon}
                  error={error}
                />
                <ErrorMessage error={error}>{error}</ErrorMessage>
              </Error>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Container>
    );
  }
);

const Container = styled.div`
  width: 100%;
`;

const Title = styled.label`
  font-size: 1.26rem;
  font-weight: 700;
`;

const InputContainer = styled.div`
  border: "1px solid white";
  box-shadow: 0 10px 20px 0 hsla(0, 0%, 41.6%, 0.3);
  background-color: white;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  border-radius: 12px;
  height: 200px;
  width: 100%;
  margin-top: 6.2px;
  margin-bottom: 19px;
  outline: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
  &:focus {
    border-color: #999999;
    box-shadow: 0 0 0 1px #999999;
    transition: all 0.3s ease-in-out;
  }
  &:focus-within {
    font-weight: 500;
    font-size: 14px;
    color: rgb(51, 51, 51);
    outline: none;
    transition: all 0.3s ease-in-out;
  }
`;

const InnerLabel = styled.label`
  font-family: "FuturaStd-Heavy", sans-serif;
  letter-spacing: 1.2px;
  font-size: 12px;
  letter-spacing: 0px;
  margin-top: 7.2px;
  margin-bottom: -2px;
  transform: ${({ valueLength }) =>
    valueLength ? "translateY(0px)" : "translateY(10px)"};
  padding-left: 11px;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  opacity: ${({ valueLength }) => (valueLength ? 1 : 0)};
  transition: all 0.2s ease;
`;

const TextInput = styled.textarea`
  padding: ${({ valueLength }) =>
    valueLength ? "24.5px 40px 0px 12px" : "14.5px 12px 0px 12px"};
  border: none;
  transition: all 0.2s;
  border-radius: 12px;
  font-family: "FuturaStd-Heavy", sans-serif;
  letter-spacing: 1.2px;
  box-sizing: border-box;
  outline: none;
  cursor: text;
  height: 100%;
  width: 100%;
  min-height: 42px;
  font-size: 14px;
  font-weight: 500;
  color: rgb(51, 51, 51);
  resize: none;
`;

const IconBox = styled.div`
  width: 44px;
  height: 40px;
  top: 7px;
  right: 0px;
  position: absolute;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: transparent;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 31%;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
  }
  &.clearInput-enter {
    transform: rotate(45deg) scale(0);
    opacity: 0;
  }
  &.clearInput-enter-active {
    transform: rotate(0deg) scale(1);
    transition: all 0.25s ease;
    opacity: 1;
  }
  &.clearInput-exit {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  &.clearInput-exit-active {
    transform: rotate(45deg) scale(0);
    opacity: 0;
    transition: all 0.25s ease;
  }
`;

const Error = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;
  &.errorAnimation-enter {
    transform: scale(0.4);
    opacity: 0;
  }
  &.errorAnimation-enter-active {
    transform: scale(1);
    transition: all 0.2s ease-in-out;
    opacity: 1;
  }
  &.errorAnimation-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.errorAnimation-exit-active {
    transform: scale(0.4);
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }
`;

const jelloHorizontal = keyframes`
  0% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
  30% {
    -webkit-transform: scale3d(1.25, 0.75, 1);
            transform: scale3d(1.25, 0.75, 1);
  }
  40% {
    -webkit-transform: scale3d(0.75, 1.25, 1);
            transform: scale3d(0.75, 1.25, 1);
  }
  50% {
    -webkit-transform: scale3d(1.15, 0.85, 1);
            transform: scale3d(1.15, 0.85, 1);
  }
  65% {
    -webkit-transform: scale3d(0.95, 1.05, 1);
            transform: scale3d(0.95, 1.05, 1);
  }
  75% {
    -webkit-transform: scale3d(1.05, 0.95, 1);
            transform: scale3d(1.05, 0.95, 1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
            transform: scale3d(1, 1, 1);
  }
`;

const shakeBottom = keyframes`
  0%,
  100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
    -webkit-transform-origin: 50% 100%;
            transform-origin: 50% 100%;
  }
  10% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
  20%,
  40%,
  60% {
    -webkit-transform: rotate(-4deg);
            transform: rotate(-4deg);
  }
  30%,
  50%,
  70% {
    -webkit-transform: rotate(4deg);
            transform: rotate(4deg);
  }
  80% {
    -webkit-transform: rotate(-2deg);
            transform: rotate(-2deg);
  }
  90% {
    -webkit-transform: rotate(2deg);
            transform: rotate(2deg);
  }
`;

const Image = styled.div`
  height: 22px;
  width: 24px;
  margin-left: 6px;
  margin-right: 12px;
  background: url(${(props) => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  animation: ${jelloHorizontal} 0.9s both;
  transiton: all 0.3s ease;
  &:hover {
    animation: ${shakeBottom} 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      infinite both;
  }
`;

const ErrorMessage = styled.div`
  color: white;
  margin: 0.57143em 0 0.28571em;
  line-height: 18px;
  font-weigth: 300;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: default;
  }
`;
