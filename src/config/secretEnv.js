require('dotenv').config();

const PORT = process.env.ENV_PORT || 5000;
const DatabaseURL = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
    PORT,
    DatabaseURL,
    jwtSecret
}

