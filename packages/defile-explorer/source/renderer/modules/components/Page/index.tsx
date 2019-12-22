import React, {
    // useRef,
    // useContext,
    // useState,
    // useEffect,
} from 'react';

import {
    StyledPage,
} from './styled';

// import PageBar from './components/PageBar';

// import PluriverseContext from '../../containers/Pluriverse/context';



interface PageProperties {
    id: string;
}

const Page: React.FC<PageProperties> = (properties) => {
    // const context: any = useContext(PluriverseContext);

    return (
        <StyledPage>
            page
        </StyledPage>
    );
}


export default Page;
