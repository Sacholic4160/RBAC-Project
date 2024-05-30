

const onlyAdminAccess = async (req, res, next) => {
    try {

        if (req.user.role != 1) {  //not equal to admin
            return res.status(400).json({
                success: false,
                msg: "You are not authorised to access this route!",
            })

        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Something went wrong!",
            error: error

        })
    }
    return next();
}

module.exports = onlyAdminAccess;