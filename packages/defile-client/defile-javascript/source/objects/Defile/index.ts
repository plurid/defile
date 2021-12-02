// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import FormData from 'form-data';
    // #endregion libraries


    // #region external
    import {
        DefileOptions,
    } from '~data/interfaces';

    import {
        DEFILE_ENDPOINT,
        DefileToken,
    } from '~data/constants';
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
        // hits endpoint `defile.plurid.com/get?resource=${resource}` with `Defile-Token`: this.token

        if (!this.token) {
            return;
        }

        const getEndpoint = DEFILE_ENDPOINT + `/get?resource=${resource}`;

        const headers = {};
        headers[DefileToken] = this.token;

        const response = await fetch(
            getEndpoint,
            {
                method: 'GET',
                headers,
            },
        );

        if (
            response.status !== 200
            || !response.body
        ) {
            return;
        }

        return response.body;
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
        // hits endpoint `defile.plurid.com/save` with `Defile-Token`: this.token and body: { name }

        if (!this.token) {
            return false;
        }

        const saveEndpoint = DEFILE_ENDPOINT + `/save`;

        const formData = new FormData();
        formData.append('defile', data);
        if (name) {
            formData.append('name', name);
        }

        const headers = {
            ...formData.getHeaders(),
        };
        headers[DefileToken] = this.token;

        const response = await fetch(
            saveEndpoint,
            {
                method: 'POST',
                headers,
                body: formData.getBuffer(),
            },
        );

        return response.status === 200;
    }
}
// #endregion module



// #region exports
export default Defile;
// #endregion exports
