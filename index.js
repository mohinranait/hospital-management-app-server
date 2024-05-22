const express = require('express');
const { PORT } = require('./src/config/secretEnv');
const app = express();



app.get('/', (req,res) => {
    res.send('hi')
})

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
})