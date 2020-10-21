import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase/index';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/Error404.jsx';
import { css } from 'styled-components';
import styled from 'styled-components';
import {Campo, InputSubmit } from '../../public/styles/stylesForm';
import { Button, Button2 } from '../../public/styles/stylesButton';

const ContainerProduct = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
   }
`;
const CreatorProduct = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`

const Product = () => {

    // state del componente
    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment ] = useState({});
    const [consultDB, setConsultDB ] = useState(true);

    // Routing para obtener el id actual
    const Router = useRouter();
    const { query: { id }} = Router;

    // context de firebase
    const { firebase, user } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultDB) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();
                if(product.exists) {
                   setProduct( product.data() );
                   setConsultDB(false);
                } else {
                    setError( true );
                    setConsultDB(false);
                }
            }
            getProduct();
        }
    }, [id]);

    if(Object.keys(product).length === 0 && !error)  return 'Cargando...';

    const {
      comments, created, description, company, name, url, urlImage, votes, creator, hasVoted 
    } = product;

    // Administrar y validar los votos
    const voteProduct = () => {
        if(!user) {
            return Router.push('/login')
        }

        // obtener y sumar un nuevo voto
        const newTotal = votes + 1;

        // Verificar si el usuario actual ha votado
        if(hasVoted.includes(user.uid) ) return;

        // guardar el ID del usuario que ha votado
        const newHasVoted = [...hasVoted, user.uid];

        //  Actualizar en la BD
        firebase.db.collection('products').doc(id).update({ 
            votes: newTotal, 
            hasVoted: newHasVoted 
        });

        // Actualizar el state
        setProduct({
            ...product,
            votes: newTotal,
        })

        setConsultDB(true); // hay un voto, por lo tanto consultar a la BD
    }

    // Funciones para crear comentarios
    const commentChange = e => {
        setComment({
            ...comment,
            [e.target.name] : e.target.value,
        });
    };

    // Identifica si el comentario es del creador del producto
    const isCreator = id => {
        if(creator.id == id) {
            return true;
        }
    }

    const addComment = e => {
        e.preventDefault();

        if(!user) {
            return Router.push('/login')
        }

        // información extra al comentario
        comment.userId = user.uid;
        comment.userName = user.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const newsComments = [...comments, comment];

        // Actualizar la BD
        firebase.db.collection('products').doc(id).update({
            comments: newsComments,
        });

        // Actualizar el state
        setProduct({
            ...product,
            comments: newsComments
        });

        setConsultDB(true); // hay un COMENTARIO, por lo tanto consultar a la BD
    }

    // función que revisa que el creador del producto sea el mismo que esta autenticado
    const canRemove = () => {
        if(!user) return false;

        if(creator.id === user.uid) {
            return true
        }
    }

    // elimina un producto de la bd
    const deleteProduct = async () => {

        if(!user) {
            return Router.push('/login')
        }

        if(creator.id !== user.uid) {
            return Router.push('/')
        }

        try {
            await firebase.db.collection('products').doc(id).delete();
            Router.push('/')
        } catch (error) {
            console.log(error);
        }
    };

    return ( 
        <Layout>
            <>
                { error ? <Error404 /> : (
                    <div className="container">
                        <h1 css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}>{name}</h1>

                        <ContainerProduct>
                            <div>
                                <p>Publicado hace: { formatDistanceToNow( new Date(created), {locale: es} )} </p>
                                <p>Por: {creator.name} de {company} </p>
                                <img src={urlImage} />
                                <p>{description}</p>

                                { user && (
                                    <>
                                    <h2>Agrega tu comentario</h2>
                                    <form
                                        onSubmit={addComment}
                                    >
                                        <Campo>
                                            <input
                                                type="text"
                                                name="message"
                                                onChange={commentChange}
                                            />
                                        </Campo>
                                        <InputSubmit
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                    </>
                                ) }

                                <h2 css={css`
                                    margin: 2rem 0;
                                `}>Comentarios</h2>

                                {comments.length === 0 ? "Aún no hay comentarios" : (
                                    <ul>
                                        {comments.map((comment, i) => (
                                            <li 
                                                key={`${comment.userId}-${i}`}
                                                css={css`
                                                    border: 1px solid #e1e1e1;
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comment.message}</p>
                                                <p>Escrito por: 
                                                    <span
                                                        css={css`
                                                            font-weight:bold;
                                                        `}
                                                    >
                                                    {''} {comment.userName}
                                                    </span>
                                                </p>
                                                { isCreator( comment.userId ) && <CreatorProduct>Es Creador</CreatorProduct> }
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                
                            </div>

                            <aside>
                                <Button
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Button>

                            

                                <div
                                    css={css`
                                        margin-top: 5rem;
                                    `}
                                >
                                    <p css={css`
                                        text-align: center;
                                    `}>{votes} Votos</p>

                                    { user && (
                                        <Button2
                                            onClick={voteProduct}
                                        >
                                            Votar
                                        </Button2>
                                    ) }
                                </div>
                            </aside>
                        </ContainerProduct>

                        { canRemove() && 
                            <Button
                              onClick={deleteProduct}
                            >Eliminar Producto</Button>
                        }
                    </div>
                ) }

                
            </>
        </Layout>
      );
}
 
export default Product;