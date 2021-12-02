const fs = require('fs');

const runner = require('@plurid/runner').default;

const Defile = require('../distribution').default;



runner(
    async (
        _check,
    ) => {
        const token = '__TEST__';
        const resource = 'name';
        // const resource = 'id';

        const defile = new Defile(
            token,
        );

        const stream = await defile.get(resource);

        const file = fs.createWriteStream('./tests/file');

        stream.pipe(file);
    },
);
