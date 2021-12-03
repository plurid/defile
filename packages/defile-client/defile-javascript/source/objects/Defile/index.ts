// #region imports
    // #region libraries
    import {
        Readable,
    } from 'stream';

    import fetch from 'cross-fetch';

    import FormData from 'form-data';
    // #endregion libraries


    // #region external
    import {
        DefileOptions,
        DefileSaveOptions,
    } from '~data/interfaces';

    import {
        HTTP,
        defileEndpoints,
        defileFields,

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
    ): Promise<ReadableStream<Uint8Array> | undefined> {
        // hits endpoint `defile.plurid.com/get?resource=${resource}` with `Defile-Token`: this.token

        if (!this.token) {
            return;
        }

        const getEndpoint = DEFILE_ENDPOINT + defileEndpoints.get(resource);

        const headers = {};
        headers[DefileToken] = this.token;

        const response = await fetch(
            getEndpoint,
            {
                method: HTTP.GET,
                headers,
            },
        );

        if (
            response.status !== HTTP.SUCCESS
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
        data: Readable | string,
        options?: Partial<DefileSaveOptions>,
    ): Promise<false | string> {
        // hits endpoint `defile.plurid.com/save` with `Defile-Token`: this.token and body: { name }

        if (!this.token) {
            return false;
        }

        const saveEndpoint = DEFILE_ENDPOINT + defileEndpoints.save();

        const form = new FormData();
        if (typeof data === 'string') {
            form.append(defileFields.string, data);
        } else {
            form.append(
                defileFields.file,
                data,
                {
                    contentType: options?.contentType,
                },
            );
        }
        if (options?.name) {
            form.append(defileFields.name, options.name);
        }

        const formHeaders = form.getHeaders();
        const headers = {
            ...formHeaders,
        };
        headers[DefileToken] = this.token;

        const response = await fetch(
            saveEndpoint,
            {
                method: HTTP.POST,
                headers,
                // FORCED
                body: form as any,
            },
        );

        if (
            response.status !== HTTP.SUCCESS
            || !response.body
        ) {
            return false;
        }

        const responseData = await response.json();
        if (!responseData) {
            return false;
        }

        return responseData.id;
    }
}
// #endregion module



// #region exports
export default Defile;
// #endregion exports
