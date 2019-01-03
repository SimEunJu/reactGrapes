import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as grapeAcions from '../../store/modules/grape';

class UserInput extends Component{
    state = {
        value: ''
    }

    handleClick = () => {
        const {UserInputAction}= this.props;
        const value = this.state.value;
        UserInputAction.changeDepth(value);
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            const {UserInputAction} = this.props;
            const value = this.state.value;
            UserInputAction.changeDepth(value);
        }
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render(){
        const {handleClick, handleKeyPress, handleChange} = this;

        return(
            <div>
                <input value={this.state.value} onChange={handleChange} onKeyPress={handleKeyPress}
                    placeholder='원하는 깊이를 입력해 주세요'
                ></input>
                <button onClick={handleClick}>변경하기</button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        value : state.grape.get('depth')
    }),
    (dispatch) => ({
        UserInputAction: bindActionCreators(grapeAcions, dispatch)
    })
)(UserInput);