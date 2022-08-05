const { User } = require("../models/User");
const fs = require('fs');
const bcrypt = require('bcrypt');

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.userId}).select('-password');
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}

exports.updateUserInfo = async (req, res) => {
    try {
        if(req.file){ 
            req.body.avatar = req.file.path
            const checkUser = await User.findOne({_id: req.params.userId});
            if(!checkUser.avatar.startsWith('publics/statics')) {fs.unlink(checkUser.avatar, function(err){return});}
        };

        const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const checkPass = await bcrypt.compare(req.body.oldPass, user.password);

        if(!checkPass) return res.status(400).json({message: 'wrong password'});

        const hash = await bcrypt.hash(req.body.newPass, 10);
        await User.updateOne({_id: req.user._id}, {password: hash});
        res.status(200).json({message: 'change password success'});
    } catch (error) {
        res.status(500).json({message: 'server error', error})
    }
}