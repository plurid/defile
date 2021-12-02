// #region imports
    // #region external
    import {
        DefileOptions,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
class Defile {
    private token;
    private options;


    constructor(
        token: string,
        options?: Partial<DefileOptions>,
    ) {
        this.token = token;
        this.options = this.resolveOptions(options);
    }


    private resolveOptions(
        options?: Partial<DefileOptions>,
    ) {
        const resolvedOptions: DefileOptions = {
        };

        return resolvedOptions;
    }



    /**
     * Gets a file stream based on the `resource`, the defile ID or the defile Name.
     *
     * @param resource
     * @returns
     */
    public async get(
        resource: string,
    ) {
        if (!this.token) {
            return;
        }

    }


    /**
     * Saves a stream or a string as a defile under an optionally-given `name`.
     *
     * @param data
     * @param name
     * @returns
     */
    public async save(
        data: any | string,
        name?: string,
    ) {
        if (!this.token) {
            return;
        }

    }
}
// #endregion module



// #region exports
export default Defile;
// #endregion exports
