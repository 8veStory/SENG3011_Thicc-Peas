const fs = require('fs');
const { cloneDeep } = require('lodash');

const LOGFILEPATH = "./log.txt";

/** The last response's body. This value is obtained by being intercepted by the
 * logger middleware. */
let _lastResponseBody;

/**
 * Static class responsible for logging things to the log file.
 */
class Logger {
    static _setLastResponseBody(value) {
        _lastResponseBody = value;
    }
    static _getLastResponseBody() {
        return _lastResponseBody;
    }

    /**
     * Adds a log to the log file.
     * @param {Request} req The request object of an ExpresJS endpoint.
     * @param {Response} res The response object of an ExpressJS endpoint.
     * @param {String} extraMessage Message appended to the end of a log.
     */
    static log(req, res, extraMessage = "") {
        let utcTime = new Date().toJSON();
        let result = `${utcTime} | ${req.ip} requested ${req.method} '${req.url}' - ${res.statusCode}\n`;
        fs.appendFile(LOGFILEPATH, result, () => {
            console.log(`${result.trimEnd() + extraMessage}`);

            // Log request
            console.log("Request Params:");
            console.log(removeSensitiveData(req.params));
            console.log("Request Body (application/json):");
            console.log(removeSensitiveData(req.body));

            // Log response
            console.log("Response body:");
            console.log(removeSensitiveData(Logger._getLastResponseBody()));

            console.log();
        });

        /**
         * Receives an object and redacts any sensitive properties.
         * E.g. any prop with 'password' in it.
         * @param {Object} object 
         */
        function removeSensitiveData(targetObject) {
            let clonedObject = cloneDeep(targetObject);

            const sensitiveDataReplacement = 'SENSITIVE DATA SCRUBBED';
            const regexes = [
                '.*password.*',
            ];

            let sensitiveProperties = Object.keys(clonedObject).filter(prop => {
                for (let regex of regexes) {
                    if (prop.toLowerCase().match(regex))
                        return true;
                }
                return false;
            });

            // Replace all sensitive data.
            for (let sensitiveProp of sensitiveProperties) {
                clonedObject[sensitiveProp] = sensitiveDataReplacement;
            }
            return clonedObject;
        }
    }

    /**
     * Deletes contents of the log file.
     */
    static deleteLogs() {
        fs.writeFile(LOGFILEPATH, "");
    }
}

module.exports._setLastResponseBody = Logger._setLastResponseBody
module.exports._getLastResponseBody = Logger._getLastResponseBody
module.exports.log = Logger.log;
module.exports.deleteLogs = Logger.deleteLogs;