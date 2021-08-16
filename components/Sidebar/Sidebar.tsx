import React from 'react'
import { Header, IconsContainer, Search, SearchInput, SidebarButton, SidebarContainer, UserAvatar } from './SidebarElements'
import MoreVert from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { auth } from '../../firebase/db'
import { useAuthState } from '../../hooks/useAuthState'
import { useChatAlreadyExist } from '../../hooks/useChatAlreadyExist'
import { useCreateChat } from '../../hooks/useCreateChat'
import { useGetChatCollection } from '../../hooks/useGetChatCollection'
import Chat from './Chat'

export default function Sidebar() {

    const [user] = useAuthState();
    const [receipientUser, setReceipientUser] = React.useState<string>('');
    const [chats] = useGetChatCollection(user);
    const [chatAlreadyExist, setChatExist] = useChatAlreadyExist(user, receipientUser, chats);
    useCreateChat(user, receipientUser, chatAlreadyExist, setChatExist);

    const createChat = () => {
        const input = prompt('Plase enter an email address for the user you want to chat with');

        if(!input)return;

        if(EmailValidator.validate(input) && input !== user?.email) {
            setReceipientUser(input);
        } else {
            alert('Invalid Email');
        }
    }

    return (
        <SidebarContainer>
            <Header>
                <UserAvatar onClick={() => auth.signOut()}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in Charts"/>
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
            {chats.map(chat => (
                <Chat 
                    key={chat.id} 
                    id={chat.id}
                    users={chat.users} 
                    user={user}
                />
            ))}
        </SidebarContainer>
    )
}
