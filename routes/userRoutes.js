const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth');

//test user routes
router.get('/', (req, res) => {
    res.send('User routes are working!');
});

//register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).send({ user , message : "User Created Successfully"});
    }
    catch (err) 
    {
        res.status(400).send({ error: err.message});
    }

});

//login user
router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if(!user){
            throw new Error('Unable to login , user not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            throw new Error('Unable to login , invalid credentials');
        }

        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET_KEY );

        res. send({user, token , message: "Logged in successfully"});
    }
    catch (err) {
        res.status(400).send({error: err.message });
    }
});


// DELETE user 
router.delete('/me', auth, async (req, res) => {
  try {
    // Best approach (Mongoose v5+)
    await req.user.deleteOne();
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});




module.exports = router;
