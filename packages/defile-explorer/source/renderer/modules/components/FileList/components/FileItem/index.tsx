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
    path: string,
    file: Dirent,
}

const FileItem: React.FC<FileItemOwnProperties> = (properties) => {
    const {
        path: filepath,
        file,
    } = properties;

    const isFile = file.isFile();
    const isDirectory = file.isDirectory();

    const extension = isFile
        ? path.extname(file.name)
        : '';

    const page = `${filepath}${file.name}`;

    return (
        <PluridLink
            page={'/' + file.name}
            // page={page}
            devisible={true}
            style={{
                display: 'block',
                width: '100%',
            }}
        >
            <StyledFileItem>
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
            </StyledFileItem>
        </PluridLink>
    );
}


export default FileItem;
