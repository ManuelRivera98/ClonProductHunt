import React, { useContext } from 'react'

import styled, { css } from 'styled-components';
import { Button, Button2 } from '../../public/styles/stylesButton';

import Link from 'next/link';

import Search from '../ui/Search';
import NavBar from './NavBar';
import { FirebaseContext } from '../../firebase/index';

const ContainerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

  const { user, firebase } = useContext(FirebaseContext);

  return ( 
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 2rem 0;
      `}
    >
      <ContainerHeader>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/" passHref>
            <Logo>P</Logo>
          </Link>

          <Search />

          <NavBar />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {
            user
            ? <>
                <p
                  css={css`
                    margin-right: 2rem;
                `}
                >Hola: {user.displayName}</p>
                {/* Le falta la propierty href a Button, es un tag a */}
                <Button2
                  bgColor="true" 
                  onClick={() => firebase.LogOut()}           
                >Cerrar Sesión</Button2>
              </>
            : <>
                <Link href="/login" passHref>
                  <Button
                    bgColor="true"
                  >Login</Button>
                </Link>
                <Link
                  href="/create-account"
                  passHref

                >
                  <Button>Crear Cuenta</Button>
                </Link>
              </>
          }

        </div>
      </ContainerHeader>
    </header>
   );
}
 
export default Header;