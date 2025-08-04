import React from 'react';
import { View, TextInputProps, TouchableOpacity } from 'react-native';
import { Input } from 'components/atoms/Input';
import { Icon } from 'components/atoms/Icon';

interface SearchBarProps extends TextInputProps {
  onClear?: () => void;
}

/**
 * A SearchBar component styled in the stark, minimalist aesthetic.
 * It's designed to sit on a white background and is defined by its border.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
                                                      value,
                                                      onClear,
                                                      ...rest
                                                    }) => {
  const showClearButton = value && value.length > 0;

  return (
    <View className="w-full bg-background px-4 py-2 border-b border-text/20">
      <View className="flex-row items-center w-full bg-background border border-text/20 rounded-lg p-2">
        {/* Search Icon */}
        <View className="pr-2">
          <Icon name="search" size={22} color="#334155" />
        </View>

        <Input
          className="flex-1 border-0 bg-transparent text-base h-8 p-0 text-text"
          placeholder="Search..."
          placeholderTextColor="#6b7281" // A standard gray
          value={value}
          {...rest}
        />

        {/* Clear Button (appears only when there's text) */}
        {showClearButton && (
          <TouchableOpacity onPress={onClear} className="pl-2">
            <Icon name="close" size={22} color="#334155" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
