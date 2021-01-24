import React, {Component} from 'react';
import styled from 'styled-components';
import ShowcaseRow from './ShowcaseRow';

const ShowcaseFrame = styled.div`
    margin: 10%;
    border: 7px solid olivedrab;
    background-color: white;
`;

class Showcase extends Component{
    render(){
        const {showcase} = this.props;
        const bunchOfGrapes = showcase.map(s => <ShowcaseRow grapes={s}/>);
        return(
            <ShowcaseFrame>
               {bunchOfGrapes}
            </ShowcaseFrame>
        );
    }
}

export default Showcase;