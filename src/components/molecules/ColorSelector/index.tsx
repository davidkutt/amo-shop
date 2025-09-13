import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { useTheme } from '@shopify/restyle';

const colorSelectorVariant = createVariant<Theme, 'colorSelectorVariants'>({
  themeKey: 'colorSelectorVariants',
});

const ColorSelectorContainer = createRestyleComponent<
  VariantProps<Theme, 'colorSelectorVariants'> & SpacingProps<Theme>,
  Theme
>([colorSelectorVariant, spacing]);

const ColorOption = createRestyleComponent<SpacingProps<Theme>, Theme>([spacing]);

export interface ColorSelectorProps {
  colors: string[];
  selectedColor?: string;
  onColorSelect: (color: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
}

export const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
  size = 'md',
  showLabels = false,
}) => {
  const theme = useTheme<Theme>();
  const getSize = () => {
    switch (size) {
      case 'sm': return 24;
      case 'lg': return 40;
      default: return 32;
    }
  };

  return (
    <ColorSelectorContainer variant="default" flexDirection="row" gap="xs">
      {colors.map((color) => (
        <View key={color} alignItems="center">
          <TouchableOpacity
            onPress={() => onColorSelect(color)}
            style={{
              width: getSize(),
              height: getSize(),
              borderRadius: getSize() / 2,
              backgroundColor: color,
              borderWidth: selectedColor === color ? 3 : 1,
              borderColor: selectedColor === color ? theme.colors.black : theme.colors.gray200,
            }}
          />
          {showLabels && (
            <Text variant="caption" marginTop="xs" textAlign="center">
              {color}
            </Text>
          )}
        </View>
      ))}
    </ColorSelectorContainer>
  );
};

export type { ColorSelectorProps };
