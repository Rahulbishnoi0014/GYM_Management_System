const express = require("express");
const routers = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const generateAuthToken = require("../models/ownerSchema");
const generateMemberAuthToken = require("../models/memberSchema")
const OwnerAuth = require("../middleware/ownerAuth")
const MemberAuth = require("../middleware/memberAuth")
require("../connections/connections")
const Owner = require("../models/ownerSchema");
const Member = require("../models/memberSchema")
const ObjectId = require("mongodb").ObjectId;

routers.get("/", (req, res) => {
    res.send("Router is running")
});

routers.get("/ownerhome", OwnerAuth, (req, res) => {
    res.send(req.rootUser)
})
routers.get("/memberdetails", OwnerAuth, (req, res) => {
    res.send(req.rootUser)
})

routers.get("/onemember/:id", OwnerAuth, (req, res) => {
    const _id = req.params.id;
    const a = req.rootUser.newmembers
    // console.log(_id);
    a.forEach(q => {
        if (q._id == _id) {
            // console.log(q);
            res.send(q)
        }
    })

})

routers.post("/ownerRegister", async (req, res) => {
    const { name, email, phone, gymname, password } = req.body;
    if (!name) {
        return res.status(422).json({ error: "PLZ fill all the fields" })
    }
    try {
        const emailExist = await Owner.findOne({ email: email });
        if (emailExist) {
            return res.status(402).json({ error: "Email Already register" })
        }
        else {
            const newOwner = new Owner({ name, email, phone, gymname, password })
            await newOwner.save();
            res.status(201).json(newOwner)
        }
    } catch (error) {
        console.log(error);
    }
})

