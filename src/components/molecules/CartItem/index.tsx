import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

type CartItemData = {
  imageUrl: string;
  name: string;
  price: string;
  quantity?: number;
};

type CartItemProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    item: CartItemData;
    onRemove?: () => void;
    onQuantityChange?: (quantity: number) => void;
  };

const CartItemBase = createRestyleComponent<CartItemProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onQuantityChange,
  ...rest
}) => {
  const formatPrice = (price: string) => {
    const [amount, currency] = price.split(' ');
    return `${amount.replace('.', ',')} €`;
  };

  return (
    <CartItemBase
      backgroundColor="cardBackground"
      borderRadius="m"
      borderWidth={1}
      borderColor="border"
      padding="m"
      marginBottom="s"
      flexDirection="row"
      alignItems="center"
      {...rest}
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
      
      {/* Product Info */}
      <View flex={1} marginLeft="m">
        <Text
          variant="body"
          fontWeight="600"
          marginBottom="xs"
          numberOfLines={2}
        >
          {item.name}
        </Text>
        
        <Text variant="subtitle" color="primary">
          {formatPrice(item.price)}
        </Text>
      </View>
      
      {/* Quantity Controls */}
      {item.quantity !== undefined && onQuantityChange && (
        <View flexDirection="row" alignItems="center" marginRight="m">
          <TouchableOpacity
            onPress={() => onQuantityChange(Math.max(1, item.quantity! - 1))}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#f3f4f6',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="minus" size={16} color="textSecondary" />
          </TouchableOpacity>
          
          <Text
            variant="body"
            fontWeight="600"
            marginHorizontal="s"
            minWidth={24}
            textAlign="center"
          >
            {item.quantity}
          </Text>
          
          <TouchableOpacity
            onPress={() => onQuantityChange(item.quantity! + 1)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#f3f4f6',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="plus" size={16} color="textSecondary" />
          </TouchableOpacity>
        </View>
      )}
      
      {/* Remove Button */}
      {onRemove && (
        <TouchableOpacity onPress={onRemove}>
          <Icon name="trash-2" size={20} color="error" />
        </TouchableOpacity>
      )}
    </CartItemBase>
  );
};

export default CartItem;
export type { CartItemProps };
