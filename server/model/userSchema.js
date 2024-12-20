const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
        minlength:10
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
})


const User=mongoose.model("user",userSchema);

module.exports=User;