routers.post("/ownerlogin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "plz fill the login credentials" })
        }
        const findOwner = await Owner.findOne({ email })
        if (!findOwner) {
            return res.status(400).json({ error: "User Not Exist" })
        }
        else {
            const validUser = await bcrypt.compare(password, findOwner.password);

            if (validUser) {
                const token = await findOwner.generateAuthToken();
                res.cookie("jwtoken", token)
                res.status(200).json({ message: "Login Successfull" })
            }
            else {
                res.status(400).json({ error: "Credentials Not Match" })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

routers.patch("/updateOwner", OwnerAuth, async (req, res) => {
    const _id = req.userID
    const { name, phone, gymname } = req.body
    if (!name || !phone || !gymname) {
        return res.status(422).json({ error: "PLZ Fill all the fields" })
    }
    else {
        const ownerUpdate = await Owner.updateOne({ _id }, { $set: { name, phone, gymname } }, { new: true });
        if (!ownerUpdate) {
            return res.status(402).send()
        }
        else {
            return res.status(200).json({ message: "Update Owner Data SuccessFully" })
        }
    }
})


routers.delete("/deleteOwner", OwnerAuth, async (req, res) => {
    const deleteowner = await Owner.findByIdAndDelete({ _id: req.userID });
    if (deleteowner) {
        return res.status(200).json({ message: "User Deleted Successfully" })
    }
    else {
        return res.status(402).json({ error: "User Not Deleted" })
    }
})



// Member Routers --------------------------------------------------------------> 


routers.get("/memberHome", MemberAuth, (req, res) => {
    res.send(req.rootUser)
})

routers.post("/addmember", OwnerAuth, async (req, res) => {
    try {
        const _id = new ObjectId()
        const { userName, name, phone, address, registerdate, planeType, amount, dite, feeDuration } = req.body
        if (!userName) {
            return res.status(422).json({ error: "Plz fill the form" })
        }
        const newMember = await Owner.findOne({ _id: req.userID })
        if (newMember) {
            const memberExist = await Member.findOne({ userName })
            if (memberExist) {
                return res.status(402).send({ error: "UserName Already Present" })
            }
            else {
                const PortalAddMember = new Member({ userName, name, phone, address, feeHistory: { registerdate, planeType, amount, feeDuration }, dite, _id })
                // const ownerAddMember = await newMember.addmember(userName, name, phone, address, registerdate, planeType, amount, dite, feeDuration, _id)
                const z = newMember.newmembers.push({ userName, name, phone, address, registerdate, planeType, amount, dite, feeDuration, _id, feeHistory: { registerdate, feeDuration, planeType, amount } })
                res.status(200).json({ message: "Member Added Successfully" })
                await newMember.save();
                await PortalAddMember.save();
            }
        }
    } catch (error) {
        console.log(error);
    }
})

routers.post("/memberLogin", async (req, res) => {
    try {
        const userName = req.body.userName;
        const phone = parseInt(req.body.phone);

        if (!userName || !phone) {
            return res.status(422).json({ error: "Plz fill all the fields" })
        }

        const findMember = await Member.findOne({ userName })
        if (!findMember) {
            return res.status(400).json({ error: "Member Not Exist" })
        }
        else {
            if (findMember.phone === phone) {
                const token = await findMember.generateMemberAuthToken();
                res.cookie("jwtoken", token)
                res.status(200).json({ message: "Login Successful" })
            }
            else {
                res.status(400).json({ error: "Invalid Credentials" })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

// routers.post("/addHistory/:id", OwnerAuth, async (req, res) => {
//     try {
//         const _id = req.params.id;
//         const { registerdate, planeType, amount, feeDuration } = req.body
//         if (!registerdate) {
//             return res.status(422).json({ error: "Plz fill the form" })
//         }

//         // const newMember = await Owner.findOne({ _id: req.userID })
//         Owner.findOne({ _id: req.userID }, (err, data) => {
//             if (!err) {
//                 var arr = data.newmembers;
//                 arr.forEach(x => {
//                     if (x._id == _id) {
//                         x.amount.push(amount)
//                         x.registerdate.push(registerdate)
//                         x.planeType.push(planeType)
//                         x.feeDuration.push(feeDuration)
//                     }
//                 });
//                 data.markModified("newcostumer")
//                 data.save((err) => {
//                     if (!err) res.status(200).json({ message: "Update" });
//                     else return res.status(404).json({ err: "Update not successful" })
//                 });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//     }
// })

routers.post("/addHistory/:id", OwnerAuth, async (req, res) => {
    const { registerdate, feeDuration, planeType, amount, remark } = req.body;
    const memberId = req.params.id;

    try {
        const owner = await Owner.findOne({ _id: req.userID });
        const memberPortal = await Member.findOne({ _id: memberId })
        if (!owner && !memberPortal) {
            return res.status(404).json({ msg: 'Owner not found' });
        }
        const a = memberPortal.feeHistory.push({ registerdate, feeDuration, planeType, amount, remark })
        const member = owner.newmembers.find((m) => m._id.toString() === memberId);
        member.feeHistory.push({ registerdate, feeDuration, planeType, amount, remark });
        var arr = owner.newmembers;
        arr.forEach(x => {
            if (x._id == memberId) {
                x.amount.push(amount)
                x.registerdate.push(registerdate)
                x.planeType.push(planeType)
                x.feeDuration.push(feeDuration)
            }
        });
        await memberPortal.save();
        owner.markModified("newcostumer")
        owner.save((err) => {
            if (!err) res.status(200).json({ message: "Update" });
            else return res.status(404).json({ err: "Update not successful" })
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


routers.delete("/deleteMember/:id", OwnerAuth, async (req, res) => {
    const _id = req.params.id;
    const owner_id = req.userID
    const deleteMemberOwner = await Owner.updateOne({ _id: owner_id }, { "$pull": { "newmembers": { "_id": _id } } }, { safe: true, multi: true })
    const deleteMemberPortal = await Member.findByIdAndDelete({ _id });

    if (!deleteMemberOwner && !deleteMemberPortal) {
        return res.status(400).send()
    }
    // res.status(200).json({ message: "UserDeletes" })
    res.status(200).send(req.rootUser);
    console.log("Deleted");
})



routers.post("/addgymDetails", OwnerAuth, async (req, res) => {
    const { morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption } = req.body;

    if (!morningOpening) {
        console.log("PLZ fill the form");
        return res.status(422).json({ error: "plz fill the form" })
    }

    const addDetails = await Owner.findOne({ _id: req.userID });

    if (addDetails) {
        const addExtraDetails = await addDetails.aboutgym(morningOpening, morningClosing, eveningOpening, eveningClosing, gymAddress, descreption);
        res.status(201).json({ message: "Details Added Successfully" })
    }

})
routers.get("/logoutuser", async (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    const id = req.userID
    console.log(id);
    const deleteToken = await Owner.updateOne({ id }, { $set: { tokens: [] } })
    console.log("Logout");
    res.status(200).json({ message: "User Logout" })
})

module.exports = routers