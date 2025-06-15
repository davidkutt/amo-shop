import React from 'react';
import { View, TextInputProps, TouchableOpacity } from 'react-native';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';

interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
  containerClassName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                      value,
                                                      onClear,
                                                      containerClassName = '',
                                                      ...rest
                                                    }) => {
  const showClearButton = value && value.length > 0;

  return (
    // This wrapper holds the SearchBar and its hard shadow
    <View className={`w-full ${containerClassName}`}>
      {/* This View acts as the hard, offset shadow */}
      <View className="absolute top-1 left-1 w-full h-full bg-black" />

      {/* This is the main SearchBar container */}
      <View
        className="flex-row items-center w-full bg-[#F0F0E0] border-2 border-black"
      >
        {/* Search Icon */}
        <View className="pl-4 pr-2">
          <Icon name="search" size={24} color="black" />
        </View>

        {/* --- THIS LINE IS FIXED --- */}
        <Input
          className="flex-1 border-0 bg-transparent py-3 text-base h-12 text-black" // Changed p-0 to py-3
          placeholder="Search products..."
          placeholderTextColor="#333333"
          value={value}
          {...rest}
        />

        {/* Clear Button appears only when there's text */}
        {showClearButton && (
          <TouchableOpacity onPress={onClear} className="p-4">
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
