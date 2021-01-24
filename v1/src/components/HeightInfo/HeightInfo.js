import React, {Component} from 'react';
import styled from 'styled-components';

const Grape = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: green;
`;
const GrapeWrap = styled.div`
    display: flex;
    justify-content: center;
`;
const Grapes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${p => p.ready? 'all 1s ease-out' : ''};
    visibility: ${p => p.ready? '' : 'hidden'};
    transform: ${p => p.ready? 'translateX(0)' : 'translateX(-10vw)'};
`;
const Msg = styled.div`
    padding: 10px;
    text-align: center;
    heigth: 200px;
    width: 200px;
    color: purple;
    font-size: 20px;
`;

class HeightInfo extends Component{
    renderGrapes = () => {
        const {depth} = this.props;
        const keeping = [];
        for (let i = 0; i < depth; i++) {
            keeping[i] = []
            for (let j = i; j < depth; j++) {
                keeping[i].push(<Grape />)
            }
            const tempGrapes = <GrapeWrap>{keeping[i]}</GrapeWrap>
            keeping[i] = tempGrapes;
        }
        return keeping;
    }
    render() {
        const {depth} = this.props;
        let d = parseInt(depth);
        if(!d) d=0;
        const cnt = (d*(d+1))/2;
        return(
            <Grapes ready={depth > 0}>
                <Msg>
                    {this.renderGrapes()}
                    {cnt}일 동안<br />진행할 수 있습니다!
                </Msg>
            </Grapes>
        );
    }
}

export default HeightInfo;