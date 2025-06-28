const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Task = require('./Task');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{timestamps: true});


userSchema.pre('save' , async function (next) {
    const user = this;

    if(user.isModified(`password`)){
        user.password = await bcrypt.hash(user.password,10)
    }

    next();
});


userSchema.pre('remove', async function (next) {
  const userId = this._id;

  // Delete tasks owned by this user
  await Task.deleteMany({ owner: userId });

  // Remove from sharedWith in other users' tasks
  await Task.updateMany(
    { sharedWith: userId },
    { $pull: { sharedWith: userId } }
  );

  next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;