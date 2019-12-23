import {
    Dirent,
} from 'fs';

import React, {
    // useContext,
    useState,
    useEffect,
} from 'react';

import {
    StyledFileList,
} from './styled';

// import PageBar from './components/PageBar';
import FileItem from './components/FileItem';

// import PluriverseContext from '../../containers/Pluriverse/context';

import {
    ignoreHiddenFiles,
    getDirectoryFiles,
} from '../../services/logic/files';



interface FileListProperties {
    path: string;
    [key: string]: any;
}

const FileList: React.FC<FileListProperties> = (properties) => {
    // const context: any = useContext(PluriverseContext);
    // const {
    //     files,
    // } = context;

    const {
        path,
        plurid,
    } = properties;

    console.log(properties);

    const [files, setFiles] = useState<Dirent[]>([]);

    useEffect(() => {
        const getFiles = async () => {
            const files = await getDirectoryFiles(path);
            console.log('files', files);
            setFiles(ignoreHiddenFiles(files));
        }

        getFiles();
    }, []);

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


export default FileList;
