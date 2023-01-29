
exports.sendSuccessResponse=(res,dataToBeSend={data:{}})=>{
try{
    const message=dataToBeSend?.message?dataToBeSend.message:"Success";
    const status=dataToBeSend?.status?dataToBeSend.status:200;
    return res.status(status).json({
        status:status,
        message:message,
        data:dataToBeSend.data     
    })
}catch(err){
    return res.status(500).json({
        status:500,
        message:"Internal Server Error.",
        data:{}
    })
}
}
exports.sendErrorResponse=(res,data={data:{}})=>{
    try{
        if(process.env.NODE_ENV === "development"){
            const message=data?.message?data.message:"Error";
            const status=data?.status?data.status:500;
            return  res.status(status).json({
            status:status,
            message:message,
            data:data.data
        })
        }else{
            const message="Error";
            const status=500;
            return  res.status(status).json({
            status:status,
            message:message,
            data:{

            }
        })
    }
        
    }catch(err){
        return res.statusCode(500).json({
            status:500,
            message:"Internal Server Error.",
            data:{}
        })
    }
    }