const express=require("express");
const cors=require("cors")
const app=express();
require("dotenv").config();
const router=require("./Routes/router");
require("./db/conn");
const port =8004;

app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

