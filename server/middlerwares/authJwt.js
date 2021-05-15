//MiddleWare check token? isAdmin?
const db = require('../models')
const jwt = require('jsonwebtoken')

const Role = db.role
const User = db.user
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.slpit(' ')[1]
    if (!token) return res.status(401).json({ message: 'Access Token not found' })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ success: false, message: 'Invalid Token' })
    }
}

const idAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const role = await Role.find({ _id: { $in: user.roles } })
        const isAdmin = role.includes('admin')
        if (!isAdmin) return
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).send({ message: "Require Admin Role!" });
    }


}
const authJwt = { verifyToken, isAdmin }
module.exports = authJwt