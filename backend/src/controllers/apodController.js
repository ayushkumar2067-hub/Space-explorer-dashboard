const nasa = require("../services/nasaService");

const getAPOD = async(req,res)=>{

try{

const response=await nasa.get("/planetary/apod");

const{

title,

date,

explanation,

url,

hdurl,

media_type

}=response.data;

res.status(200).json({

success:true,

data:{

title,

date,

explanation,

url,

hdurl,

media_type

}

});

}

catch(error){

console.error(error.response?.data||error.message);

res.status(500).json({

success:false,

message:"Failed to fetch APOD"

});

}

}

module.exports={

getAPOD

};