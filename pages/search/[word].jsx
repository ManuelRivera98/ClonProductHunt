import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout';
import { useRouter } from 'next/router';
import ProductDetails from '../../components/layout/ProductDetails';
import useProducts from '../../hooks/useProducts';

const Search = () => {

  const router = useRouter();
  const { query: { word }} = router;

  // Todos los productos
  const {products } = useProducts('created');
  const [ result, setResult ] = useState([]);

  useEffect(() => {
      if (!word) return;

      const search = word.toLowerCase();
      const filterProduct = products.filter(product => {
        return (
          product.name.toLowerCase().includes(search) || 
          product.description.toLowerCase().includes(search)
        )
      });
      setResult(filterProduct);
      
  }, [ word, products ]);


  return (
    <div>
      <Layout title="Busqueda">
        <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                  {result.map(product => (
                      <ProductDetails
                          key={product.id}
                          product={product}
                      />
                  ))}
              </ul>
            </div>
        </div>
      </Layout>
    </div>
  )
}

export default Search