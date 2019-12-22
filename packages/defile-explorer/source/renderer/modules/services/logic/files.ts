import {
    promises as fs,
} from 'fs';
import os from 'os';



export const getHomeDirectory = async () => {
    const homeDirectory = os.homedir();

    const files = await fs.readdir(homeDirectory);
    return files;
}


export const ignoreHiddenFiles = (
    files: string[],
) => {
    return files.filter(
        file => !(/(^|\/)\.[^\/\.]/g).test(file)
    );
}
