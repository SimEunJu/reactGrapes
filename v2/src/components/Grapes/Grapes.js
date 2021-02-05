import React, { useMemo} from 'react';
import './Grapes.scss';
import Grape from '../Grape';
import { GREEN, PURPLE } from '../../common/Color';
import { shallowEqual, useSelector } from 'react-redux';

const Grapes = (props) => {

    const {depth, grape, isJuiceMaking, isJuiceSaved} = useSelector( ({grape}) => ({
        depth: grape.get('depth'),
        grape: grape.get('grape'),
        isJuiceMaking: grape.get('isJuiceMaking'),
        isJuiceSaved: grape.get('isJuiceSaved')
    }), shallowEqual);

    // TODO: Depth 컴포넌트의 makeGrapeComponent 메소드와 합쳐서 refactor
    // TODO: 포도알 간의 간격을 줄이기 위해서는 canvas 사용해야 할 듯
    const makeGrapeComponent = useMemo(() => {
        const {openModal, changeGrapeChecked} = props;

        const grapeRows = [];
        const {clientHeight, clientWidth} = document.documentElement;
        const sizeOfGrape = Math.floor( (Math.min(clientHeight, clientWidth)-200) / depth );

        for (let row = 0; row < depth; row++) {
            const grapeRow = [];
            const cntPerRow = depth - row;
            for (let col = 0; col < cntPerRow; col++) {
                const idx = row*depth + col;
                grapeRow.push(<Grape
                    idx={idx}
                    key={idx}
                    size={sizeOfGrape}
                    color={grape[idx].isChecked ? PURPLE : GREEN}
                    startJuiceAni={isJuiceMaking}
                    endJuiceAni={isJuiceSaved}
                    openModal={openModal}
                    changeGrapeChecked={changeGrapeChecked}/>
                );
            }
            grapeRows[row] = <div className='grapeWrap'>{grapeRow}</div>;
        }
        return grapeRows;
    }, [props]);

    return(
        <div className='grapeContainer'>  
            {makeGrapeComponent}
        </div>
    );

}

export default Grapes;