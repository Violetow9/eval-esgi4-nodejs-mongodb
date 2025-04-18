const Comment = require("./../model/comment.model.js");

exports.create = async (req, res) => {
    if (!req.body.postId || req.body.postId === "") {
        return res.status(400).json({message: "Veuillez spécifier un post"})
    }

    if (!req.body.text || req.body.text === "") {
        return res.status(400).json({message: "Veuillez saisir un commentaire"})
    }

    const comment = {
        "text": req.body.text,
        "user_id": req.token._id,
        "post_id": req.body.postId,
        "created_at": Date.now(),
        "updated_at": Date.now()
    };

    try {
        await Comment.create(comment);
        return res.status(201).json({
            message: "Commentaire créé",
            comment
        });
    } catch (e) {
        return res.status(500).json({error: "Erreur lors de la création du commentaire"});
    }
}

exports.update = async (req, res) => {
    const commentId = req.params.commentId;
    if (!commentId) {
        return res.status(400).json({error: "Vous devez spécifier un id de commentaire"});
    }

    const comment = await Comment.findOne({_id: commentId});
    if (!comment) {
        return res.status(404).json({error: "Commentaire non trouvé"});
    }

    if (comment.user_id.toString() !== req.token._id.toString()) {
        return res.status(403).json({error: "Vous ne pouvez pas modifier ce commentaire"});
    }

    const newText = req.body.text;
    if (newText) {
        comment.text = newText;
        comment.updated_at = Date.now();
    }

    try {
        await comment.save();
        return res.status(201).json({
            message: "Commentaire mis à jour",
            comment
        });
    } catch (e) {
        return res.status(500).json({error: "Erreur lors de la mise à jour du commentaire"});
    }
}

exports.delete = async (req, res) => {
    const commentId = req.params.id;
    if (!commentId) {
        return res.status(400).json({error: "Vous devez spécifier un id de commentaire"});
    }

    const comment = await Comment.findOne({_id: commentId});
    if (!comment) {
        return res.status(404).json({error: "Commentaire non trouvé"});
    }

    if (comment.user_id.toString() !== req.token._id.toString()) {
        return res.status(403).json({error: "Vous ne pouvez pas supprimer ce commentaire"});
    }

    try {
        await comment.deleteOne({_id: commentId});
        return res.status(200).json({
            message: "Commentaire supprimé",
            comment
        });
    } catch (e) {
        return res.status(500).json({error: "Erreur lors de la suppression du commentaire"});
    }
}