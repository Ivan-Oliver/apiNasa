const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { getUserByEmail } = require('../controllers/user');
const saltRounds = 10;

const signup = async ({ email, password }) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists');

}
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hashedPassword, salt });
    await user.save();

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
 
}

const login = async ({ email, password }) => {
    const user = await getUserByEmail( email );

    if (!user) {
        throw new Error('User not found');
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw new Error('Wrong password')
    }

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET)
}

module.exports = { 
    signup, 
    login 
}