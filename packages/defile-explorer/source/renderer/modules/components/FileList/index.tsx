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
    plurid: any;
}

const FileList: React.FC<FileListProperties> = (properties) => {
    const {
        path,
        plurid,
    } = properties;

    console.log(path, plurid);

    const [files, setFiles] = useState<Dirent[]>([]);

    const _path = plurid.parameters
        ? '/' + plurid.parameters.path + '-'
        : path;

    useEffect(() => {
        const getFiles = async () => {
            const aPath = _path.replace(/-/g, '/');
            // console.log('aPath', aPath);
            const files = await getDirectoryFiles(aPath);
            // console.log('files', files);
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
                                path={_path}
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
