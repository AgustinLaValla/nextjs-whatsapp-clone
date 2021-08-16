import { Avatar } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components'
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import firebase from 'firebase';
import { db } from '../../firebase/db';
import { User } from '../../interfaces/User';
import { useRouter } from 'next/dist/client/router';

type ChatProps = {
    users: [string, string],
    user: firebase.User | null | undefined,
    id: string
}

export default function Chat({ users, user, id }: ChatProps) {
    const router = useRouter();
    const recipientEmail = getRecipientEmail(users, user);
    const recipient = React.useRef<User | null>(null);

    db.collection('users').where('email', '==', recipientEmail).onSnapshot(resp => {
        recipient.current = resp?.docs?.[0]?.data() as User | null;
    })

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <Container onClick={enterChat}>
            {
                recipient.current ? (
                    <UserAvatar src={recipient.current?.photoURL} />
                ) : (
                    <UserAvatar>{recipientEmail?.[0].toLocaleUpperCase()}</UserAvatar>
                )
            }
            <p>{recipientEmail}</p>
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-workd;
    
    :hover {
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;

`;