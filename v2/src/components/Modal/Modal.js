import React, {Component} from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: absolute;
    background: rgba(0,0,0,0.2);
    width: 100vw;
    height: calc(100vh + ${p=>p.top}px);
    top: 0;
    z-index: 2;
`;
const GrapeModal = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;
const XBtn = styled.div`
    position: fixed;
    left: calc(50vw + 120px);
    top: 30vh;
    font-size: 20px;
    cursor: pointer;
`;
const SubmitBtn = styled.div`
    position: fixed;
    border: 1.5px solid seagreen;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
    top: calc(50vh + 120px);
    padding: 6px;
    width: 10%;
    text-align: center;
`;

const TextBox = styled.div`
    width: 200px;
    height: 200px;
    position: fixed;
`;
const inputStyle = {
    width: '100%',
    height: '15%',
    padding: '2px',
    marginBottom: '2px',
    border: '1.5px solid seagreen'
}
const textareaStyle = {
    width: '100%', 
    height: '85%',
    border: '1.5px solid seagreen',
    fontFamily: 'inherit'
};
class Modal extends Component{
    constructor(props){
        super(props);
        this.reference = React.createRef();
        this.state = {
            top: 0,
            title: this.props.grapeContent.title,
            content: this.props.grapeContent.content
        }
    }
    componentDidMount() {
        this.setState({...this.state, top: this.getOffsetTop()});
    }
    getOffsetTop = () => {
        return this.reference.current.offsetTop;
    }
    handleTitleChange = (e) => {
        this.setState({...this.state, title:e.target.value});
    }
    handleContentChange = (e) => {
        this.setState({...this.state, content:e.target.value});
    }
    render(){
        const {offset, setContentSuc} = this.props;
        const {title, content} = this.state;
       
        if(setContentSuc) this.props.handleModalClose(); 
        
        return(
            <div ref={this.reference}>
                <ModalWrapper top={this.state.top}>
                    <GrapeModal>
                        <TextBox>
                            <input onChange={this.handleTitleChange} value={title} type="text" placeholder="제목을 입력해 주세요" style={inputStyle}></input>
                            <textarea onChange={this.handleContentChange} value={content} cols="10" placeholder="내용을 입력해 주세요" style={textareaStyle}></textarea>
                        </TextBox>
                        <XBtn onClick={this.props.handleModalClose}>&#10006;</XBtn>
                        <SubmitBtn onClick={() => this.props.handleGrapeContent({title, content, offset})}>입력</SubmitBtn>
                    </GrapeModal>
                </ModalWrapper>
            </div>
        );    
    }
}

export default Modal;