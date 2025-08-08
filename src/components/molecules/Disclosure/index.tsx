import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps, VariantProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

const disclosureVariant = createVariant<Theme, 'disclosureVariants'>({
  themeKey: 'disclosureVariants',
});

const DisclosureContainer = createRestyleComponent<
  VariantProps<Theme, 'disclosureVariants'> & SpacingProps<Theme>,
  Theme
>([disclosureVariant, spacing]);

const DisclosureHeader = createRestyleComponent<SpacingProps<Theme>, Theme>([spacing]);

const DisclosureContent = createRestyleComponent<SpacingProps<Theme>, Theme>([spacing]);

export interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  variant?: 'default' | 'bordered';
}

export const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  onToggle,
  variant = 'default',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <DisclosureContainer variant={variant}>
      <TouchableOpacity onPress={handleToggle}>
        <DisclosureHeader 
          flexDirection="row" 
          justifyContent="space-between" 
          alignItems="center"
          paddingVertical="sm"
        >
          <Text variant="subtitle" flex={1}>
            {title}
          </Text>
          <Icon 
            name={isOpen ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="textPrimary"
          />
        </DisclosureHeader>
      </TouchableOpacity>
      
      {isOpen && (
        <DisclosureContent paddingTop="xs">
          {children}
        </DisclosureContent>
      )}
    </DisclosureContainer>
  );
};

export type { DisclosureProps };
