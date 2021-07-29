import styled from "styled-components";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container>
      <Message>Page not Found</Message>
      <Link href="/">
        <ButtonContainer>
          <ButtonTitle>Return Home</ButtonTitle>
        </ButtonContainer>
      </Link>
    </Container>
  );
}

const Container = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #02aab0 0%, #00cdac 100%);
`;

const Message = styled.h1`
  margin-bottom: 5px;
`;

const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: inherit;
  border: none;
  border-radius: 10px;
  padding: 15px 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-top: 8px;
  box-sizing: border-box;
  background-color: white;
  &:focus:not(:focus-visible) {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

const ButtonTitle = styled.span`
  font-size: 1.02rem;
  white-space: nowrap;
`;
