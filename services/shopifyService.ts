/**
 * ============================================================================
 * Shopify API Service
 * ============================================================================
 *
 * This file centralizes all interactions with the Shopify Storefront API.
 * It configures the Apollo Client and exports all the necessary GraphQL
 * queries, mutations, and fragments for a full-featured e-commerce app.
 *
 * Sections:
 * 1. Configuration
 * 2. Apollo Client Setup
 * 3. GraphQL Fragments
 * 4. Product & Collection Queries
 * 5. Cart (Checkout) Queries & Mutations
 * 6. Basic Customer Account Queries & Mutations
 * 7. Advanced Customer Account Mutations
 * 8. Store & Content Queries
 *
 * ============================================================================
 */

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// ============================================================================
// 1. CONFIGURATION
// ============================================================================
// Replace these with your actual store details.
// IMPORTANT: Do NOT include 'https://' in the store URL variable.
const YOUR_SHOPIFY_STORE_URL = '1negbw-qi.myshopify.com';
const YOUR_STOREFRONT_API_TOKEN = '54116cd2642986c0bba5e0abcf8d5785'; // <-- UPDATED TOKEN

// ============================================================================
// 2. APOLLO CLIENT SETUP
// ============================================================================
// This is the single client instance that the rest of your app will use.
export const client = new ApolloClient({
  uri: `https://${YOUR_SHOPIFY_STORE_URL}/api/2025-04/graphql.json`,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': YOUR_STOREFRONT_API_TOKEN,
  },
});


// ============================================================================
// 3. GRAPHQL FRAGMENTS
// ============================================================================
// Fragments prevent us from repeating fields and keep our data consistent.

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    title
    handle
    descriptionHtml
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 5) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const CART_FRAGMENT = gql`
  fragment CartFragment on Cart {
    id
    checkoutUrl
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          estimatedCost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_DETAILS_FRAGMENT = gql`
  fragment CustomerDetailsFragment on Customer {
    id
    firstName
    lastName
    email
    phone
    orders(first: 20) {
      edges {
        node {
          id
          orderNumber
          processedAt
          financialStatus
          totalPrice {
            amount
            currencyCode
          }
        }
      }
    }
    addresses(first: 10) {
      edges {
        node {
          id
          address1
          address2
          city
          country
          zip
        }
      }
    }
  }
`;


// ============================================================================
// 4. PRODUCT & COLLECTION QUERIES
// ============================================================================

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = gql`
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($first: Int = 10) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_IN_COLLECTION_QUERY = gql`
  query GetProductsInCollection($handle: String!, $first: Int = 20) {
    collection(handle: $handle) {
      id
      title
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;


// ============================================================================
// 5. CART (CHECKOUT) QUERIES & MUTATIONS
// ============================================================================

export const GET_CART_QUERY = gql`
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CREATE_CART_MUTATION = gql`
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART_LINE_MUTATION = gql`
  mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;


// ============================================================================
// 6. BASIC CUSTOMER ACCOUNT QUERIES & MUTATIONS
// ============================================================================

export const CUSTOMER_CREATE_MUTATION = gql`
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_LOGIN_MUTATION = gql`
  mutation CustomerLogin($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const GET_CUSTOMER_QUERY = gql`
  query GetCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ...CustomerDetailsFragment
    }
  }
  ${CUSTOMER_DETAILS_FRAGMENT}
`;


// ============================================================================
// 7. ADVANCED CUSTOMER MUTATIONS
// ============================================================================

export const CUSTOMER_UPDATE_MUTATION = gql`
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
      customer {
        id
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_CREATE_MUTATION = gql`
  mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
    customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_UPDATE_MUTATION = gql`
  mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
    customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ADDRESS_DELETE_MUTATION = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_RECOVER_MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_RESET_MUTATION = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_RENEW_MUTATION = gql`
  mutation customerAccessTokenRenew($customerAccessToken: String!) {
    customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CUSTOMER_ACCESS_TOKEN_DELETE_MUTATION = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;


// ============================================================================
// 8. STORE & CONTENT QUERIES
// ============================================================================

export const GET_SHOP_INFO_QUERY = gql`
  query GetShopInfo {
    shop {
      name
      description
      brand {
        logo {
          image {
            url
          }
        }
      }
      privacyPolicy {
        title
        body
      }
      termsOfService {
        title
        body
      }
    }
  }
`;

export const GET_PAGES_QUERY = gql`
  query GetPages($first: Int = 10) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
          body
        }
      }
    }
  }
`;
