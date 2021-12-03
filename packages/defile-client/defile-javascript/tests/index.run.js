const fs = require('fs');

const runner = require('@plurid/runner').default;



process.env.DEFILE_SERVER_ENDPOINT = 'http://localhost:33712';
const Defile = require('../distribution').default;



// Get defile by name
runner(
    async (
        check,
    ) => {
        const token = '__TEST__';
        const resource = 'name';

        const defile = new Defile(
            token,
        );

        const stream = await defile.get(resource);
        check('has stream', !!stream, true);
        if (!stream) {
            return;
        }

        const file = fs.createWriteStream('./tests/file.get.png');

        stream.pipe(file);
    },
);

// Get defile by id
runner(
    async (
        check,
    ) => {
        const token = '__TEST__';
        const resource = 'id';

        const defile = new Defile(
            token,
        );

        const stream = await defile.get(resource);
        check('has stream', !!stream, true);
        if (!stream) {
            return;
        }

        const file = fs.createWriteStream('./tests/file.get.png');

        stream.pipe(file);
    },
);



// Save string as defile
runner(
    async (
        _check,
    ) => {
        const token = '__TEST__';
        const file = 'text data file';

        const defile = new Defile(
            token,
            {
                debug: true,
            },
        );


        const saved = await defile.save(file, {
            name: 'filename',
        });
    },
);

// Save file as defile
runner(
    async (
        _check,
    ) => {
        const token = '__TEST__';
        const file = fs.createReadStream('./tests/file.png');

        const defile = new Defile(
            token,
        );


        const saved = await defile.save(file, {
            // name: 'filename',
        });
    },
);
