import React from 'react';
import { Image, ImageProps } from 'react-native';

interface ImageWrapperProps extends ImageProps {
  className?: string;
}

export default function ImageWrapper({
  className,
  source,
  style,
  resizeMode,
  ...rest
}: ImageWrapperProps) {
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      className={` ${className || ''}`}
      {...rest}
    />
  );
}
