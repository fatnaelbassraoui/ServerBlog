const express = require('express')
const Posts = require('../models/Posts')


const posts = express.Router()

posts.get('/posts', async (req,res)=>{
    try {
        const posts = await Posts.find()
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send({
            message:'an error has occured'
        })
    }
})

// posts.get('/post/featured', async (req,res)=>{
//     try {
//         const posts = await Posts.find({featured:true})
//         res.status(200).send(posts)
//     } catch (error) {
//         res.status(500).send({
//             message:'an error has occured'
//         })
//     }
// })

// posts.get('/postNotFeatured', async (req,res)=>{
//     try {
//         const posts = await Posts.find({featured:false})
//         res.status(200).send(posts)
//     } catch (error) {
//         res.status(500).send({
//             message:'an error has occurred'
//         })
//     }
// })

posts.get("/posts/:id", async (req, res) => {
    const {id} = req.params
    try {
      const post = await Posts.findById(id);
      if (!post)
      return res
          .status(404)
          .send(`post with id ${id} not found`)
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send({
        message: "an error has occurred",
      });
    }
  })

posts.get('/post/type', async (req,res)=>{
    const { page= 1, limit=40 , featured} = req.query
    try {
        const posts = await Posts
        .find({featured:featured})
        .limit(limit * 1)
        .skip((page -1) * limit)
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send({
            message:'an error has occured'
        })
    }
})

posts.post('/posts', async (req, res) => {
    const newPosts = new Posts({
        author: req.body.author,
        title: req.body.title,
        img: req.body.img,
        body:req.body.body,
        featured: req.body.featured,
        category: req.body.category
    })

    try {
        const savePosts = await newPosts.save()
        res.status(200).send({
            message: "Post saved successfully",
            payload: savePosts
        })

    } catch (error) {
        res.status(500).send({
            message: "an error is occurred",
            error: error
        })

    }
})

posts.delete('/posts/:id', async (req, res) => {
    const { id } = req.params

    try {

        const user = await Posts.findById(id).deleteOne()
        if (!user)
            return res
                .status(404)
                .send(`the Post with id ${id} does not exist`)

        res.status(200).send('Post deleted successfully')

    } catch (error) {
        res.status(500).send({
            message: "Post can't be deleted",
            error: error
        })

    }
})

posts.patch("/posts/:id", async(req, res)=>{
   
    try {
        const {id} = req.params
        const updatePosts = req.body
        const options = {new:true}
        const result = await Posts.findByIdAndUpdate(id, updatePosts, options)
        if(!result)
            return res
                .status(404)
                .send(`Posts with id ${id} not found`)
                
        res.status(200).send({
            message: "Posts info updated successfully",
            payload: result
        })
    }
    catch(error){
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
})


module.exports = posts