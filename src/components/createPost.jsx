import React from "react";
import { useState } from "react";
import Dashboard from "./dashboard";
import { supabase } from "../client";

const CreatePost = () => {
    const [post, setPost] = useState({title: '', content: '', url: '', upvotes: 0, comments: []})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }

    const createPost = async () => {
        console.log('create')
        event.preventDefault();
        await supabase.from('Posts').insert({ title: post.title, content: post.content, image_url: post.url, upvotes: 0, comments: []}).select()
        window.location = './'
    }

    return (
        <div>
            <Dashboard />
            <h1>Create New Post</h1>
            <form className="create-post-form">
                <input className="create-input" type='text' name='title' placeholder='Title' value={post.title} onChange={handleChange}></input>
                <textarea className="create-input" type='text' name='content' placeholder='Content (Optional)' value={post.content} id='content-input' onChange={handleChange}></textarea>
                <input className="create-input" type='text' name='url' placeholder='Image URL (Optional)' value={post.url} onChange={handleChange}></input>
                <button className="create-post-button" onClick={createPost}>Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost