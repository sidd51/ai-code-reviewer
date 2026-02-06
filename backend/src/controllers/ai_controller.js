const generateRes=require("../services/ai_service")

module.exports.getReview =async(req,res)=>{
  
  const code= req.body.code;

  if(!code){
    return res.status(400).send("Prompt is required");
  }
  const response=await generateRes(code);
  res.send(response);
}