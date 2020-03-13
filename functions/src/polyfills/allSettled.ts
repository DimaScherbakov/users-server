declare interface PromiseConstructor {
    allSettled(promises: Array<Promise<any>>): Promise<Array<{ status: string, value?: any }>>;
}

exports = (function () {
    if (!Promise.allSettled) {
        Promise.allSettled = function (promises: Array<Promise<any>>) {
            return Promise.all(promises.map(p => Promise.resolve(p).then((value: any) => ({
                status: 'fulfilled',
                value: value
            }), error => ({
                status: 'rejected',
                value: error
            }))));
        };
    }

})();
