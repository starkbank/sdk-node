

class InputError extends Error {

    constructor(code, message, status = 400) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

class InputErrors extends Error {

    constructor(errors, status = 400) {
        super(json);
        this.status = status;
        this.errors = [];
        for (let error of errors) {
            this.errors.push(new InputError(error['code'], error['message'], status));
        }
    }
}

class UnknownError extends Error {

    constructor(code, message, status = 400) {
        super(message);
        this.status = status;
        this.code = code;
    }
}

class InternalServerError extends Error {

    constructor(content, status = 500) {
        super(content);
        this.status = status;
    }
}

class InvalidSignatureError extends Error {

    constructor(message) {
        super(message);
    }
}

exports.InputError = InputError;
exports.InputErrors = InputErrors;
exports.UnknownError = UnknownError;
exports.InternalServerError = InternalServerError;
exports.InvalidSignatureError = InvalidSignatureError;