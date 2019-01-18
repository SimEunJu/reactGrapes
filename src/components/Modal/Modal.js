import React, {Component} from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: absolute;
    background: rgba(0,0,0,0.2);
    width: 100vw;
    height: calc(100vh + ${p=>p.top}px);
    top: 0;
`;
const GrapeModal = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;
const XBtn = styled.div`
    font-weight: bolder;
    font-size: 20px;
    cursor: pointer;
    position: fixed;
    left: calc(50vw + 120px);
    top: 30vh;
`;
const TextBox = styled.div`
    width: 200px;
    height: 200px;
    position: fixed;
    background-color: white;
    padding: 1%;
`;

class Modal extends Component{
    constructor(props){
        super(props);
        this.reference = React.createRef();
    }
    state={top: 0}
    componentDidMount() {
        this.setState({top: this.getOffsetTop()});
    }
    getOffsetTop = () => {
        return this.reference.current.offsetTop;
    }
    render(){
        return(
            <div ref={this.reference}>
                <ModalWrapper top={this.state.top}>
                    <GrapeModal>
                        <XBtn onClick={this.props.handleModalClose}>X</XBtn>
                        <TextBox>
                            <input type="text" placeholder="제목을 입력해 주세요"></input>
                            <textarea cols="10"></textarea>
                        </TextBox>
                    </GrapeModal>
                </ModalWrapper>
            </div>
        );    
    }
}

export default Modal;