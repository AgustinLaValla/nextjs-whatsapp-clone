import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar/Sidebar';

export default function Chat() {
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                {/* <ChatScreen></ChatScreen> */}
            </ChatContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    
`;
const ChatContainer = styled.div``;
const ChatScreen = styled.div``;