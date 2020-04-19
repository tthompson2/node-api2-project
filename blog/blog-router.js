const express = require("express");
const blog = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {

    blog.find()
        .then((blogs) => {
            res.status(200).json(blogs);
        })
        .catch(error => {
            console.log(error);
            res.status.apply(500).json({
                message: "Error retrieving the blogs",
            })
        })
})

router.post("/", (req, res) => {

    console.log(req.params);

    // put if statement to handle fields that are expected in the object

    blog.insert(req.params.body)
        .then((blogs) => {
            res.status(201).json(blogs)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding the blog"
            })
        })
    // need to put post as a parameter for this function
})

router.put("/:id", (req, res) => {

    blog.update(req.params.id, req.params.body)
        .then((blog) => {
            res.status(200).json(blog)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error updating the blog"
            })
        })

})

router.get("/:id", (req, res) => {
    blog.findById(req.params.id)
        .then((blog) => {
            res.status(200).json(blog)
        })
        .catch((error) => {

            console.log(error);
            res.status(500).json({
                message: "Error at this particular blog id"
            })

        })
})

router.get("/:id/comments/:postId", (req, res) => {
    
    blog.findCommentById(req.params.id, req.params.postID)
    .then((blog) => {
        if(blog) {
          res.json(blog);
        }else {
            res.status(404).json({
                message: "Blog Post was not found",
            })
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Could not find blog post"
        })
    })
})


router.get("/:id/comments", (req, res) => {
    blog.findPostComments(req.params.id)
        .then((blog) => {
            res.status(200).json(blog);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: "Unable to get comments from blog post"
            })
        })
})

router.post("/:id/", (req, res) => {
    
    blog.insertComment(req.params.body)
    .then((comment) => {
       res.status(200).json(comment);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Unable to insert comment into blog post"
        })
    })
})

module.exports = router;