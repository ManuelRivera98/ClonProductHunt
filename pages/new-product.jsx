import React, { useState, useContext, useEffect } from 'react';
import { css } from 'styled-components';
import { Campo, Form, InputSubmit } from '../public/styles/stylesForm';
import { Error } from '../public/styles/stylesError';

import { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';

// firebase instancia
import { FirebaseContext } from '../firebase/index';

// Validations
import useValidationForm from '../hooks/useValidationForm';
import validationNewProduct from '../validation/validationNewProduct';

// Dependency Fire store
import FileUpLoader from 'react-firebase-file-uploader';

const NewProduct = () => {

  // state images dependency firestore
  const [imageName, setImageNmae] = useState('');
  const [goingUp, setGoingUp] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState('');

  const [errorRegister, setErrorRegister] = useState(null);
  const Router = useRouter();

  const initialState = {
    name: '',
    company: '',
    description: '',
    image: '',
    url: '',

  };

  const { 
    values, errors, handleBlur, handleChange, handleSubmit 
  } = useValidationForm(initialState, validationNewProduct, createProductFn);

  const { name, company, description, image, url } = values;

  // Context con las operaciones CRUD
  const { user, firebase }  = useContext(FirebaseContext);

  // Ayudarnos del hoisting de js
  async function createProductFn() {
    // Si el user no esta autenticado => llevar al login
    if (!user) {
      Router.push("/login");
    }

    // crear el objeto de nuevo producto
    const product = {
      name,
      company,
      url,
      urlImage,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],

    };

    // insertar en la base de datos el producto
      firebase.db.collection('products').add(product);

    // push user
    Router.push("/");
      
  };

  // Métodos dependency Component up Image

  const handleUploadStart = () => {
    setProgress(0);
    setGoingUp(true);
  }

  const handleProgress = progress => setProgress({ progress, });

  const handleUploadError = error => {
    setGoingUp(error);
    console.error(error);
  };

  const handleUploadSuccess = name => {
    setProgress(100);
    setGoingUp(false);
    setImageNmae(name)
    firebase
        .storage
        .ref("products")
        .child(name)
        .getDownloadURL()
        .then(url => {
          setUrlImage(url);
        } );
  };

    useEffect(() => {
      if (!user) {
        Router.push("/");
      };
    },[user]);

    if (!user) return null;

  return ( 
    <Layout title="Nuevo Producto">
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem; 
        `}
      >Nuevo Producto</h1>

      <Form
        onSubmit={handleSubmit}
      >
        {errors.name && <Error>{errors.name}</Error> }

        <fieldset>
          <legend>Información General</legend>

          <Campo>
            <label htmlFor="name">Nombre</label>
            <input 
              type="text" 
              id="name"
              placeholder="Nombre Producto"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              
              />
          </Campo>

          {errors.company && <Error>{errors.company}</Error> }

          <Campo>
            <label htmlFor="company">Empresa</label>
            <input 
              type="text" 
              id="company"
              placeholder="Nombre empresa o compañia"
              name="company"
              value={company}
              onChange={handleChange}
              onBlur={handleBlur}
            
              />
          </Campo>

          <Campo>
            <label htmlFor="image">Imágen</label>
            <FileUpLoader
              accept="image/*"
              id="imagen"
              name="imagen"
              randomizeFilename
              storageRef={firebase.storage.ref("products")}
              onUploadStart={handleUploadStart}
              onUploadError={handleUploadError}
              onUploadSuccess={handleUploadSuccess}
              onProgress={handleProgress}
              
              />
          </Campo>

          {errors.url && <Error>{errors.url}</Error> }

          <Campo>
            <label htmlFor="url">URL</label>
            <input 
              type="url" 
              id="url"
              name="url"
              placeholder="URL de tu producto"
              value={url}
              onChange={handleChange}
              onBlur={handleBlur}
              
              />
          </Campo>
        </fieldset>

        <fieldset>
          <legend>Sobre tu Producto</legend>

          {errors.description && <Error>{errors.description}</Error> }

          <Campo>
            <label htmlFor="description">Descripción</label>
            <textarea 
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              onBlur={handleBlur}
              
              />
          </Campo>
        </fieldset>

        {errorRegister && <Error>{errorRegister}</Error>}

        <InputSubmit 
          type="submit"
          value="Crear Producto"  
        />
      </Form>
    </Layout>
   );
}
 
export default NewProduct;