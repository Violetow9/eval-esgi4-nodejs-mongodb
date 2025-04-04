const Comment = require("./../model/comment.model.js");

exports.create = async (req, res) => {
    if (!req.body.text || req.body.text === "") {
        return res.status(400).json({ message: "Veuillez saisir un commentaire" })
    };

    let comment = await Comment.create({
        text: req.body.text,
        user_id: req.token._id,
        post_id: req.params.postId
    });

    if (!comment) {
        return res.status(500).json({ error: "Erreur lors de la création du commentaire" });
    }

    res.status(201).json(comment);
}

exports.update = async (req, res) => {
    let comment = await Comment.findOne({ _id: req.params.commentId });

    if (!comment) {
        return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    if (comment.user_id.toString() !== req.token._id) {
        return res.status(403).json({ error: "Vous n'êtes pas autorisé à modifier ce commentaire" });
    }

    comment.text = req.body.text || comment.text;
    comment.updated_at = Date.now();


    await comment.save();

    return res.status(200).json(comment);
}

exports.delete = async (req, res) => {
    let comment = await Comment.findOne({ _id: req.params.commentId });

    if (!comment) {
        return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    if (comment.user_id.toString() !== req.token._id) {
        return res.status(403).json({ error: "Vous n'êtes pas autorisé à supprimer ce commentaire" });
    }

    await Comment.deleteOne({ _id: req.params.commentId });

    return res.status(200).json({ message: "Commentaire supprimé" });
}


exports.getByPostId = async (req, res) => {
    let comments = await Comment.find({ post_id: req.params.postId }).populate("user_id", "email").sort({ created_at: -1 });

    if (!comments) {
        return res.status(404).json({ error: "Commentaires non trouvés" });
    }

    return res.status(200).json(comments);
}

exports.getById = async (req, res) => {
    let comment = await Comment.findOne({ _id: req.params.commentId }).populate("user_id", "email");

    if (!comment) {
        return res.status(404).json({ error: "Commentaire non trouvé" });
    }

    return res.status(200).json(comment);
}

exports.getByUserId = async (req, res) => {
    let comments = await Comment.find({ user_id: req.params.userId }).populate("user_id", "email").sort({ created_at: -1 });

    if (!comments) {
        return res.status(404).json({ error: "Commentaires non trouvés" });
    }

    return res.status(200).json(comments);
}

exports.getAll = async (req, res) => {
    let comments = await Comment.find().populate("user_id", "email").sort({ created_at: -1 });

    if (!comments) {
        return res.status(404).json({ error: "Commentaires non trouvés" });
    }

    return res.status(200).json(comments);
}