
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"
import router from "../routes/posts.js";

 export const getPosts = async (req, res)=>{
    try {
        const posts = await PostMessage.find();
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message});
        
    }

 }

 export const createPost = async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })
    //console.log(newPostMessage);
    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        //console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}


export const updatePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id : ${id} `);
    }

    const post = req.body;

    const updatedPostMessage = {...post, _id:id };
    //console.log(newPostMessage);
    try {
        await PostMessage.findByIdAndUpdate(id, updatedPostMessage, { new: true});

        res.status(201).json(updatedPostMessage  );
    } catch (error) {
        //console.log(error.message);
        res.status(409).json({ message: error.message });
    }
}


export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id : ${id} `);
    }
    try {
        await PostMessage.findByIdAndRemove(id);

        res.json({mesage: "Post deleted successfully."});
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error});
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No post with id : ${id} `);
    }

    const post = await PostMessage.findById(id);
    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, { new: true});

        res.json(updatedPost  );
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}