// #region module
export interface DefileOptions {
    /**
     * Log errors and warnings.
     *
     * Default `false`.
     */
    debug?: boolean;
    /**
     * Custom logger.
     */
    logger?: (
        type: 'warn' | 'error',
        message: string,
        error?: any,
    ) => void;
};


export interface DefileSaveOptions {
    name?: string;
    contentType?: string;
};
// #endregion module
