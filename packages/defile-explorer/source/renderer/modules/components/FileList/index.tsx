import {
    Dirent,
} from 'fs';

import React, {
    // useRef,
    useContext,
    // useState,
    // useEffect,
} from 'react';

import {
    StyledFileList,
} from './styled';

// import PageBar from './components/PageBar';
import FileItem from './components/FileItem';

import PluriverseContext from '../../containers/Pluriverse/context';



interface PageProperties {
    id: string;
}

const Page: React.FC<PageProperties> = (properties) => {
    const context: any = useContext(PluriverseContext);

    const {
        files,
    } = context;

    return (
        <StyledFileList>
            <ul>
                {files.map((file: Dirent) => {
                    return (
                        <li
                            key={file.name}
                        >
                            <FileItem
                                file={file}
                            />
                        </li>
                    )
                })}
            </ul>
        </StyledFileList>
    );
}


export default Page;
