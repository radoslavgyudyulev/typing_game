import React from 'react';

import '../../App.css'

function word(props) {
    const { word } = props
    return (
        <div className="word-wrapper">
            <h2>
            {word}
            </h2>
        </div>
        
    )
}

export default word