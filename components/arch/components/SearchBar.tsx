import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import Icon from 'components/arch/components/Icon.tsx';
import clsx from 'clsx';

interface SearchBarProps extends TextInputProps {
  containerClassName?: string;
}

export default function SearchBar({
  containerClassName,
  ...rest
}: SearchBarProps) {
  return (
    <View className={clsx('flex-row items-center bg-gray-100 rounded-lg px-3', containerClassName)}>
      <Icon name="search-outline" size={20} color="gray" className="mr-2" />
      <TextInput
        className="flex-1 text-base py-2"
        placeholder="Search products..."
        placeholderTextColor="#9CA3AF"
        {...rest}
      />
    </View>
  );
}
