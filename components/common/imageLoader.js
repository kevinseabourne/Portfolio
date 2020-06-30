import React, { useState } from "react";
import styled from "styled-components";
import LazyLoad from "react-lazyload";

const ImageLoader = ({ src, width, alt, keyValue, dataTestId, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageContainer width={width}>
      <LazyLoad key={keyValue} once={true} offset={50} debounce={false}>
        <Image
          isLoaded={isLoaded}
          onLoad={onLoad}
          src={src}
          alt={alt}
          key={keyValue}
          data-testid={dataTestId}
          delay={delay}
        />
      </LazyLoad>
    </ImageContainer>
  );
};

export default ImageLoader;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 13.3px;
  width: ${({ width }) => width};
  height: 0px;
  padding-bottom: 100%;
  position: relative;
  background-color: "transparent";
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transform: ${({ isLoaded }) => (isLoaded ? "scale(1)" : "scale(0.5)")};
  transition: all 250ms;
  transition-delay: ${({ delay }) => `${delay}ms`};
`;
