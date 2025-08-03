import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Counter } from 'components/molecules/Counter';
import { FilterButton } from 'components/molecules/FilterButton';

interface FilterBarProps {
  productCount: number;
}

/**
 * A bar component for filtering, redesigned in a warm, elegant aesthetic.
 */
export const FilterBar: React.FC<FilterBarProps> = ({ productCount }) => {
  const navigation = useNavigation();

  return (
    // The bar now has a subtle bottom border and our off-white background
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-background">
      {/* Product Count Display */}
      <View className="flex-row items-center gap-x-2">
        <Text className="text-text text-sm font-medium">Produkte</Text>
        <Counter size="sm">{productCount}</Counter>
      </View>

      {/* Filter and Sort Buttons */}
      <View className="flex-row items-center gap-x-4">
        <FilterButton
          onPress={() => navigation.navigate('FilterScreen')}
          iconName="filter"
        >
          Filter
        </FilterButton>
        <FilterButton
          onPress={() => navigation.navigate('FilterScreen')}
          iconName="chevron-down"
        >
          Sortiert nach
        </FilterButton>
      </View>
    </View>
  );
};
