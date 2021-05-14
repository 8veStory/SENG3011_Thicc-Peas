const fs = require('fs');

const LOGFILEPATH = "./log.txt";

/**
 * Static class responsible for logging things to the log file.
 */
class Logger {
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
        });
    }

    /**
     * Deletes contents of the log file.
     */
    static deleteLogs() {
        fs.writeFile(LOGFILEPATH, "");
    }
}

module.exports.log = Logger.log;
module.exports.deleteLogs = Logger.deleteLogs;
module.exports._logger = Logger._logger;