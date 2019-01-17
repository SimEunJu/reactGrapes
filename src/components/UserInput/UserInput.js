import React, {Component} from 'react';
import './UserInput.scss';

class UserInput extends Component{
    state={
        value: ''
    }
    handleChange = (e) => {
        this.setState({value: e.target.value});
    }
    
    render(){
        const {handleClick} = this.props;
        return(
            <div className='userInputWrap'>
                <label>포도 송이 높이</label>
                <input 
                    className='userInput'
                    value={this.state.value} 
                    onChange={this.handleChange}
                    placeholder='원하는 깊이를 입력해 주세요'>
                </input>
                <button
                    onClick={() => handleClick(this.state.value)}
                    onKeyPress={() => handleClick(this.state.value)}>
                    입력
                </button>
        </div> 
        );
    }
}

export default UserInput;