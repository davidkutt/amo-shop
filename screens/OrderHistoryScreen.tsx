import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Icon } from '../components/atoms/Icon';

// Sample data for past orders
const pastOrders = [
  {
    id: 'ORDER #10524',
    date: 'June 15, 2025',
    total: '1470.00 €',
    status: 'Shipped',
  },
  {
    id: 'ORDER #10491',
    date: 'May 28, 2025',
    total: '850.00 €',
    status: 'Delivered',
  },
  {
    id: 'ORDER #10455',
    date: 'May 12, 2025',
    total: '695.00 €',
    status: 'Delivered',
  },
];

// A reusable sub-component for displaying a single order in the list
const OrderHistoryItem = ({ order, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black"
  >
    <View>
      <Text className="text-black uppercase font-bold text-base">{order.id}</Text>
      <Text className="text-black text-sm mt-1">Date: {order.date}</Text>
      <Text className="text-black text-sm">Total: {order.total}</Text>
      <Text className="text-black text-sm">Status: {order.status}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="black" />
  </TouchableOpacity>
);

/**
 * A screen that displays a list of the user's past orders.
 */
const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* The Header for this screen would be provided by its own Stack Navigator */}
      <ScrollView>
        <View>
          {pastOrders.map((order) => (
            <OrderHistoryItem
              key={order.id}
              order={order}
              onPress={() => Alert.alert('Navigate', `To details for ${order.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
