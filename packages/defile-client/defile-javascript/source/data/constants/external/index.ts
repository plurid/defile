// #region exports
export const isProduction = process.env.ENV_MODE === 'production';


export const DEFILE_ENDPOINT = isProduction
    ? 'https://defile.plurid.com'
    : 'http://localhost:33712';


export const DefileToken = 'Defile-Token';
// #endregion exports
