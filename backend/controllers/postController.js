
const Post = require("../models/Post")
const NodeCache = require("node-cache")

const cache = new NodeCache({ stdTTL: 30 })

exports.getPosts = async (req,res)=>{
  const {page=1,limit=10} = req.query
  const key = `posts_${page}_${limit}`

  if(page == 1){
    const cached = cache.get(key)
    if(cached) return res.json(cached)
  }

  const posts = await Post.find()
    .select("title body userId createdAt")
    .skip((page-1)*limit)
    .limit(parseInt(limit))

  if(page == 1) cache.set(key, posts)

  res.json(posts)
}

exports.getPost = async(req,res)=>{
  const post = await Post.findById(req.params.id)
  res.json(post)
}

exports.createPost = async(req,res)=>{
  const post = await Post.create({
    ...req.body,
    userId:req.user.id
  })

  res.json(post)
}

exports.updatePost = async(req,res)=>{
  const post = await Post.findById(req.params.id)

  if(post.userId !== req.user.id){
    return res.status(403).json({message:"Not allowed"})
  }

  const updated = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.json(updated)
}

exports.deletePost = async(req,res)=>{
  const post = await Post.findById(req.params.id)

  if(post.userId !== req.user.id){
    return res.status(403).json({message:"Not allowed"})
  }

  await Post.findByIdAndDelete(req.params.id)
  res.json({message:"Deleted"})
}
