import React, { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styled from "styled-components";
import { motion } from "framer-motion";

const ImageLoader = ({
  src,
  srcSet,
  width,
  maxWidth,
  placeholderSize,
  backgroundColor,
  alt,
  itemId,
  keyValue,
  dataTestId,
  onClick,
  borderRadius,
  hover,
  duration,
  centerImage,
  loadingSkeleton,
  contentLoaded,
  handleOnLoadOutside,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  boxShadow,
  y,
  x,
  zIndex,
  blur,
  scale,
  opacity,
  delay,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = () => {
    setIsLoaded(true);
    if (handleOnLoadOutside) {
      handleOnLoadOutside();
    }
  };

  const animation = {
    hidden: {
      opacity: opacity == undefined ? 1 : opacity,
      y: y ? y : 0,
      x: x ? x : 0,
      scale: scale == undefined ? 1 : scale,
      filter: blur ? `blur(${blur}px)` : `blur(0px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: `blur(0px)`,
      transition: {
        type: "spring",
        duration: duration ? duration : undefined,
        delay: delay ? delay : 0,
      },
    },
  };

  return (
    <Container
      isLoaded={isLoaded}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      centerImage={centerImage}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      maxWidth={maxWidth}
      width={width}
      boxShadow={boxShadow}
    >
      {loadingSkeleton && !isLoaded && (
        <SkeletonAnimation
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            type: "spring",
            repeat: Infinity,
            duration: 2.8,
          }}
        />
      )}
      <ImageContainer
        borderRadius={borderRadius}
        hover={hover}
        variants={animation}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
      >
        <Placeholder
          layout
          borderRadius={borderRadius}
          onClick={onClick}
          contentLoaded={contentLoaded}
          zIndex={zIndex}
          placeholderSize={placeholderSize}
        />

        {src && (
          <Image
            src={src}
            alt={alt}
            onLoadingComplete={handleLoadComplete}
            objectFit="fill"
            layout="fill"
          />
        )}
      </ImageContainer>
    </Container>
  );
};

export default ImageLoader;

const Container = styled(motion.div)`
  position: relative;
  background-color: ${({ isLoaded, backgroundColor }) =>
    backgroundColor ? (isLoaded ? "transparent" : "white") : "transparent"};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  margin: ${({ centerImage }) => (centerImage ? "auto" : "none")};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : "none")};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom : "none"};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "none")};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : "none")};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "100%")};
  width: ${({ width }) => (width ? width : "100%")};
  box-shadow: ${({ boxShadow }) => (boxShadow ? boxShadow : "none")};
`;

const ImageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  background: transparent;
  z-index: ${({ hoverColor }) => (hoverColor ? "auto" : "0")};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  overflow: ${({ src }) => (src ? "default" : "hidden")};
  &:hover {
    cursor: ${({ hover }) => (hover ? "pointer" : "default")};
  }
`;

const Placeholder = styled(motion.div)`
  width: 100%;
  padding-bottom: ${({ placeholderSize }) =>
    placeholderSize ? placeholderSize : "100%"};
  background: ${({ placeholderColor }) =>
    placeholderColor ? placeholderColor : "transparent"};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "0px")};
  box-sizing: border-box;
`;

const SkeletonAnimation = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    0.25turn,
    transparent 0%,
    #d1d5db 25%,
    transparent 50%
  );

  position: absolute;
  vertical-align: middle;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
