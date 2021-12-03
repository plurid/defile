const fs = require('fs');

const runner = require('@plurid/runner').default;

const Defile = require('../distribution').default;



process.env.DEFILE_SERVER_ENDPOINT = 'http://localhost:33712';


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

        const file = fs.createWriteStream('./tests/file.png');

        stream.pipe(file);
    },
);


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

        const file = fs.createWriteStream('./tests/file.png');

        stream.pipe(file);
    },
);



runner(
    async (
        _check,
    ) => {
        const token = '__TEST__';
        const file = 'text data file';

        const defile = new Defile(
            token,
        );


        const saved = await defile.save(file, {
            // name: 'filename',
        });
    },
);


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
