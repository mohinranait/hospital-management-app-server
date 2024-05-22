const express = require('express');
const { PORT } = require('./src/config/secretEnv');
const connectDb = require('./src/config/db');
const { userRoute } = require('./src/routes');
const cors = require("cors")
const app = express();



app.use(express.json())
// app.use(cors({
//     origin: [''],
//     credentials:true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
// }))

app.use('/api', userRoute)

app.get('/', (req,res) => {
    res.send('hi')
})

app.listen(PORT, async() => {
    await connectDb()
    console.log(`Server is running at port http://localhost:${PORT}`);
})