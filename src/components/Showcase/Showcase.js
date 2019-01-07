import React, {Component} from 'react';
import styled from 'styled-components';
import ShowcaseRow from './ShowcaseRow';

const ShowcaseFrame = styled.div`
    margin: 10%;
    border: 7px solid olivedrab;
`;

class Showcase extends Component{
    render(){
        const {rgba, title} = this.props;
        return(
            <ShowcaseFrame>
                <ShowcaseRow title={title} rgba={rgba}/>
                <ShowcaseRow title={title} rgba={rgba}/>
            </ShowcaseFrame>
        );
    }
}

export default Showcase;