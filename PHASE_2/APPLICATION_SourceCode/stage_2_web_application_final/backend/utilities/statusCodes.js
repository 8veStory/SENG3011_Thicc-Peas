class StatusCodes {
    // SUCCESS
    /** Request succeeded. */
    static SUCCESS_200    = 200;
    /** Request succeeded AND resource has been created. */
    static CREATED_201    = 201;

    // CLIENT ERRORS
    /** Server couldn't understand request. */
    static BAD_REQUEST_400  = 400;
    /** Client must authenticate/identify self to get requested response. */
    static UNAUTHORIZED_401 = 401;
    /** Client has no access rights to content. Unlike 401, server knows identity of client. */
    static FORBIDDEN_403    = 403;
    /** Server could not find requested resource. */
    static UNKNOWN_404      = 404;

    // SERVER ERRORS
    /** Internal server error it doesn't know how to handle. */
    static INTERNAL_SERVER_ERROR_500 = 500;
    /** Request method not supported by server. */
    static NOT_IMPLEMENTED_501       = 501
}
module.exports = StatusCodes;