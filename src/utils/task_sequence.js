class TaskSequence {
    constructor () {
        this.p = null;
    }

    run (func) {
        if (this.p === null) {
            this.p = this.promisify(func);
        } else {
            this.p = this.p.then(() => this.promisify(func));
        }
        return this;
    }

    end () {
        this.p.catch((err) => {
            throw err;
        });
    }

    promisify (func) {
        return new Promise((resolve) => {
            try {
                func(resolve);
            } catch (err) {
                throw err;
            }
        });
    }
};

module.exports = TaskSequence;