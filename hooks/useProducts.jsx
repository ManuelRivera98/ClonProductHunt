import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase/index';

const useProducts = order => {

    const [products, setProducts] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection('products').orderBy(order, 'desc').onSnapshot(createSnapshot)
        }
        getProducts();
    }, []);

    function createSnapshot(snapshot) {
        const products = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        setProducts(products);
    }

    return {
        products
    }
}

export default useProducts;