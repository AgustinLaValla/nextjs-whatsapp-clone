import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { Message } from '../../interfaces/message.interface';
import { useAuthState } from '../../hooks/useAuthState';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

interface MessageComponentProps {
    message: Message
}

export default function MessageComponent({ message }: MessageComponentProps) {
    const [user] = useAuthState();

    const Bubble = message?.user === user?.email ? Sender : Receiver;

    return (
        <Container>
            <Bubble>
                {message.message}
                <Timestamp>
                    {message.timestamp ? dayjs(message.timestamp as number).format('h:mm A') : '...'}
                </Timestamp>
            </Bubble>
        </Container>
    )
}


const Container = styled.div``;

const MessageElement = styled.p`
    width: fit-content;
    padding: 15px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    padding-bottom: 26px;
    position: relative;
    text-align: right;
`;

const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
`;

const Receiver = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`;

const Timestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 9px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;