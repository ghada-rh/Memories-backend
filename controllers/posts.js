import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = (req, res) => {
    //res.send('server is up and running so that works!');
    PostMessage.find()
    .then(postMessage =>res.json(postMessage))
    .catch(err => res.status(400).json('Error: '+ err));

 }

export const createPost = (req, res) => {
    //res.send('post created');
    const post = req.body
    PostMessage.create(post, (err, data)=>{
        if (err){
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
 } 
 export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
/*
export const updatePost = (req, res) => {
    /*const id = req.params._id;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);//
    PostMessage.findById(req.params._id)
      .then(post => {
        post.title = req.body.title;
        post.message = req.body.message;
        post.creator = req.body.creator;
        post.selectedFile = req.body.selectedFile;
        post.tags = req.body.tags;
        
        post.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
 
 }*/

export const deletePost = (req, res)=>{
    PostMessage.findByIdAndDelete(req.params.id)
    .then((post) =>res.send(post))
    .catch(err => res.status(400).json('Error: '+ err));

}

export const likePost = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, { new: true });

    res.json(updatedPost);
}