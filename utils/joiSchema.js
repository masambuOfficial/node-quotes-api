const Joi=require('joi');

const quoteSchema=Joi.object({

text:Joi.string().min(3).max(250).required(),
year:Joi.string().min(3).max(250).required(),
category:Joi.string().min(3).max(20).required(),
author:Joi.string().min(3).max(20).required()

})


const authorSchema=Joi.object({
name:Joi.string().min(3).max(250).required(),
picture:Joi.string().min(3).max(250).required()

})



//console.log(quoteSchema);
//console.log(authorSchema);




module.exports ={
    quoteSchema,
    authorSchema
}