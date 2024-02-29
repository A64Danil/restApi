class MyLodash {
    constructor(){
        this.groupBy = this.groupBy.bind(this);
    }

    // eslint-disable-next-line class-methods-use-this
    compact(array) {
        // console.log(array);
        return array.filter(val => !!val);
    }

    // eslint-disable-next-line class-methods-use-this
    groupBy(array, prop) {
        // console.log(array, prop);
        return array.reduce((acc, el) => {
            const key = typeof prop === 'function' ? prop(el) : el[prop];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(el);
            return acc;
        }, {});
    }
}


export default MyLodash;