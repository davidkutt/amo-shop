import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../components/atoms/Text';
import { Button } from '../components/atoms/Button';
import { Icon } from '../components/atoms/Icon';
import { Checkbox } from '../components/molecules/Checkbox';
import { Switch } from '../components/molecules/Switch';

// A new, single-purpose component for this screen
const FilterSection = ({ title, children }) => (
  <View className="border-b-2 border-black">
    <View className="p-4">
      <Text className="text-black uppercase font-bold text-base">{title}</Text>
    </View>
    <View className="p-4 pt-0">{children}</View>
  </View>
);

// Another new, single-purpose component for this screen for radio buttons
const RadioItem = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center py-2"
  >
    <View
      className={`w-5 h-5 border-2 border-black items-center justify-center ${
        selected ? 'bg-black' : 'bg-white'
      }`}
    />
    <Text className="text-black text-base ml-3">{label}</Text>
  </TouchableOpacity>
);

/**
 * The Filter screen, typically presented as a modal.
 */
const FilterScreen = () => {
  const navigation = useNavigation();
  const [sortOption, setSortOption] = useState('Newest');
  const [categories, setCategories] = useState({
    sneakers: true,
    boots: false,
    apparel: false,
  });
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* --- Screen Header --- */}
      <View className="flex-row items-center justify-between p-4 border-b-2 border-black">
        <Text className="text-black text-center font-bold text-xl uppercase tracking-widest">
          Filter & Sortierung
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* --- Sort By Section --- */}
        <FilterSection title="Sort By">
          <RadioItem
            label="Neueste"
            selected={sortOption === 'Newest'}
            onPress={() => setSortOption('Newest')}
          />
          <RadioItem
            label="Preis: absteigend"
            selected={sortOption === 'High to Low'}
            onPress={() => setSortOption('High to Low')}
          />
          <RadioItem
            label="Preis: aufsteigend"
            selected={sortOption === 'Low to High'}
            onPress={() => setSortOption('Low to High')}
          />
        </FilterSection>

        {/* --- Categories Section --- */}
        <FilterSection title="Categories">
          <Checkbox
            label="Sneaker"
            value={categories.sneakers}
            onValueChange={(val) => setCategories({ ...categories, sneakers: val })}
            className="mb-2"
          />
          <Checkbox
            label="Stiefel"
            value={categories.boots}
            onValueChange={(val) => setCategories({ ...categories, boots: val })}
            className="mb-2"
          />
          <Checkbox
            label="Bekleidung"
            value={categories.apparel}
            onValueChange={(val) => setCategories({ ...categories, apparel: val })}
          />
        </FilterSection>

        {/* --- In Stock Section --- */}
        <FilterSection title="Availability">
          <View className="flex-row items-center justify-between">
            <Text className="text-black text-base">Nur Produkte auf Lager anzeigen</Text>
            <Switch value={inStockOnly} onValueChange={setInStockOnly} />
          </View>
        </FilterSection>

      </ScrollView>

      {/* --- View Results CTA --- */}
      <View className="p-4 border-t-2 border-black flex-row gap-x-4">
        <View className="flex-1">
          {/* --- THIS IS THE FIX --- */}
          {/* We now use the 'outline' variant and override the background color. */}
          {/* This ensures the text color is correctly set to black. */}
          <Button
            title="Zurücksetzen"
            variant="outline"
            onPress={() => {}}
            className="bg-white w-full"
            textClassName="text-black"
          />
        </View>
        <View className="flex-1">
          <Button
            title="Suchen"
            onPress={() => navigation.goBack()}
            className="bg-black border-black w-full"
            textClassName="text-white"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FilterScreen;
