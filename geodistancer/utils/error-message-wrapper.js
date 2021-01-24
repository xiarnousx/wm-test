module.exports = function errorWrapper(message, code) {
    return {error:{message, code}};
}