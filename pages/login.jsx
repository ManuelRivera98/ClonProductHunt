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
import validationLogin from '../validation/validationLogin';


const Login = () => {

  const [errorLogin, setErrorLogin] = useState(null);
  const Router = useRouter();

  const initialState = {
    email: '',
    password: '',
  };

  const { 
    values, errors, handleBlur, handleChange, handleSubmit 
  } = useValidationForm(initialState, validationLogin, LoginUserFn);

  const { email, password } = values;
  console.log(errors);

  // Ayudarnos del hoisting de js
  async function LoginUserFn () {
    try {
      await firebase.LoginUser(email, password);
      Router.push("/");
    } catch(error) {
     console.error('Hubo un error al autenticar el usuario', error.message); 
     setErrorLogin(error.message);
    }
  }

  return ( 
    <Layout title="Iniciar Sesión">
      <h1
        css={css`
          text-align: center;
          margin-top: 5rem; 
        `}
      >Iniciar Sesión</h1>

      <Form
        onSubmit={handleSubmit}
      >

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

        {errorLogin && <Error>{errorLogin}</Error>}

        <InputSubmit 
          type="submit"
          value="Iniciar Sesión"  
        />
      </Form>
    </Layout>
   );
}
 
export default Login;