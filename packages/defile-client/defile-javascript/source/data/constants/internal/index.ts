// #region exports
export const HTTP = {
    GET: 'GET',
    POST: 'POST',
    SUCCESS: 200,
};


export const defileEndpoints = {
    get: (resource: string) => `/get?resource=${resource}`,
    save: () => '/save',
};


export const defileFields = {
    defile: 'defile',
    name: 'name',
};
// #endregion exports
