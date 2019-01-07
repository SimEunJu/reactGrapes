import React, {Component} from 'react';
import './Sun.scss';

class Sun extends Component{
    state ={
        classes: 'sunSvg'
    }

    componentWillReceiveProps(nextProps){
        const {isSunRotate} = nextProps;
        if(isSunRotate){
            this.setState({classes: 'sunSvg'});
            setTimeout(() => 
                this.setState({classes: 'sunSvg shine'}), 100);
        }
    }

    render(){      
        return(
            <svg className={this.state.classes} width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='50' cy='50' fill='red' r='30'></circle>
                <line x1='5' y1='50' x2='95' y2='50' stroke='red' strokeWidth='2.5'></line>
                <line x1='50' y1='5' x2='50' y2='95' stroke='red' strokeWidth='2.5'></line>
                <line x1='18.75' y1='18.75' x2='81.25' y2='81.25' stroke='red' strokeWidth='2.5'></line>
                <line x1='81.25' y1='18.75' x2='18.75' y2='81.25' stroke='red' strokeWidth='2.5'></line>
            </svg>
        );
    }
}
export default Sun;