import React, { useEffect, useState } from 'react';
import { getProducts } from '../shopify';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products.edges);
    });
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.title}</h2>
            <p>{node.description}</p>
            {node.images.edges[0] && (
              <img
                src={node.images.edges[0].node.src}
                alt={node.title}
                style={{ width: '200px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
