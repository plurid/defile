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

import DirectoryIcon from '../../assets/icons/directory-icon';
import FileIcon from '../../assets/icons/file-icon';

import PluriverseContext from '../../containers/Pluriverse/context';



interface PageProperties {
    id: string;
}

const Page: React.FC<PageProperties> = (properties) => {
    const context: any = useContext(PluriverseContext);

    const {
        files,
    } = context;

    console.log(files);

    return (
        <StyledFileList>
            <ul>
                {files.map((file: Dirent) => {
                    const isFile = file.isFile();
                    const isDirectory = file.isDirectory();

                    return (
                        <li
                            key={file.name}
                        >
                            {isDirectory
                                ? (<DirectoryIcon />)
                                : isFile
                                    ? (<FileIcon />)
                                    : ''
                            } - {file.name}
                        </li>
                    )
                })}
            </ul>
        </StyledFileList>
    );
}


export default Page;
