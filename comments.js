// create web server
// 1. load modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Comment = require("./models/Comment");
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;
// 2. define middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);
// 3. connect to mongodb
mongoose.connect("mongodb://localhost:27017/comments");
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully!");
});
// 4. define routes
// get all comments
router.route("/comments").get((req, res) => {
  Comment.find((err, comments) => {
    if (err) console.log(err);
    else res.json(comments);
  });
});
// get one comment
router.route("/comments/:id").get((req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) console.log(err);
    else res.json(comment);
  });
});
// add new comment
router.route("/comments/add").post((req, res) => {
  let comment = new Comment(req.body);
  comment
    .save()
    .then(comment => {
      res.status(200).json({ comment: "comment added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new comment failed");
    });
});
// update comment
router.route("/comments/update/:id").post((req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (!comment) return next(new Error("Could not load document"));
    else {
      comment.comment_author = req.body.comment_author;
      comment.comment_body = req.body.comment_body;
      comment.comment_email = req.body.comment_email;
      comment
        .save()
        .then(comment => {
          res.json("Update done");
        })
        .catch(err => {
          res.status(400).send("Update failed");
        });
    }
  });
});
// delete comment
router.route("/comments/delete/:id").get((req, res) => {
  Comment.findByIdAndRemove({ _id: req.params.id }, (err, comment) => {
    if (err) res.json(err);
    else res.json("Removed successfully


 
