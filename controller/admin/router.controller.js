const routerPermission = require('../../models/routerPermission.model.js');
const { validationResult } = require('express-validator')
//if we want to get routes then we have to use express.Router in our router file

const getAllRoutes = async (req,res) => {
    try {
        
        const routes = [];
 const tempRoutes = req.app._router.stack;

 tempRoutes.forEach((layer) => {
         
    if(layer.name === 'router' && layer.handle.stack){
        layer.handle.stack.forEach((handler) => {
            routes.push({
                path: handler.route.path,
                methods: handler.route.methods,

            })
        })
    }
 })


        return res.status(200).json({
            success: true,
            msg: 'All Routes Fetched Successfully',
            data: routes
        }) 

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        }) 
    }
}



const addOrUpdateRouter = async (req,res) => {
    try {

        const errors = validationResult(req);

        if (!(errors.isEmpty())) {
            return res.status(200).json({
                success: false,
                msg: "Errors",
                errors: errors.array(),
            });
        }

        const { router_endpoint , role , permission } = req.body;

       const routerPermissionData = await routerPermission.findOneAndUpdate({
            router_endpoint, role },
        {  router_endpoint, role, permission },
        { upsert:true, new:true, setDefaultsOnInsert:true}
        )

        return res.status(200).json({
            success: true,
            msg: 'Router Permission added/updated Successfully',
            data: routerPermissionData
        }) 

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        }) 
    }
}
module.exports = { getAllRoutes, addOrUpdateRouter }