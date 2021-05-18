const express = require('express');
const { log, _setLastResponseBody } = require('../logger');

/**
 * ExpressJS Middleware that calls the logger.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function logger(req, res, next) {
    // Intercept response data.
    const oldWrite = res.write;
    const oldEnd = res.end;

    let chunks = [];

    res.write = function (chunk) {
        chunks.push(Buffer.from(chunk));

        oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk) {
            chunks.push(Buffer.from(chunk));
        }

        let body = Buffer.concat(chunks).toString('utf8');
        try {
            _setLastResponseBody(JSON.parse(body));
        } catch {
            _setLastResponseBody({body: body});
        }

        oldEnd.apply(res, arguments);
    };

    res.on('finish', () => {
        log(req, res);
    })
    next();
}

/**
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {import('express').NextFunction} next 
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!'); // Triggers 'finish' on res.
}

module.exports.logger = logger;
module.exports.errorHandler = errorHandler;