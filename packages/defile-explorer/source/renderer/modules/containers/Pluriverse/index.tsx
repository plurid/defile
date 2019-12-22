import React, {
    useState,
    useEffect,
} from 'react';

import PluridApp, {
    PluridPage,
    PluridConfiguration,
    RecursivePartial,
    SPACE_LAYOUT,
} from '@plurid/plurid-react';

import Page from '../../components/Page';

import PluriverseContext from './context';

import {
    getHomeDirectory,
} from '../../services/logic/files';



const Pluriverse: React.FC<any> = () => {
    const [files, setFiles] = useState<string[]>([]);

    const pluridPages: PluridPage[] = [
        {
            id: 'home',
            path: '/',
            component: {
                element: () => <Page id="home" />,
            },
            root: true,
        },
    ];

    const pluridAppConfiguration: RecursivePartial<PluridConfiguration> = {
        theme: 'defile',
        elements: {
            plane: {
                width: 0.5,
            },
        },
        space: {
            center: true,
        },
    };

    useEffect(() => {
        const getFiles = async () => {
            const files = await getHomeDirectory();
            setFiles(
                files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
            );
        }

        getFiles();
    }, []);

    const pageContext = {
        files,
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
