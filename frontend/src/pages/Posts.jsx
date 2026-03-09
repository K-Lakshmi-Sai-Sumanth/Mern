
import {useEffect,useState} from "react"
import axios from "axios"

export default function Posts(){

const [posts,setPosts]=useState([])

useEffect(()=>{
fetchPosts()
},[])

const fetchPosts = async()=>{
const token = localStorage.getItem("token")

const res = await axios.get("http://localhost:5000/api/posts",{
headers:{Authorization:`Bearer ${token}`}
})

setPosts(res.data)
}

return(
<div>
<h2>Posts Dashboard</h2>
{posts.map(p=>(
<div key={p._id}>
<h4>{p.title}</h4>
<p>{p.body}</p>
</div>
))}
</div>
)
}
