


const checkPermission = async(req,res,next) => {
    try {
         if(req.user.role != 1){ //if user is not admin 
            return res.status(403).json({
                success: false,
                msg: ''
            })
         }


        return next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'something went wrong',
            error:error
        })
    }
}

module.exports = { checkPermission}