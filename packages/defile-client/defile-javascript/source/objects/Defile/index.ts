// #region imports
    // #region libraries
    import {
        Readable,
    } from 'stream';

    import fs from 'fs';
    import path from 'path';

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

        loggerBase,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
class Defile {
    private token;
    private options: Required<DefileOptions>;


    constructor(
        token: string,
        options?: DefileOptions,
    ) {
        this.token = token;
        this.options = this.resolveOptions(options);
    }


    private resolveOptions(
        options?: DefileOptions,
    ) {
        const resolvedOptions: Required<DefileOptions> = {
            debug: typeof options?.debug === 'boolean'
                ? options?.debug
                : (options?.logger ? true : false),
            logger: options?.logger || this.logger.bind(this),
        };

        return resolvedOptions;
    }

    private checkAccess() {
        if (!DEFILE_ENDPOINT) {
            this.options.logger('warn', `${loggerBase}no defile server endpoint`);
            return;
        }

        if (!this.token) {
            this.options.logger('warn', `${loggerBase}no defile client token`);
            return;
        }

        return true;
    }

    private logger(
        type: 'warn' | 'error',
        message: string,
        error?: any,
    ) {
        if (this.options.debug) {
            if (error) {
                console.log(type, message, error);
            } else {
                console.log(type, message);
            }
        }
    }

    private loggerGetResourceText(
        name: string | undefined
    ) {
        if (!name) {
            return '';
        }

        return ` '${name}'`;
    }



    /**
     * Gets a file stream based on the `resource`, the defile ID or the defile name.
     *
     * @param resource
     * @returns
     */
    public async get(
        resource: string,
    ): Promise<Readable | undefined> {
        const loggerCouldNotGet = loggerBase + `could not get defile '${resource}'`;


        try {
            // hits endpoint `defile.plurid.com/get?resource=${resource}` with `Defile-Token`: this.token

            const valid = this.checkAccess();
            if (!valid) {
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
                this.options.logger('warn', `${loggerCouldNotGet} · not found`);
                return;
            }

            // FORCED ReadableStream into Interable
            const readable = Readable.from(response.body as any);

            return readable;
        } catch (error) {
            this.options.logger('error', loggerCouldNotGet, error);

            return;
        }
    }

    /**
     * Receive a defile based on the `resource`, the defile ID or the defile name,
     * and saves it at the given `filepath`.
     *
     * @param resource
     * @param filepath
     * @returns
     */
    public async receive(
        resource: string,
        filepath: string,
    ): Promise<boolean> {
        const loggerCouldNotGet = loggerBase + `could not get defile '${resource}'`;

        try {
            const stream = await this.get(resource);
            if (!stream) {
                return false;
            }

            const status = await new Promise<boolean>((resolve, _reject) => {
                const resolvedFilepath = path.isAbsolute(filepath)
                    ? filepath
                    : path.join(process.cwd(), filepath);

                const file = fs.createWriteStream(resolvedFilepath);

                stream.pipe(file);

                stream.on('error', (error) => {
                    this.options.logger('error', loggerCouldNotGet, error);
                    resolve(false);
                });

                stream.on('end', () => {
                    resolve(true);
                });
            });

            return status;
        } catch (error) {
            this.options.logger('error', loggerCouldNotGet, error);

            return false;
        }
    }


    /**
     * Saves a stream or a string as a defile under an optionally-given `name`.
     *
     * @param data
     * @param options
     * @returns
     */
    public async save(
        data: Readable | string,
        options?: DefileSaveOptions,
    ): Promise<false | string> {
        const loggerCouldNotSave = loggerBase + `could not save defile${this.loggerGetResourceText(options?.name)}`;


        try {
            // hits endpoint `defile.plurid.com/save` with `Defile-Token`: this.token and body: { name }

            const valid = this.checkAccess();
            if (!valid) {
                return false;
            }


            const composeForm = () => {
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

                return {
                    saveEndpoint,
                    headers,
                    form,
                };
            }

            const {
                saveEndpoint,
                headers,
                form,
            } = composeForm();

            const response = await fetch(
                saveEndpoint,
                {
                    method: HTTP.POST,
                    headers,
                    // FORCED FormData into BodyInit
                    body: form as any,
                },
            );


            if (
                response.status !== HTTP.SUCCESS
                || !response.body
            ) {
                this.options.logger('warn', `${loggerCouldNotSave} · bad request`);

                return false;
            }


            const responseData = await response.json();
            if (!responseData) {
                this.options.logger('warn', `${loggerCouldNotSave} · server error`);

                return false;
            }


            return responseData.id;
        } catch (error) {
            this.options.logger('error', loggerCouldNotSave, error);

            return false;
        }
    }
}
// #endregion module



// #region exports
export default Defile;
// #endregion exports
