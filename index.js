const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const { v4: uuid } = require("uuid");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

var comments = [
	{
		id: uuid(),
		username: "Atharva",
		body: "Hello this is my first comment",
	},
	{
		id: uuid(),
		username: "Ananya",
		body: "Boneless here",
	},
	{
		id: uuid(),
		username: "Maali",
		body: "Maali here",
	},
];  


app.get("/comments", (req, res) => {
	res.render("comments/index",{comments});
});

app.get("/comments/new", (req, res)=>{
	res.render("comments/new");
})

app.post("/comments", (req, res)=>{
	// res.send("POST REQUEST TO /COMMENTS");
	// console.log(req.body);
	const {username, body} = req.body;
	comments.push({username, body, id: uuid()});
	res.redirect("/comments");
	console.log(comments);
})

app.get("/comments/:id", (req, res)=>{
	const {id} = req.params;
	const comment = comments.find(c => c.id === id);
	console.log(comment);
	const {body, username} = comment;
	res.render("comments/show", {body, username, id});
})

app.post("/comments/:id", (req, res)=>{
	const {id} = req.params;
	const comment = comments.find(c => c.id === id);
	const {body, username} = req.body;
	comment.body = body;
	comment.username = username;
	res.redirect("/comments");
})

app.get("/comments/delete/:id", (req, res) => {
	const { id } = req.params;
	const newComments = comments.filter((c) => c.id !== id);
	comments = newComments;
	res.redirect("/comments");
});
// app.use("*", (req, res) =>
// {
// 	res.redirect("/comments");
// })

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

