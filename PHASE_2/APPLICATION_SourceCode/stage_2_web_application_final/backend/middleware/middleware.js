const express = require('express');
const { log } = require('../logger');

/**
 * ExpressJS Middleware that calls the logger.
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function logger(req, res, next) {
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