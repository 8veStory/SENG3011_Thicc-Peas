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
         * @returns {Object} A new version of the object with sensitive properties
         * redacted.
         */
        function removeSensitiveData(targetObject) {
            let clonedObject = cloneDeep(targetObject);

            const sensitiveDataReplacement = 'SENSITIVE DATA SCRUBBED';
            const passwordReplacement = '*';

            const passwordRegexes = [
                '.*password.*',
            ]
            const sensitiveRegexes = [
                // more regexes here...
            ];

            let passwordProperties  = [];
            let sensitiveProperties = [];
            for (let prop of Object.keys(clonedObject)) {
                for (let pRegex of passwordRegexes) {
                    if (prop.toLowerCase().match(pRegex))
                        passwordProperties.push(prop);
                }
                for (let sRegex of sensitiveRegexes) {
                    if (prop.toLowerCase().match(sRegex))
                        sensitiveProperties.push(prop);
                }
            }

            // Replace all passwords with '*'s.
            passwordProperties.forEach(pProp => {
                console.log(clonedObject[pProp]);
                if (typeof clonedObject[pProp] === 'string' || clonedObject[pProp] instanceof String)
                    clonedObject[pProp] = passwordReplacement.repeat(clonedObject[pProp].length);
             });

             // Redact all sensitive properties.
            sensitiveProperties.forEach(sProp => clonedObject[sProp] = sensitiveDataReplacement);

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