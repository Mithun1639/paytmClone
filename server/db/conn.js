const mongoose=require("mongoose");

const url=process.env.DATABASE;

mongoose.connect(url).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(err);
})

module.exports=mongoose;