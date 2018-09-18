import React from 'react';

const Base64Image = props => {
    const { content } = props;

    return (
        <img src={`data:image/jpeg;base64,${content}`} />
    );
};

export default Base64Image;