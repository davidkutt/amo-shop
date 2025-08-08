import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

const filterButtonVariant = createVariant<Theme, 'filterButtonVariants'>({
  themeKey: 'filterButtonVariants',
});

const FilterButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'filterButtonVariants'> & SpacingProps<Theme>,
  Theme
>([filterButtonVariant, spacing]);

export interface FilterButtonProps {
  label: string;
  onPress: () => void;
  active?: boolean;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  onPress,
  active = false,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'right',
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return { paddingVertical: 6, paddingHorizontal: 12, fontSize: 12 };
      case 'lg': return { paddingVertical: 12, paddingHorizontal: 20, fontSize: 16 };
      default: return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 };
    }
  };

  const sizeStyle = getSize();

  return (
    <TouchableOpacity onPress={onPress}>
      <FilterButtonContainer 
        variant={active ? 'active' : variant}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="xs"
        style={{
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
        }}
      >
        {icon && iconPosition === 'left' && (
          <Icon 
            name={icon} 
            size={sizeStyle.fontSize} 
            color={active ? 'white' : 'textPrimary'}
          />
        )}
        
        <Text 
          variant={size === 'sm' ? 'small' : 'body'}
          color={active ? 'white' : 'textPrimary'}
        >
          {label}
        </Text>
        
        {icon && iconPosition === 'right' && (
          <Icon 
            name={icon} 
            size={sizeStyle.fontSize} 
            color={active ? 'white' : 'textPrimary'}
          />
        )}
      </FilterButtonContainer>
    </TouchableOpacity>
  );
};

export type { FilterButtonProps };
