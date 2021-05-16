const fs = require('fs');
const chalk = require('chalk');
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
        let result = '';
        // Log request
        result += `${utcTime} | ${req.ip} requested ${req.method} '${req.url}' - ${res.statusCode}\n`;
        result += "\tExtra message:\n";
        result += '\t\t' + extraMessage ? extraMessage : "N/A\n";

        // Log request params/body
        result += '\t' + "Request Params:\n";
        result += '\t\t' + JSON.stringify(removeSensitiveData(req.params)) + '\n';
        result += '\t' + "Request Body:\n";
        result += '\t\t' + JSON.stringify(removeSensitiveData(req.body)) + '\n';

        // Log response
        result += '\t' + "Response body:\n";
        result += '\t\t' + JSON.stringify(removeSensitiveData(Logger._getLastResponseBody())) + '\n';

        fs.appendFile(LOGFILEPATH, result, () => {
            // Print to console in pretty format.
            console.log(chalk.bold(`${utcTime} | ${req.ip} requested ${req.method} '${req.url}' - ${res.statusCode}`));
            console.log(chalk.italic("  Extra message:"));
            console.log(extraMessage ? '    ' + extraMessage : '  ' + 'N/A');
            console.log();

            console.log(chalk.italic("  Request Params:"));
            console.group();
            console.log(JSON.stringify(removeSensitiveData(req.params), null, 4));
            console.groupEnd();
            console.log();

            console.log(chalk.italic("  Request Body:"));
            console.group();
            console.log(JSON.stringify(removeSensitiveData(req.body), null, 4));
            console.groupEnd();
            console.log();

            console.log(chalk.italic("  Response body:"));
            console.group();
            console.log(JSON.stringify(removeSensitiveData(Logger._getLastResponseBody()), null, 4));
            console.groupEnd();
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