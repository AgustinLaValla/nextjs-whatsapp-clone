import React from 'react'
import { Header, IconsContainer, Search, SearchInput, SidebarButton, SidebarContainer, UserAvatar } from './SidebarElements'
import MoreVert from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { db } from '../../firebase/db'

export default function Sidebar() {

    const createChat = () => {
        const input = prompt('Plase enter an email address for the user you want to chat with');

        if(!input)return;

        if(EmailValidator.validate(input)) {
            db.collection('emails')
            .add({email: input})
            .then((resp) => {})
            .catch(console.log)
        }

    }

    return (
        <SidebarContainer>
            <Header>
                <UserAvatar />
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
        </SidebarContainer>
    )
}
