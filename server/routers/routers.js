const express = require("express");
const routers = express.Router();
require("../connections/connections")
const owner = require("../models/ownerSchema")

routers.get("/", (req, res) => {
    res.send("Router is running")
});

routers.post("/ownerRegister", async (req, res) => {
    const { name, email, phone, gymname, password } = req.body;
    if (!name) {
        return res.status(422).json({ error: "PLZ fill all the fields" })
    }
    try {
        const emailExist = await owner.findOne({ email: email });
        if (emailExist) {
            return res.status(402).json({ error: "Email Already register" })
        }
        else {
            const newOwner = new owner({ name, email, phone, gymname, password })
            await newOwner.save();
            res.status(201).json(newOwner)
        }
    } catch (error) {
        console.log(error);
    }


})

module.exports = routers