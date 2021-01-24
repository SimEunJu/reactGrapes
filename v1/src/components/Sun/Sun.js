import React, {Component} from 'react';
import './Sun.scss';

class Sun extends Component{
    state ={
        svgClass: 'sunSvg',
        circleClass: ''
    }

    componentWillReceiveProps(nextProps){
        const {isSunRotate} = nextProps;
        if(isSunRotate){
            this.setState({svgClass: 'sunSvg', circleClass: ''});
            setTimeout(() => 
                this.setState({svgClass: 'sunSvg shineRotate', circleClass: 'shineColor'}), 100);
        }
    }

    render(){      
        return(
            <svg className={this.state.svgClass} width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
                <line x1='5' y1='50' x2='95' y2='50' stroke='orange' strokeWidth='2.5'></line>
                <line x1='50' y1='5' x2='50' y2='95' stroke='orange' strokeWidth='2.5'></line>
                <line x1='18.75' y1='18.75' x2='81.25' y2='81.25' stroke='orange' strokeWidth='2.5'></line>
                <line x1='81.25' y1='18.75' x2='18.75' y2='81.25' stroke='orange' strokeWidth='2.5'></line>
                <circle cx='50' cy='50' fill='orange' r='30' className={this.state.circleClass}></circle>
            </svg>
        );
    }
}
export default Sun;