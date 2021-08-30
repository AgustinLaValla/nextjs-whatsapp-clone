import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export const SidebarContainer = styled.div`
    height: 100vh;
    flex: 0.45;
    overflow-y: auto;
    min-width: 300px;
    max-width: 350px;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style:none;
    scrollbar-width: none;
`;

export const Header = styled.div`
    display: flex;
    position: sticky;
    top:0;
    background-color: white;
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

export const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;

    }
`;

export const IconsContainer = styled.div``;

export const Search = styled.div`
    /* margin-top: 84px; */
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid lightgrey;
    padding: 10px 10px;

`;

export const SearchInput = styled.input`
    height: 35px;
    flex:1;
    border: none;
    outline: none;
`;

export const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;
