import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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

type Breadcrumb = {
  label: string;
  onPress: () => void;
};

type BreadcrumbsProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    crumbs: Breadcrumb[];
  };

const BreadcrumbsBase = createRestyleComponent<BreadcrumbsProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  crumbs,
  ...rest
}) => {
  return (
    <BreadcrumbsBase
      flexDirection="row"
      alignItems="center"
      flexWrap="wrap"
      {...rest}
    >
      {crumbs.map((crumb, index) => (
        <View key={index} flexDirection="row" alignItems="center">
          <TouchableOpacity onPress={crumb.onPress}>
            <Text
              variant="small"
              color={index === crumbs.length - 1 ? 'textPrimary' : 'textSecondary'}
              fontWeight={index === crumbs.length - 1 ? '600' : '400'}
            >
              {crumb.label}
            </Text>
          </TouchableOpacity>
          
          {index < crumbs.length - 1 && (
            <Icon
              name="chevron-right"
              size={16}
              color="textTertiary"
              marginHorizontal="s"
            />
          )}
        </View>
      ))}
    </BreadcrumbsBase>
  );
};

export default Breadcrumbs;
export type { BreadcrumbsProps };
