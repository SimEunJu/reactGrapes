import React from 'react';
import Entry from '../components/Entry';
import DepthInput from '../components/DepthInput';
import Depth from '../components/Depth';
import StartBtn from '../components/StartBtn';

const EntryPage = () => (
    <Entry>
        <DepthInput />
        <Depth />
        <StartBtn />
    </Entry>
);

export default EntryPage;