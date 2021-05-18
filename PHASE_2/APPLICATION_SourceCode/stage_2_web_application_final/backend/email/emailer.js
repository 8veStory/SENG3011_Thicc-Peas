// https://www.geeksforgeeks.org/how-to-send-email-with-nodemailer-using-gmail-account-in-node-js/
const nodemailer = require ('nodemailer');
const { VACCTRACC_GMAIL, VACCTRACC_GMAIL_PASS } = require('../config');

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: VACCTRACC_GMAIL,
        pass: VACCTRACC_GMAIL_PASS
    }
});


class Emailer {
    constructor() {

    }

    /**
     * 
     * @param {String} toEmail The email(s) to send to. If you want to send to
     * multiple emails, then delimit the emails with commas (,).
     * @param {String} subject 
     * @param {String} plainText 
     * @param {String} html 
     * @returns {SentMessageInfo} Information about the email that was sent.
     */
    static async sendMailAsync(toEmail, subject, html='') {
        let mailDetails = {
            from: VACCTRACC_GMAIL,
            to: toEmail,
            subject: subject,
            html: html
        };

        console.log(mailDetails);

        return await mailTransporter.sendMail(mailDetails);
    }
}

module.exports = Emailer;