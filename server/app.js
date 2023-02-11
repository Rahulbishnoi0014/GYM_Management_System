const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())

dotenv.config({path:"./.env"});
const port = process.env.PORT

app.use(express.json());
app.use(require("./routers/routers"))
require("./connections/connections");

app.listen(port,()=>{
    console.log(`Server is on port ${port}`)
})