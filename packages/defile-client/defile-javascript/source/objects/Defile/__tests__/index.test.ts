// #region imports
    // #region external
    import Defile from '../index';
    // #endregion external
// #endregion imports



// #region module
const token = '__TEST__';


describe('Defile', () => {
    it(`works`, async () => {
        const defile = new Defile(
            token,
        );

        const defileName = 'test-file';

        const saved = await defile.save(
            'data',
            defileName,
        );

        const stream = await defile.get(defileName);
    });
});
// #endregion module
