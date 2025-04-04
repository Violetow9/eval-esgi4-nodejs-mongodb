const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
const bcrypt = require("bcryptjs");
const Post = require("../model/post.model.js");

exports.create = async (req, res) => {
    const userId = req.token._id;
    if (!userId) {
        return res.status(400).json({error: "Vous devez spécifier un id d'utilisateur"});
    }

    let post = {
        "user_id": userId,
        "created_at": Date.now(),
        "updated_at": Date.now()
    };

    console.log(req);
    console.log(req.body);

    const text = req.body.text;
    if (!text || text === "") {
        return res.status(400).json({error: "Vous devez spécifier un texte"});
    }
    post.text = text;

    const image = req.file;
    if (image) {
        post.image = './picture/' + image.filename;
    }

    try {
        await Post.create(post);
        return res.status(201).json({
            message: 'Post créé',
            post
        });
    } catch (error) {
        return res.status(500).json({error: "Erreur lors de la création du post"});
    }
}

exports.getAll = async (_req, res) => {
    const postList = await Post.find({}, {
        _id: 1,
        text: 1,
        image: 1,
        user_id: 1,
        created_at: 1,
        updated_at: 1
    }, {sort: {created_at: -1}});
    if (!postList) {
        return res.status(404).json({error: "Aucun post trouvé"});
    }
    return res.status(200).json(postList);
}

exports.update = async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findOne({_id: postId});
    if (!post) {
        return res.status(404).json({error: "Le post n'existe pas"});
    }

    if (post.user_id.toString() !== req.token._id.toString()) {
        return res.status(403).json({error: "Vous ne pouvez pas modifier ce post"});
    }

    const newText = req.body.text;
    if (newText) {
        post.text = newText;
    }

    const newImage = req.body.image;
    if (newImage) {
        post.image = newImage;
    }

    post.updated_at = Date.now();

    try {
        await post.save();
        return res.status(201).json({
            message: "Post mis à jour",
            post
        });
    } catch (e) {
        return res.status(500).json({error: "Problème lors de la modification du post !"})
    }
}

exports.delete = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        return res.status(400).json({error: "Vous devez spécifier un id de post"});
    }

    let post;
    try {
        post = await Post.findOne({_id: postId});
    } catch (error) {
        return res.status(500).json({error: "Post introuvable"});
    }

    if (post.user_id.toString() !== req.token._id.toString()) {
        return res.status(403).json({error: "Vous ne pouvez pas supprimer ce post"});
    }

    try {
        await Post.deleteOne({_id: postId});
        return res.status(200).json({message: "Post supprimé"});
    } catch (error) {
        return res.status(404).json({error: "Une erreur est survenue lors de la suppression du post"});
    }
}