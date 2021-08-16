import React from 'react'
import styled from 'styled-components'
import { Circle } from 'better-react-spinkit';

type LoadingProps = {
    size: 'default' | 'large';
}

export default function Loading({ size }: LoadingProps) {
    return (
        <Center>
            <Circle color="#3cbc28" size={size === 'large' ? 120 : 60} />
        </Center>
    )
}

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;