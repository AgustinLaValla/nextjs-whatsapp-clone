import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar/Sidebar';
import ChatScreen from '../../components/ChatScreen/ChatScreen';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { db } from '../../firebase/db';
import { Message } from '../../interfaces/message.interface';
import firebase from 'firebase';
import { useAuthState } from '../../hooks/useAuthState';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

export default function Chat({ messages, chat }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [user] = useAuthState();

    return (
        <Container>
            <Head>
                <title>Chat with {getRecipientEmail(chat.users, user)}</title>
            </Head>
            <Sidebar />
            <ChatContainer>
                <ChatScreen 
                    chat={chat} 
                    user={user as firebase.User} 
                    messages={messages}
                    users={chat.users}
                />
            </ChatContainer>
        </Container>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const chatRef = db.collection('chats').doc(context.query.id as string);

    const messagesResp = await chatRef
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get();

    const messages: Message[] = messagesResp.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }) as Message)
        .map(messages => ({
            ...messages,
            timestamp: (messages.timestamp as firebase.firestore.Timestamp).toDate().getTime()
        }));

    const chatRes  = await chatRef.get();
    const chat = {
        id: chatRef.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat
        }
    }
}

const Container = styled.div`
    display: flex;
    
    & > div:first-of-type {
        width: 20%;
    }
    
`;
const ChatContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    height: 100vh;
`;