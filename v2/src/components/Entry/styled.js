import styled from 'styled-components';

export const EntryContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100vh;
`;

export const BtnWrap = styled.div`
    width: 120px;
    height: 120px;
    border: 4px solid purple;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Btn = styled.button`
    margin-top: 0;
    border: 2px solid purple;
    border-radius: 50%;
    background-color: white;
    height: 100px;
    width: 100px;
    text-align: center;
    font-size: 20px;
    color: purple;
    font-weight: bold;
    outline: none;
`;
export const BtnArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: ${p => p.ready? 'all 1s ease-out 0.3s' : ''};
    visibility: ${p => p.ready? '' : 'hidden'};
    transform: ${p => p.ready? 'translateX(0)' : 'translateX(-10vw)'};
`;
