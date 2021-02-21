import React from 'react';

import DepthInput from '../atoms/DepthInput';
import Depth from '../atoms/Depth';
import StartBtn from '../atoms/StartBtn';
import EntryLayout from '../atoms/EntryLayout';

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