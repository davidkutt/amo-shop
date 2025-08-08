import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createRestyleComponent, createVariant, spacing, SpacingProps } from '@shopify/restyle';
import { Theme } from 'theme/index';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

const TabbarContainer = createRestyleComponent<SpacingProps<Theme>, View>([spacing], View);

export interface TabItem {
  id: string;
  label: string;
  icon: string;
  badge?: number | string;
  onPress: () => void;
}

export interface TabbarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
  showLabels?: boolean;
  variant?: 'default' | 'elevated';
}

const Tabbar: React.FC<TabbarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  showLabels = true,
  variant = 'elevated',
}) => {
  return (
    <TabbarContainer
      backgroundColor="background"
      borderTopWidth={variant === 'elevated' ? 0 : 1}
      borderTopColor="border"
      paddingVertical="sm"
      paddingHorizontal="md"
      style={{
        shadowColor: variant === 'elevated' ? '#000' : 'transparent',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: variant === 'elevated' ? 0.1 : 0,
        shadowRadius: variant === 'elevated' ? 4 : 0,
        elevation: variant === 'elevated' ? 8 : 0,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabPress(tab.id)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
                position: 'relative',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View style={{ position: 'relative' }}>
                  <Icon
                    name={tab.icon}
                    size={24}
                    color={isActive ? 'primary' : 'textSecondary'}
                  />
                  {tab.badge && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -8,
                        backgroundColor: '#FF3B30',
                        borderRadius: 10,
                        minWidth: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 4,
                      }}
                    >
                      <Text variant="small" color="white" style={{ fontSize: 10 }}>
                        {tab.badge}
                      </Text>
                    </View>
                  )}
                </View>
                {showLabels && (
                  <Text
                    variant="small"
                    color={isActive ? 'primary' : 'textSecondary'}
                    marginTop="xs"
                    style={{ textAlign: 'center' }}
                  >
                    {tab.label}
                  </Text>
                )}
              </View>
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    marginLeft: -8,
                    width: 16,
                    height: 3,
                    backgroundColor: '#007AFF',
                    borderRadius: 2,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </TabbarContainer>
  );
};

export default Tabbar;
export type { TabbarProps };
