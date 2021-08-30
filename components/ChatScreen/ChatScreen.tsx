import React from 'react'
import styled from 'styled-components'
import { Chat } from '../../interfaces/Chat.interface';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import firebase from 'firebase';
import { Message } from '../../interfaces/message.interface';
import { useRouter } from 'next/dist/client/router';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useGetMessagesCollection } from '../../hooks/useGetMessagesCollections';
import MessageComponent from '../Message/Message';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';
import { db } from '../../firebase/db';
import { useGetUserData } from '../../hooks/useGetUserData';
import { useGetRecipientData } from '../../hooks/useGetRecipientData';
import TimeAgo from 'timeago-react'


interface ChatScreenProps {
    chat: Chat,
    user: firebase.User,
    messages: Message[],
    users: [string, string]
}

export default function ChatScreen({ chat, user, messages, users }: ChatScreenProps) {

    const { query } = useRouter();
    const recipientEmail = getRecipientEmail(users, user);
    const [messagesCollection] = useGetMessagesCollection(query.id as string);
    const [inputMessage, setInputMessage] = React.useState('');
    const [userDoc] = useGetUserData(user?.uid);
    const [recipientData] = useGetRecipientData(recipientEmail);
    const endOfMessageRef = React.useRef<HTMLDivElement>(null);

    const showMessages = () => {
        if (messagesCollection.length) {
            return (
                messagesCollection.map(message => (
                    <MessageComponent
                        key={message.id}
                        message={message}
                    />
                ))
            )
        }
    };

    const sendNewMessage = (ev: any, fromSubmit = false) => {
        if(fromSubmit) {
            ev.preventDefault();
        }

        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, {merge: true});

        db.collection('chats')
            .doc(chat.id)
            .collection('messages')
            .add({
                message: inputMessage,
                user: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                photoURL: user.photoURL
            })
            .then(() => {
                setInputMessage('');
                scrollToBottom();
            })
            .catch(err => console.log(err));
    }

    const getLastSeen = (lastSeen: any) => {
        if(lastSeen) {
            return <TimeAgo datetime={lastSeen?.toDate()}/>
        }
        return 'Unavailable';
    }

    const scrollToBottom = () => {
        if(endOfMessageRef) {
            (endOfMessageRef.current as HTMLDivElement).scrollIntoView({
                behavior: 'smooth',
                block: "start"
            });
        }

    }

    return (
        <Container>
            <Header>
                {recipientData 
                    ?
                    <Avatar src={recipientData?.photoURL}/>
                    :
                    <Avatar>{recipientEmail?.[0].toLocaleUpperCase()}</Avatar>
                }

                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientData 
                        ? 
                        <p>Last active: {getLastSeen(userDoc?.lastSeen)}</p>
                        :
                        <p>Loading last active...</p>    
                    }
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>

            <InputContainer onSubmit={ev => sendNewMessage(ev, true)}>
                <InsertEmoticonIcon />
                <Input
                    value={inputMessage}
                    onChange={ev => setInputMessage(ev.target.value)}
                />
                <button 
                    hidden 
                    disabled={!inputMessage} 
                    type="submit" 
                >
                    Send Message
                </button>
                <MicIcon />
            </InputContainer>
        </Container>
    )
}

const Container = styled.div``;
const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    & > h3 {
        margin: 0 0 3px 0;
    }

    & > p {
        font-size: 14px;
        color: gray;
        margin: 0;
    }

`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
    min-height: 79vh;
    padding: 30px;
    background: #e5ded8;
`;
const EndOfMessage = styled.div``;
const InputContainer = styled.form`
    display: flex;
    padding: 10px;
    align-items: center;
    position: sticky;
    bottom: 0;
    background-color: white;
    z-index: 100;
    /* width: 100%; */
`;
const Input = styled.input`
    flex: 1;
    align-items: center;
    padding: 1;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
    border: none;
    outline: none;
`;