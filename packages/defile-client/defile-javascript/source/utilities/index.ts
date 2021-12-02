// #region module
export const isEncoded = (
    uri: string,
) => {
    uri = uri || '';

    return uri !== decodeURIComponent(uri);
}
// #endregion module
