import React, { useState } from 'react';
import { css } from 'styled-components';
import { Campo, Form, InputSubmit } from '../public/styles/stylesForm';
import { Error } from '../public/styles/stylesError';

import { useRouter } from 'next/router';

import Layout from '../components/layout/Layout';

// firebase instancia
import firebase from '../firebase/index';

// Validations
import useValidationForm from '../hooks/useValidationForm';
import validationCreateAccount from '../validation/validationCreateAccount';

const CreateAccount = () => {

  const [errorRegister, setErrorRegister] = useState(null);
  const Router = useRouter();

  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const { 
    values, errors, handleBlur, handleChange, handleSubmit 
  } = useValidationForm(initialState, validationCreateAccount, createAccountFn);

  const { name, email, password } = values;

  // Ayudarnos del hoisting de js
  async function createAccountFn() {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch(error) {
     console.error('Hubo un error al crear el usuario', error.message); 
     setErrorRegister(error.message);
    }
  };

  return ( 
    <Layout title="Crear Cuenta">
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem; 
        `}
      >Crear Cuenta</h1>

      <Form
        onSubmit={handleSubmit}
      >
        {errors.name && <Error>{errors.name}</Error> }

        <Campo>
          <label htmlFor="name">Nombre</label>
          <input 
            type="text" 
            id="name"
            placeholder="Tu nombre"
            name="name"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
        </Campo>

        {errors.email && <Error>{errors.email}</Error> }

        <Campo>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            placeholder="Tu Email"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
        </Campo>

        {errors.password && <Error>{errors.password}</Error> }

        <Campo>
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
        </Campo>

        {errorRegister && <Error>{errorRegister}</Error>}

        <InputSubmit 
          type="submit"
          value="Crear Cuenta"  
        />
      </Form>
    </Layout>
   );
}
 
export default CreateAccount;