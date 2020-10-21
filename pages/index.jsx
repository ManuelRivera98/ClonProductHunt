import React, { useState, useContext } from 'react';
import useProducts from '../hooks/useProducts';


import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails'

const Home = () => {

  const { products } = useProducts('created');


  return ( 
    <Layout title="Productos">
        <div className="list-products">
            <div className="contenedor">
              <ul className="bg-white">
                  {products.map(product => (
                      <ProductDetails
                          key={product.id}
                          product={product}
                      />
                  ))}
              </ul>
            </div>
        </div>
    </Layout>
   );
};
 
export default Home;