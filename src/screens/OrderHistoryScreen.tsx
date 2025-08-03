import React from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'components/atoms/Text';
import { Icon } from 'components/atoms/Icon';

// Beispieldaten für vergangene Bestellungen
const pastOrders = [
  {
    id: 'BESTELLUNG NR. 10524',
    date: '15. Juni 2025',
    total: '1470.00 €',
    status: 'Versandt',
  },
  {
    id: 'BESTELLUNG NR. 10491',
    date: '28. Mai 2025',
    total: '850.00 €',
    status: 'Zugestellt',
  },
  {
    id: 'BESTELLUNG NR. 10455',
    date: '12. Mai 2025',
    total: '695.00 €',
    status: 'Zugestellt',
  },
];

// Eine wiederverwendbare Unterkomponente zur Anzeige einer einzelnen Bestellung in der Liste
const OrderHistoryItem = ({ order, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between p-4 bg-white border-b-2 border-black"
  >
    <View>
      <Text className="text-black uppercase font-bold text-base">{order.id}</Text>
      <Text className="text-black text-sm mt-1">Datum: {order.date}</Text>
      <Text className="text-black text-sm">Gesamt: {order.total}</Text>
      <Text className="text-black text-sm">Status: {order.status}</Text>
    </View>
    <Icon name="chevron-right" size={24} color="black" />
  </TouchableOpacity>
);

/**
 * Ein Bildschirm, der eine Liste der vergangenen Bestellungen des Benutzers anzeigt.
 */
const OrderHistoryScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Der Header für diesen Bildschirm würde von seinem eigenen Stack Navigator bereitgestellt */}
      <ScrollView>
        <View>
          {pastOrders.map((order) => (
            <OrderHistoryItem
              key={order.id}
              order={order}
              onPress={() => {}}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderHistoryScreen;
