import {
    Dirent,
} from 'fs';

import path from 'path';

import React, {
    // useState,
} from 'react';

import {
    PluridLink,
} from '@plurid/plurid-react';

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

    const isFile = file.isFile();
    const isDirectory = file.isDirectory();

    const extension = isFile
        ? path.extname(file.name)
        : '';

    return (
        <StyledFileItem>
            <PluridLink
                page="/"
                devisible={true}
            >
                <StyledFileItemIcon>
                    {isDirectory
                        ? (
                            <DirectoryIcon
                            />
                        ) : isFile
                            ? (
                                <FileIcon
                                    extension={extension}
                                />
                            )
                            : ''
                    }
                </StyledFileItemIcon>

                <StyledFileItemName>
                    {file.name}
                </StyledFileItemName>
            </PluridLink>
        </StyledFileItem>
    );
}


export default FileItem;
