const sgMail = require('@sendgrid/mail');
const dotenv = require("dotenv");

dotenv.config();

// мій ключ не надсилає пошту - на перевірці в SandGrid
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (fields) => {
    try {
        await sgMail.send({ ...fields, from: "recer291@gmail.com" })
        return true;
    } catch (err) {
        throw new Error()
    }

}

module.exports = sendMail