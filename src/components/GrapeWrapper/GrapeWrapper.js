import React, {Component} from 'react';
import './GrapeWrapper.scss';

import Grape from '../Grape';
import Sun from '../Sun';

class GrapeWrapper extends Component {
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.savedJuice !== this.props.savedJuice) return false;
        return true;
    }
    makegrape = () => {
        const {depth, color, handleClick, isJuice, savedJuice, handleModalOpen} = this.props;
        const grapes = [];
        let offset = 0;
        for (let i = 0; i < depth; i++) {
            grapes[i] = [];
            for (let j = 0; j < depth-i; j++) {
                grapes[i][j] = <Grape
                    depth={depth} 
                    color={color[offset]}
                    handleClick={handleClick}
                    offset={offset++}
                    isJuice={isJuice}
                    savedJuice={savedJuice}
                    handleModalOpen={handleModalOpen}/>;
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
            <Sun isSunRotate={this.props.isSunRotate}/>
            <div>
                {grape}
            </div>
        </div>
        );
    }
}

export default GrapeWrapper;