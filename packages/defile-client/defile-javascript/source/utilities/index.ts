// #region module
export const isEncoded = (
    uri: string,
) => {
    return uri !== decodeURIComponent(uri);
}
// #endregion module
