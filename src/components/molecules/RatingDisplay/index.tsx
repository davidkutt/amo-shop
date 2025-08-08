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

type RatingDisplayProps = SpacingProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> & {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
  };

const RatingDisplayBase = createRestyleComponent<RatingDisplayProps, Theme>([
  spacing,
  backgroundColor,
  border,
  layout,
]);

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onRatingChange,
  ...rest
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 24;
      case 'md':
      default:
        return 20;
    }
  };

  const handleStarPress = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const renderStars = () => {
    const stars = [];
    const iconSize = getSize();
    
    for (let i = 0; i < maxRating; i++) {
      const isFilled = i < Math.floor(rating);
      const isHalfFilled = !isFilled && i === Math.floor(rating) && rating % 1 > 0;
      
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          disabled={!interactive}
          style={{
            marginRight: i < maxRating - 1 ? 2 : 0,
          }}
        >
          <Icon
            name={isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'}
            size={iconSize}
            color={isFilled || isHalfFilled ? 'accent1' : 'textTertiary'}
          />
        </TouchableOpacity>
      );
    }
    
    return stars;
  };

  return (
    <RatingDisplayBase
      flexDirection="row"
      alignItems="center"
      {...rest}
    >
      {renderStars()}
      
      {showValue && (
        <Text
          variant="small"
          color="textSecondary"
          marginLeft="s"
        >
          ({rating.toFixed(1)})
        </Text>
      )}
    </RatingDisplayBase>
  );
};

export default RatingDisplay;
export type { RatingDisplayProps };
