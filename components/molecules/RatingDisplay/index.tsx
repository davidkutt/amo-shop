import React from 'react';
import { View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';

interface RatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  reviewCount?: number;
  containerClassName?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
                                                              rating,
                                                              maxRating = 5,
                                                              size = 16,
                                                              color = '#FBBF24', // A nice amber color
                                                              reviewCount,
                                                              containerClassName = '',
                                                            }) => {
  return (
    <View className={`flex-row items-center ${containerClassName}`}>
      {/* Render the stars */}
      {Array.from({ length: maxRating }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = rating >= starNumber;

        return (
          <View key={index} className="mr-1">
            <Icon
              name="star"
              size={size}
              // --- THIS IS THE FIX ---
              // Use the 'color' prop for the stroke, as defined in our Icon's interface.
              color={color}
              // Use the 'fill' prop for the fill.
              fill={isFilled ? color : 'transparent'}
            />
          </View>
        );
      })}

      {/* Optionally, display the review count */}
      {reviewCount !== undefined && (
        <Text variant="caption" className="ml-1">
          ({reviewCount})
        </Text>
      )}
    </View>
  );
};
