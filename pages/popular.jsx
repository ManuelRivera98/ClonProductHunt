import React, { useState, useContext } from 'react';
import useProducts from '../hooks/useProducts';


import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails'

const Popular = () => {

  const {products } = useProducts('votes');


  return ( 
    <Layout title="Populares">
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
 
export default Popular;