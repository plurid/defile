import {
    Dirent,
} from 'fs';

import React, {
    // useState,
} from 'react';

import {
    StyledFileItem,
    StyledFileItemIcon,
    StyledFileItemName,
} from './styled';

import DirectoryIcon from '../../../../assets/icons/directory-icon';
import FileIcon from '../../../../assets/icons/file-icon';



interface FileItemOwnProperties {
    file: Dirent,
}

const FileItem: React.FC<FileItemOwnProperties> = (properties) => {
    const {
        file,
    } = properties;
    console.log(file);

    const isFile = file.isFile();
    const isDirectory = file.isDirectory();

    return (
        <StyledFileItem>
            <StyledFileItemIcon>
                {isDirectory
                    ? (<DirectoryIcon />)
                    : isFile
                        ? (<FileIcon />)
                        : ''
                }
            </StyledFileItemIcon>

            <StyledFileItemName>
                {file.name}
            </StyledFileItemName>
        </StyledFileItem>
    );
}


export default FileItem;
