//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "At Blogify, we believe in the power of journaling to transform your life. Whether you want to keep track of your daily thoughts, set goals, express your creativity, or reflect on your personal growth journey, our platform provides the perfect space for you to do so.With our user-friendly interface and convenient accessibility, you can now capture your thoughts and emotions anywhere, anytime.Join our community of passionate journalers who are committed to self-discovery, personal development, and mindful living. Start your journaling journey today and unlock the potential for greater self-awareness, emotional well-being, and personal growth.";
const aboutContent = " Blogify is a leading online platform dedicated to providing a seamless and enriching journaling experience. Our mission is to empower individuals to cultivate self-reflection, personal growth, and well-being through the power of journaling.";
const contactContent = "We would love to hear from you! Whether you have questions, feedback, or collaboration opportunities, please feel free to reach out to us.Are you interested in collaborating with us? We welcome partnerships and collaborations that align with our mission of promoting personal growth and well-being through journaling. If you have an idea or proposal, please reach out to us at jinilshukla07@gmail.com. We look forward to exploring opportunities to work together and create meaningful experiences for our users.For general inquiries or support-related questions, please email us at the address above, and our team will get back to you as soon as possible.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];
app.get("/", function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
    posts:posts
  });
})
app.get("/about", function(req,res){
  res.render("about",{aboutContent:aboutContent});
})
app.get("/contact", function(req,res){
  res.render("contact",{contactContent:contactContent});
})
app.get("/compose", function(req,res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  const post={
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})
app.get("/posts/:postName", function(req,res){
  const requestedTitle=_.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const storedTitle=_.lowerCase(post.title);
    if(storedTitle===requestedTitle){
      res.render("post",{
        title:post.title,
        content:post.content
      }); 
    }
  });
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
