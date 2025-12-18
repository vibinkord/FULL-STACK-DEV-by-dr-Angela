const express=require("express");
const app=express();
const port=3000;

app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));

const posts=[
    {
        id:1,
        title:"First Post",
        content:"This is the content of the first post."
    },
    {
        id:2,
        title:"Second Post",
        content:"This is the content of the second post."
    }
];

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index",{posts:posts});

});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/create",(req,res)=>{
    const newpost={
        id:posts.length+1,
        title:req.body.title,
        content:req.body.content
    };
    posts.push(newpost);

    res.redirect("/");
});





app.post("/delete/:id",(req,res)=>{
    const postID=parseInt(req.params.id);
    const Index=posts.findIndex(post=>post.id===postID);
    if(Index!==-1){
        posts.splice(Index,1);
    }
    res.redirect("/");
});


app.get("/edit/:id",(req,res)=>{
    const postid=parseInt(req.params.id);
    const post=posts.find(post=>post.id===postid);
    if(!post){
        return res.redirect("/");
    }
    res.render("edit",{post:post});
    });
app.post("/update/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }

  res.redirect("/");
});



app.listen(port,()=>{
    console.log("Server running");
});