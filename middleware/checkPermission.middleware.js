const {getRouterPermission , getUserPermissionsHelper} = require('../helpers/auth.helper.js')


const checkPermission = async(req,res,next) => {
    try {
         if(req.user.role != 1){ //if user is not admin 
           
            const routerPermissionData = await getRouterPermission(req.path, req.user.role);
            const userPermissionsData = getUserPermissionsHelper(req.user._id)

            if(!routerPermissionData || userPermissionsData.permissions.permissions == undefined){
                return res.status(403).json(
                    {
                        success: false,
                    message: 'You do not have permission to access this route'
                })
            }

            const permission_name = routerPermissionData.permission_id.permission_name;
            const permission_value = routerPermissionData.permission

            //check this router permissions and userPermissions are ame or not
          const hasPermission =   userPermissionsData.permissions.permissions.some(permission =>
                permission.permission_name === permission_name && permission.permission_value.some(value => permission_value.includes(value))
             )

             if(!hasPermission){
                return res.status(403).json(
                    {
                        success: false,
                    message: 'You do not have permission to access this route'
                })
             }
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