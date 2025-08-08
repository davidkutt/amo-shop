import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Input } from 'components/atoms/Input';
import { Icon } from 'components/atoms/Icon';

type SearchBarProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onClear?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
  };

const SearchBarBase = createRestyleComponent<SearchBarProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Suchen...',
  onSearch,
  onClear,
  value,
  onChangeText,
  ...rest
}) => {
  const [searchText, setSearchText] = useState(value || '');

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onChangeText?.(text);
  };

  const handleSearch = () => {
    onSearch?.(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    onChangeText?.('');
    onClear?.();
  };

  return (
    <SearchBarBase
      backgroundColor="cardBackground"
      borderRadius="full"
      borderWidth={1}
      borderColor="border"
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="m"
      paddingVertical="s"
      {...rest}
    >
      <Icon
        name="search"
        size={20}
        color="textTertiary"
        marginRight="s"
      />
      <Input
        flex={1}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleTextChange}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        borderWidth={0}
        backgroundColor="transparent"
        paddingHorizontal={0}
        paddingVertical={0}
        fontSize={16}
        color="textPrimary"
        placeholderTextColor="textTertiary"
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear} marginLeft="s">
          <Icon
            name="x"
            size={18}
            color="textTertiary"
          />
        </TouchableOpacity>
      )}
    </SearchBarBase>
  );
};

export default SearchBar;
export type { SearchBarProps };
