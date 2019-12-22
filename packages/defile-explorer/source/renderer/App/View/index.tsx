import React from 'react';

import Pluriverse from '../../modules/containers/Pluriverse';
import TopBar from '../../modules/components/TopBar';



const View: React.FC<any> = () => {
    return (
        <div>
            <TopBar />

            <Pluriverse />
        </div>
    );
}


export default View;
