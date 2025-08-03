import React from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import { useQuery } from '@apollo/client';

// Import our components and the GraphQL query
import { ProductCard } from 'components/organisms/ProductCard';
import { FilterBar } from 'components/organisms/FilterBar';
import { GET_PRODUCTS_QUERY } from 'services/shopifyService.ts';
import { Text } from 'components/atoms/Text';

const { width } = Dimensions.get('window');const ProductGridScreen = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS_QUERY, {
    variables: { first: 20 },
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#C4A484" />
      </View>
    );
  }
  //console.log('RAW SHOPIFY DATA:', JSON.stringify(data, null, 2));
 // Alert.alert(JSON.stringify(data, null, 2));

  if (error) {
    Alert.alert(error.message);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text>Error fetching products.</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const products = data?.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle, // <-- FIX 1: Add the handle to the product object
    variantId: node.variants.edges[0]?.node.id,
    name: node.title,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    imageUrl: node.images.edges[0]?.node.url || 'https://placehold.co/600x400',
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', }}>
      <FilterBar productCount={products?.length || 0} />
      <View className={"h-4"} />
      <FlatList
        data={products}
        className="px-2"
        renderItem={({ item, index }) => {
          const isLeftColumn = index % 2 === 0;

          return (
            <View
              className={`flex-1 mb-4 mx-2`}
            >
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate('ProductDetail', { productHandle: item.handle })
                }
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default ProductGridScreen;
