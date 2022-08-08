const { handlePostImageUpload } = require("../services/postServices");

exports.createPost = async (req, res) => {
    try {
        console.log(req.files);
        console.log(req.body);
        const data = handlePostImageUpload(req.files, req.body);
        console.log(data);
        res.status(200).json({ data})
    } catch (error) {
        console.log(16, error);
        res.status(500).json({message: 'server error', error})
    }
}