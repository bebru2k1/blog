const argon2 = require('argon2')

const db = require('../models')
const User = db.user
const Role = db.role

exports.signup = async (req, res) => {
    const { username, password, email, roles } = req.body
    try {
        const user = new User({
            username,
            password: argon2.hash(password),
            email
        })
        await user.save()

        if (roles) {
            const roleUser = await Role.find({ name: { $in: roles } })
            user.roles = roleUser.map(role => role.id)
            await user.save()
            res.send({ message: "User was registered successfully!" });
        } else {
            const roleUser = await Role.find({ name: 'user' })
            user.roles = [roleUser.id]
            await user.save()
            res.send({ message: "User was registered successfully!" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: err });
    }
}

exports.signin = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username }).populate('role', "-__v")
        if (!user) return res.status(400).json({ message: 'User Not found' })
        //check Password
        const verifyPassword = await argon2.verify(user.password, password)
        if (!verifyPassword) return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });

        let token = jwt.sign({ id: user.id }, process.env.DB_SECRET)
        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    } catch (error) {
        console.log(error)
    }
}