const { Schema, model } = require("mongoose");

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String
    },
    profilePic: {
        type: String
    },
    accountType: {
        type: String
    }
}, { timestamps: true });

module.exports = model("User", userSchema);
