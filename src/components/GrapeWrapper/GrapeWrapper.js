import React, {Component} from 'react';
import './GrapeWrapper.scss';

import Grape from '../Grape';

class GrapeWrapper extends Component {
    makegrape = () => {
        const {depth, color, handleClick} = this.props;
        const grapes = [];
        let offset = 0;
        for (let i = 0; i < depth; i++) {
            grapes[i] = [];
            for (let j = 0; j < depth-i; j++) {
                grapes[i][j] = <Grape
                    depth={depth} 
                    color={color[offset]}
                    handleClick={handleClick}
                    offset={offset++}/>;
                }
            let seed = <div className='grapeWrap'>{grapes[i]}</div>;
            grapes[i] = seed;
        }
        return grapes;
    }
    render(){
        const grape = this.makegrape();
        return(
        <div className='grapeContainer'>
            {grape}
        </div>
        );
    }
}

export default GrapeWrapper;