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

        const file = fs.createWriteStream('./tests/file.png');

        stream.pipe(file);
    },
);



runner(
    async (
        _check,
    ) => {
        const token = '__TEST__';
        // const file = 'text data file';
        const file = fs.createReadStream('./tests/file.png');

        const defile = new Defile(
            token,
        );


        const saved = await defile.save(file, {
            // name: 'filename',
        });
        console.log('saved', saved);
    },
);
