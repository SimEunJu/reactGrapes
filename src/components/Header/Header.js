import React, {Component} from 'react';
import './Header.scss';

import JuiceBtn from '../JuiceBtn';

class Header extends Component {
    state = {
        value: '',
        branchStyle: {
            width: '40%'
        },
        leafStyle : {

        },
        btnText: '입력',
    }
    
    handleFocus = (e) => {
        this.setState({
            branchStyle: { width: '80%'},
            leafStyle: { transform: 'translateX(100%) rotate(0)'}
        });
    }

    handlekeyPress = (e) => {
        if(e.key === 'Enter'){
           this.changeStyle();
           this.props.setTitle(this.state.value);
        }
    }
    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    handleClick = () => {
        this.changeStyle();
        this.props.setTitle(this.state.value);
    }

    changeStyle = () => {
        this.setState({
            branchStyle : { width: '40%'},
            leafStyle: { transform: 'translateX(0) rotate(10deg)'},
        });
        if(this.state.value) this.setState({btnText: '수정'});
        else this.setState({btnText: '입력'});
    }
    render(){
        return (
            <div className='header'>
                <JuiceBtn />
                <input 
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    onKeyPress={this.handlekeyPress} 
                    onFocus={this.handleFocus} 
                    type='text' 
                    placeholder='제목을 입력해 주세요'></input>
                <div className='horizontalBranch' style={this.state.branchStyle}></div>
                <div className='verticalBranch'></div>
                <div className='leaf' onClick={this.handleClick} style={this.state.leafStyle}>
                    {this.state.btnText}
                </div>
            </div>
        );
    }
    
}

export default Header;