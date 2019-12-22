import React, {
    // useState,
} from 'react';

import PluridApp, {
    PluridPage,
    PluridConfiguration,
    RecursivePartial,
    SPACE_LAYOUT,
} from '@plurid/plurid-react';

import Page from '../../components/Page';

import PluriverseContext from './context';



const Pluriverse: React.FC<any> = () => {
    const pluridPages: PluridPage[] = [
        {
            id: 'one',
            path: '/one',
            component: {
                element: () => <Page id="one" />,
            },
            root: true,
        },
    ];

    const pluridAppConfiguration: RecursivePartial<PluridConfiguration> = {
        theme: 'plurid',
        space: {
            layout: {
                type: SPACE_LAYOUT.ZIG_ZAG,
            },
        },
    };

    const pageContext = {
    };

    return (
        <PluridApp
            pages={pluridPages}
            configuration={pluridAppConfiguration}
            pageContext={PluriverseContext}
            pageContextValue={pageContext}
        />
    );
}


export default Pluriverse;
