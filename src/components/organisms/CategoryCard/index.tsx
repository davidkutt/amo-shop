import React from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import {
  createRestyleComponent,
  spacing, SpacingProps,
  backgroundColor, BackgroundColorProps,
  border, BorderProps,
  layout, LayoutProps,
} from '@shopify/restyle';
import { Theme } from 'theme';
import { Text } from 'components/atoms/Text';

type Category = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

type CategoryCardProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    category: Category;
    onPress: (categoryId: string) => void;
  };

const CategoryCardBase = createRestyleComponent<CategoryCardProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={() => onPress(category.id)}>
      <CategoryCardBase
        backgroundColor="cardBackground"
        borderRadius="xl"
        overflow="hidden"
        marginRight="m"
        marginBottom="m"
        width={160}
        height={120}
        {...rest}
      >
        {/* Background Image */}
        <Image
          source={category.image}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
          resizeMode="cover"
        />
        
        {/* Semi-transparent Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Title */}
        <View
          flex={1}
          justifyContent="flex-end"
          padding="m"
        >
          <Text
            variant="body"
            color="white"
            fontWeight="600"
            textAlign="center"
            numberOfLines={2}
          >
            {category.title}
          </Text>
        </View>
      </CategoryCardBase>
    </TouchableOpacity>
  );
};

export default CategoryCard;
