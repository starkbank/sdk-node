class InputError extends Error {
    constructor(code, message, status = 400) {
        super(message);
        this.status = status;
    }
}

class InputErrors extends Error {
    constructor(content, status = 400) {
        super(content);
        this.status = status;
        this.errors = [];
        for (let i in content) {
            this.errors.push(new InputError(content[i]['code'], content[i]['message'], status));
        }
    }
}

class InternalServerError extends Error {
    constructor(content, status = 500) {
        super(content);
        this.status = status;
    }
}
exports.InputError = InputError
exports.InputErrors = InputErrors
exports.InternalServerError = InternalServerError