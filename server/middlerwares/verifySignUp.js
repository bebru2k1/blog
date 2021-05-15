const db = require('../models')
const User = db.user
const ROLES = db.ROLES
const checkEmailAndUsername = async (req, res, next) => {
    const { username, email } = req.body
    if (!username || !email) return res.status(401).json({ message: 'User and/or Email is empty' })

    //if has username and email
    //check username
    await Promise.all([User.findOne({ username }), User.findOne({ email })])
        .then((result) => {
            const [userName, userEmail] = result
            //check user already exitsts?
            if (userName) return res.status(400).json({ message: 'User already exists' })
            if (userEmail) return res.status(400).json({
                message: 'Email already exists'
            })
            next()
        })
        .catch(error => console.log(error))
}
checkRoles = (req, res, next) => {
    const { roles } = req.body
    if (roles) {
        for (let i; i < length; i++) {
            if (!ROLES.includes(roles[i])) return res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
            });
        }
    }
    next()
}

const verifySignUp = { checkEmailAndUsername, checkRoles }
module.export = verifySignUp