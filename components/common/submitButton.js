import React from "react";
import styled, { keyframes, css } from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const SubmitButton = ({ status, label, handleSubmit }) => {
  return (
    <Button
      id={label}
      data-testid={label}
      onClick={(e) => handleSubmit(status, e)}
    >
      <TransitionGroup>
        {status === "idle" && (
          <CSSTransition
            in={status === "resolved"}
            classNames="idleAnimation"
            timeout={2000}
          >
            <Label>{label}</Label>
          </CSSTransition>
        )}

        {status === "pending" && (
          <CSSTransition
            in={status === "pending"}
            classNames="pendingExitAnimation"
            timeout={1500}
            appear
            unmountOnExit
          >
            <LoadingContainer viewBox="35 35 35 35">
              <Sv status={status} data-testid="loading-spinner">
                <circle
                  id="path"
                  cx="17.5"
                  cy="17.5"
                  r="16.1"
                  fill="none"
                ></circle>
              </Sv>
            </LoadingContainer>
          </CSSTransition>
        )}
        {status === "resolved" && (
          <CSSTransition
            in={status === "resolved"}
            classNames="resolvedExitAnimation"
            timeout={1500}
            unmountOnExit
          >
            <LoadingContainer viewBox="35 35 35 35">
              <Tick data-testid="sentCheckmarkIcon" />

              <Sv status={status} data-testid="resolved-spinner">
                <circle
                  id="path"
                  cx="17.5"
                  cy="17.5"
                  r="16.1"
                  fill="none"
                ></circle>
              </Sv>
            </LoadingContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Button>
  );
};

export default SubmitButton;

const checkmark = keyframes`
0% {
  height: 0em;
  width: 0em;
  border-right: 2.5px solid rgba(245, 245, 247, 0);
  border-top: 2.5px solid rgba(245, 245, 247, 0);
}
50% {
    border-top: 2.5px solid rgba(245, 245, 247, 1);
    border-right: 2.5px solid rgba(245, 245, 247, 0);
    width: 0.34em;
    height: 0em;

}
100% {
  height: 1em;
  width: 0.34em;
  border-right: 2.5px solid rgba(245, 245, 247, 1);
  border-top: 2.5px solid rgba(245, 245, 247, 1);
}
`;

const Button = styled.button`
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

const Label = styled.label`
  font-size: 1em;
  color: #f5f5eb;
  font-weight: 700;
  margin: auto;
  &.idleAnimation-enter {
    transform: scale(0);
    opacity: 0;
  }
  &.idleAnimation-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 0.5s ease;
    transition-delay: 2s;
  }
  &.idleAnimation-exit {
    transform: scale(1);
    opacity: 1;
  }
  &.idleAnimation-exit-active {
    transform: scale(0);
    opacity: 0;
    transition: all 0s ease;
    transition-delay: 0s;
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

const Sv = styled.svg`
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
    transform: scaleX(-1) rotate(135deg);
    border-top-right-radius: 9%;
    border-top-left-radius: 1px;
    border-bottom-right-radius: 1px;
  }
`;

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  &.pendingExitAnimation-enter {
  }
  &.pendingExitAnimation-enter-active {
    ${Sv} {
      animation: ${rotate} 2s linear infinite;
      & #path {
        animation: ${dash} 1.5s ease infinite;
      }
    }
  }
  &.pendingExitAnimation-enter-done {
    ${Sv} {
      animation: ${rotate} 2s linear infinite;
      & #path {
        animation: ${dash} 1.5s ease infinite;
      }
    }
  }
  &.pendingExitAnimation-exit {
  }
  &.pendingExitAnimation-exit-active {
    ${Tick} {
      &::after {
        animation: ${checkmark} 0.5s ease reverse;
        animation-delay: 1s;
      }
    }
    ${Sv} {
      & #path {
        animation: ${dashOut} 1.5s ease reverse;
      }
    }
  }

  &.resolvedExitAnimation-enter {
  }
  &.resolvedExitAnimation-enter-active {
    ${Tick} {
      &::after {
        animation: ${checkmark} 0.5s ease;
      }
    }
    ${Sv} {
      & #path {
        animation: ${dashOut} 1.5s ease;
      }
    }
  }
  &.resolvedExitAnimation-exit {
  }
  &.resolvedExitAnimation-exit-active {
    ${Tick} {
      &::after {
        animation: ${checkmark} 0.5s reverse;
        animation-delay: 1s;
      }
    }
    ${Sv} {
      & #path {
        animation: ${dashOut} 1.5s reverse;
      }
    }
  }
`;
