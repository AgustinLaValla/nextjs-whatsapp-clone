import React from 'react'
import styled from 'styled-components'
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase/db';

export default function Login() {

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
        .catch(alert)
    }

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://es.logodownload.org/wp-content/uploads/2018/10/whatsapp-logo-11.png"/>
                <Button variant="outlined" onClick={signInWithGoogle}>Sign In With Google</Button>
            </LoginContainer>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    padding: 100px;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;
    margin-bottom: 50px;
`;