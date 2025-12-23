const axios = require('axios');

const sendEmail = async (type, to, data) => {
    const url = process.env.EMAIL_MICROSERVICE_URL || 'http://localhost:3001';
    try {
        await axios.post(`${url}/send-email`, { type, to, data });
        console.log(`Email request sent to microservice for type: ${type}, to: ${to}`);
    } catch (error) {
        console.error('Failed to send email:', error.message);
        // We might want to handle this more gracefully, but for now just logging
    }
};

module.exports = { sendEmail };
