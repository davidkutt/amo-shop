import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon, IconName } from '../../atoms/Icon';

interface FilterButtonProps {
  children: string;
  onPress: () => void;
  iconName?: IconName;
}

/**
 * A simple, tappable text button with an optional icon, styled for filter and sort bars.
 */
export const FilterButton: React.FC<FilterButtonProps> = ({
                                                            children,
                                                            onPress,
                                                            iconName,
                                                          }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-x-2">
      <Text className="text-black uppercase font-bold text-sm">{children}</Text>
      {iconName && <Icon name={iconName} size={18} color="black" />}
    </TouchableOpacity>
  );
};
