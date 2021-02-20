import React from 'react';

import DepthInput from '../components/DepthInput';
import Depth from '../components/Depth';
import StartBtn from '../components/StartBtn';
import EntryLayout from '../components/EntryLayout';

const EntryPage = () => {

    return ( 
        <EntryLayout>
            <DepthInput />
            <Depth />
            <StartBtn />
        </EntryLayout>
    );
};

export default EntryPage;