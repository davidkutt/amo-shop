import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../atoms/Text';
import { Counter } from '../../molecules/Counter';
import { FilterButton } from '../../molecules/FilterButton';
interface FilterBarProps {
  productCount: number;
}

/**
 * A bar component displayed above product grids to show counts and offer filtering/sorting.
 */
export const FilterBar: React.FC<FilterBarProps> = ({ productCount }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between p-4 border-b-2 border-black bg-white">
      {/* Product Count Display */}
      <View className="flex-row items-center gap-x-2">
        <Text className="text-black uppercase font-bold text-sm">Produkte</Text>
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
          onPress={() => navigation.navigate('FilterScreen')} // <-- THIS IS THE CHANGE
          iconName="chevron-down"
        >
          Sortiert nach
        </FilterButton>
      </View>
    </View>
  );
};

