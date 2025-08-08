export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  CategoryProducts: { categoryId: string; categoryName: string };
  Search: undefined;
  Cart: undefined;
  Checkout: undefined;
  Account: undefined;
  OrderHistory: undefined;
  ComponentShowcase: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type NavigationProps = {
  navigation: any;
  route: any;
};
