// #region exports
function isEncoded(
    uri: string,
) {
    uri = uri || '';

    return uri !== decodeURIComponent(uri);
}



export const HTTP = {
    GET: 'GET',
    POST: 'POST',
    SUCCESS: 200,
};


export const defileEndpoints = {
    get: (resource: string) => {
        if (isEncoded(resource)) {
            return `/get?resource=${resource}`;
        }

        return `/get?resource=${encodeURIComponent(resource)}`;
    },
    save: () => '/save',
};


export const defileFields = {
    defile: 'defile',
    name: 'name',
};
// #endregion exports
