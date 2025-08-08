import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

type HeaderProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    back?: boolean;
    title?: string;
    onBackPress?: () => void;
    onSearchPress?: () => void;
    onCartPress?: () => void;
    cartItemCount?: number;
  };

const HeaderBase = createRestyleComponent<HeaderProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const Header: React.FC<HeaderProps> = ({
  back = false,
  title,
  onBackPress,
  onSearchPress,
  onCartPress,
  cartItemCount = 0,
  ...rest
}) => {
  return (
    <HeaderBase
      backgroundColor="cardBackground"
      borderBottomWidth={1}
      borderBottomColor="border"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="l"
      paddingVertical="m"
      height={80}
      {...rest}
    >
      {/* Left Section */}
      <View flexDirection="row" alignItems="center" flex={1}>
        {back ? (
          <TouchableOpacity onPress={onBackPress} marginRight="m">
            <Icon name="arrow-left" size={24} color="textPrimary" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSearchPress} marginRight="m">
            <Icon name="search" size={24} color="textPrimary" />
          </TouchableOpacity>
        )}
        
        {title && (
          <Text variant="subtitle" flex={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Right Section */}
      <View flexDirection="row" alignItems="center">
        <TouchableOpacity onPress={onCartPress} marginLeft="m">
          <View position="relative">
            <Icon name="shopping-cart" size={24} color="textPrimary" />
            {cartItemCount > 0 && (
              <View
                position="absolute"
                top={-8}
                right={-8}
                backgroundColor="accent1"
                borderRadius="full"
                minWidth={20}
                height={20}
                justifyContent="center"
                alignItems="center"
                paddingHorizontal="xs"
              >
                <Text
                  variant="small"
                  color="white"
                  fontWeight="600"
                  textAlign="center"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </HeaderBase>
  );
};

export default Header;
