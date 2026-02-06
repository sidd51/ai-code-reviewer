const generateRes=require("../services/ai_service")

module.exports.getResponse =async(req,res)=>{
  
  const prompt= req.query.prompt;

  if(!prompt){
    return res.status(400).send("Prompt is required");
  }
  const response=await generateRes(prompt);
  res.send(response);
}