import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    max-width: 100%;
    height: auto;
`;

const Base64Image = props => {
    const { content } = props;

    return (
        <Image src={`data:image/jpeg;base64,${content}`} />
    );
};

export default Base64Image;