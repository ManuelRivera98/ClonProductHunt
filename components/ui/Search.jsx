import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
const InputSubmit = styled.input`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/images/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover {
        cursor: pointer;
    }
`;

const Search = () => {

  const Router = useRouter();

  const [searchInput, setSearchInput] = useState('');

  const searchProduct = (event) => {
    event.preventDefault();

    if (searchInput.trim() === '') return;

    // Redireccionar al user hacía search component
    Router.push(`/search/${searchInput}`);
  }

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={searchProduct}
    >
      <InputText
        type="text"
        placeholder="Buscar Productos"
        onChange={(event) => setSearchInput(event.target.value)}

      />

      <InputSubmit
        type="submit"
        value="Send"
      />
    </form>
  );
}

export default Search;