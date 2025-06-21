import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import CustomText from 'components/arch/components/CustomText.tsx';
import clsx from 'clsx';

interface CustomButtonProps extends Omit<TouchableOpacityProps, 'className'> {
  title: string;
  variant?: 'primary' | 'secondary';
  textClassName?: string;
  className?: string;
}

const containerVariantStyles = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-200',
};

const textVariantStyles = {
  primary: 'text-white font-semibold text-base',
  secondary: 'text-gray-800 font-semibold text-base',
};

export default function CustomButton({
  variant = 'primary',
  className,
  textClassName,
  disabled,
  title,
  onPress,
  ...rest
}: CustomButtonProps) {
  const baseContainerClasses = 'py-3 px-4 rounded-md items-center justify-center';

  const containerClassName = clsx(
    baseContainerClasses,
    containerVariantStyles[variant],
    className,
    disabled && 'opacity-50'
  );

  const titleClassName = clsx(
    textVariantStyles[variant],
    textClassName
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={containerClassName}
      {...rest}
    >
      <CustomText className={titleClassName}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
}
