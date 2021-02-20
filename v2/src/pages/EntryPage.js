import React from 'react';

import DepthInput from '../components/atoms/DepthInput';
import Depth from '../components/atoms/Depth';
import StartBtn from '../components/atoms/StartBtn';
import EntryLayout from '../components/atoms/EntryLayout';

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