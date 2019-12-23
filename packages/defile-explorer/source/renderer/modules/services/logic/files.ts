import {
    promises as fs,
    Dirent,
} from 'fs';
import os from 'os';



export const getHomeDirectory = async () => {
    const homeDirectory = os.homedir();

    const files = await getDirectoryFiles(homeDirectory);
    return files;
}


export const getDirectoryFiles = async (
    path: string,
) => {
    const files = await fs.readdir(
        path,
        {
            withFileTypes: true,
        },
    );
    return files;
}


export const ignoreHiddenFiles = (
    files: Dirent[],
) => {
    return files.filter(
        file => !(/(^|\/)\.[^\/\.]/g).test(file.name)
    );
}
