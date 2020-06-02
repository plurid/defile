// import {
//     Dirent,
// } from 'fs';

import React, {
    // useState,
    // useEffect,
} from 'react';

import {
    PluridApplication,
    PluridPlane,
    PluridConfiguration,
    RecursivePartial,
    // SPACE_LAYOUT,
} from '@plurid/plurid-react';

import FileList from '../../components/FileList';

// import PluriverseContext from './context';

// import {
//     ignoreHiddenFiles,
//     getHomeDirectory,
// } from '../../services/logic/files';



const Pluriverse: React.FC<any> = () => {
    // const [files, setFiles] = useState<Dirent[]>([]);

    const pluridPlanes: PluridPlane[] = [
        {
            // id: 'home',
            path: '/:path',
            component: {
                kind: 'react',
                element: (properties: any) => (
                    <FileList
                        path="/Users-Cavel-Desktop-defile-"
                        plurid={properties.plurid}
                    />
                ),
            },
            // root: true,
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

    // useEffect(() => {
    //     const getFiles = async () => {
    //         const files = await getHomeDirectory();
    //         setFiles(ignoreHiddenFiles(files));
    //     }

    //     getFiles();
    // }, []);

    // const pageContext = {
    //     files,
    // };

    return (
        <PluridApplication
            planes={pluridPlanes}
            configuration={pluridAppConfiguration}
            // pageContext={PluriverseContext}
            // pageContextValue={pageContext}
        />
    );
}


export default Pluriverse;
