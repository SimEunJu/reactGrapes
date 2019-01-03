import React from 'react';
import './Grape.scss';

const Grape = ({handleClick, depth, color, offset}) => {
    const size = Math.floor(window.innerHeight/depth);
    return (
    <div 
        onClick={()=>handleClick(offset)} 
        className='grape' 
        style={
            {'backgroundColor': color,
            'width': size,
            'height': size}
        }>
    </div>
    );
};

export default Grape;