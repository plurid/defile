// #region imports
    // #region external
    import {
        isEncoded,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region exports
export const HTTP = {
    GET: 'GET',
    POST: 'POST',
    SUCCESS: 200,
};


export const defileEndpoints = {
    get: (resource: string) => {
        const base = '/get?resource=';

        if (isEncoded(resource)) {
            return base + resource;
        }

        return base + encodeURIComponent(resource);
    },
    save: () => '/save',
};


export const defileFields = {
    file: 'file',
    string: 'string',
    name: 'name',
};
// #endregion exports
