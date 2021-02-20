import React, {useCallback, useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useEffectOnlyUpdate from '../../hooks/useEffectOnlyUpdate';

const ModalBackground = styled.div`
    position: absolute;
    background: rgba(0,0,0,0.2);
    width: 100vw;
    height: 100vh;
    top: 0;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const GrapeModal = styled.div`
    width: 300px;
    padding: 10px;
    background-color: beige;
`;
const XBtn = styled.div`
    text-align: right;
    font-size: 20px;
    cursor: pointer;
`;
const SubmitBtn = styled.div`
    border: 1.5px solid seagreen;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
    padding: 6px;
    width: 30%;
    text-align: center;
    margin: auto;
    margin-top: 10px;

    &:hover{
        background-color: seagreen;
        color: white;
    }
`;

const TextBox = styled.div`
    width: 100%;
    height: 300px;

    & > * {
        width: 100%;
        box-sizing: border-box;
        padding: 3px;
        border: 1.5px solid seagreen;
    }
    input{
        height: 10%;
        margin-bottom: 2px;
    }
    textarea{  
        height: 90%;
    }
`;

const Modal = ({isContentChangeSuccess, editGrapeContent, closeModal}) => {
    const modalRef = useRef();

    const {modalTitle, modalContent} = useSelector(({grape}) => ({
        modalTitle: grape.modalTitle,
        modalContent: grape.modalContent
    }))

    const [top, setTop] = useState(0);
    const [title, setTitle] = useState(modalTitle);
    const [content, setContent] = useState(modalContent);

    useEffect(() => {
        const top = modalRef.current.getBoundingClientRect().top;
        setTop(top);
    }, []);
    
    useEffectOnlyUpdate(() => {
        if(isContentChangeSuccess) closeModal(); 
    }, [isContentChangeSuccess]);

    const editTitle = useCallback(({target: {value}}) => {
        setTitle(value);
    }, [setTitle]);

    // TODO: textarea는 controlled인가 아닌가
    const editContent  = useCallback(({target: {value}}) => {
        setContent(value);
    }, [setContent]);

    return(
        <ModalBackground top={top} ref={modalRef}>
            <GrapeModal>
                <XBtn onClick={closeModal}>&#10006;</XBtn>
                <TextBox>
                    <input 
                        onChange={editTitle} 
                        name="title"
                        value={title} 
                        type="text" 
                        placeholder="제목을 입력해 주세요" 
                    ></input>
                    <textarea 
                        onChange={editContent} 
                        name="content"
                        value={content} 
                        cols="10" 
                        placeholder="내용을 입력해 주세요"
                    ></textarea>
                </TextBox>
                <SubmitBtn 
                    onClick={() => editGrapeContent({title, content})}>
                    입력
                </SubmitBtn>
            </GrapeModal>
        </ModalBackground>
    );    
    
}

export default Modal;