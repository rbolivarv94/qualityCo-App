const API_URL = 'https://directodefabrica-com.myshopify.com//api/2023-10/graphql.json'; // Replace with your Shopify URL
const API_TOKEN = '45807dd2ebf80408d4a93ea8e4f8ef2e'; // Replace with your token

export const fetchShopifyData = async (query) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': API_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
};

export const getProducts = async () => {
    const query = `
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    `;
    return fetchShopifyData(query);
  };
  