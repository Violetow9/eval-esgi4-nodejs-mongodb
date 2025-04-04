const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
const bcrypt = require("bcryptjs");

exports.signin = async (req, res) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
        return res.status(400).json({ message: "Veuillez saisir un email et un mot de passe" })
    };
    
    let user = await User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    res.status(201).json(user);
}

exports.login = async (req, res) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
        return res.status(400).json({ message: "login ou mot de passe incorrect" })
    };
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ error: "login ou mot de passe incorrect" });
    }
    return res.status(200).json({
        _id: user._id,
        email: user.email,
        token: jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.JWT_KEY, { expiresIn: '24H' })
    });
}

exports.getAll = async (req, res) => {
    let userList = await User.find();
    if (!userList) {
        return res.status(404).json({ error: "utilisateurs non trouvés" });
    }
    return res.status(200).json(userList);
}

exports.getById = async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    if (!userList) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    res.status(200).json(user);
}

exports.update = async (req, res) => {
    let user = await User.findOne({ _id: req.token._id });
    if (!user) {
        return res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
        await user.save();
        return res.status(201).json(user);
    }catch(e){
        return res.status(500).json({error: "Problème lors de la sécurisation du mot de passe"})
    }
}

exports.updateAdmin = async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
        await user.save();
        return res.status(201).json(user);
    }catch(e){
        return res.status(500).json({error: "Problème lors de la sécurisation du mot de passe"})
    }
}

exports.update = async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });
    if (!user) {
        return res.status(404).json({ error: "L'utilisateur n'existe pas" });
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }
    try {
        await user.save();
        return res.status(201).json(user);
    }catch(e){
        return res.status(500).json({error: "Problème lors de la sécurisation du mot de passe"})
    }
}

exports.delete = async (req, res) => {
    let result = await User.deleteOne({ _id: req.params.id });
    if (result !== 1) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    return res.status(200).json({ message: "Utilisateur supprimé" });
}