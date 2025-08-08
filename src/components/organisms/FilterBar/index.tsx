import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { FilterButton } from 'components/molecules/FilterButton';
import { Chip } from 'components/molecules/Chip';
import { Icon } from 'components/atoms/Icon';

const FilterBarContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps {
  filters: FilterOption[];
  sortOptions: SortOption[];
  selectedFilters: string[];
  selectedSort?: string;
  onFilterChange: (filterIds: string[]) => void;
  onSortChange: (sortId: string) => void;
  showFilterCount?: boolean;
  showSortButton?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  sortOptions,
  selectedFilters,
  selectedSort,
  onFilterChange,
  onSortChange,
  showFilterCount = true,
  showSortButton = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterToggle = (filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortId: string) => {
    onSortChange(sortId);
  };

  const clearAllFilters = () => {
    onFilterChange([]);
  };

  const selectedFiltersCount = selectedFilters.length;

  return (
    <FilterBarContainer
      backgroundColor="background"
      borderBottomWidth={1}
      borderBottomColor="border"
      paddingHorizontal="md"
      paddingVertical="sm"
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <FilterButton
            variant="outline"
            size="sm"
            onPress={() => setIsExpanded(!isExpanded)}
            icon="filter"
            iconPosition="left"
          >
            Filter
            {showFilterCount && selectedFiltersCount > 0 && (
              <Chip
                variant="selected"
                size="sm"
                content={selectedFiltersCount.toString()}
                style={{ marginLeft: 8 }}
              />
            )}
          </FilterButton>

          {selectedFiltersCount > 0 && (
            <FilterButton
              variant="ghost"
              size="sm"
              onPress={clearAllFilters}
              style={{ marginLeft: 8 }}
            >
              Clear All
            </FilterButton>
          )}
        </View>

        {showSortButton && (
          <FilterButton
            variant="outline"
            size="sm"
            onPress={() => {
              // This would typically open a sort modal or dropdown
              console.log('Open sort options');
            }}
            icon="chevron-down"
            iconPosition="right"
          >
            {sortOptions.find(option => option.id === selectedSort)?.label || 'Sort'}
          </FilterButton>
        )}
      </View>

      {isExpanded && (
        <View style={{ marginTop: 16 }}>
          <Text variant="subtitle" color="textPrimary" marginBottom="sm">
            Filter Options
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
              {filters.map((filter) => (
                <Chip
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? 'selected' : 'default'}
                  size="sm"
                  onPress={() => handleFilterToggle(filter.id)}
                >
                  {filter.label}
                  {filter.count && (
                    <Text variant="small" color="textSecondary" style={{ marginLeft: 4 }}>
                      ({filter.count})
                    </Text>
                  )}
                </Chip>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {selectedFilters.length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text variant="small" color="textSecondary" marginBottom="xs">
            Active Filters:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
              {selectedFilters.map((filterId) => {
                const filter = filters.find(f => f.id === filterId);
                return filter ? (
                  <Chip
                    key={filterId}
                    variant="selected"
                    size="sm"
                    onPress={() => handleFilterToggle(filterId)}
                    slotSuffix={
                      <Icon name="x" size={12} color="white" />
                    }
                  >
                    {filter.label}
                  </Chip>
                ) : null;
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </FilterBarContainer>
  );
};

export default FilterBar;
export type { FilterBarProps };
