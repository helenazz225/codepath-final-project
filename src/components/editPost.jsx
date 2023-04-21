import React from "react";
import { useState } from "react";
import Dashboard from "./dashboard";
import { useLocation, useParams } from "react-router-dom";
import { supabase } from "../client";

const EditPost = () => {
    let params = useParams()
    const location = useLocation()
    const data = location.state
    const [post, setPost] = useState({title: data.title, content: data.content, url: data.url, upvotes: data.upvotes, comments: data.comments})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
    }
    const editPost = async () => {
        event.preventDefault();
        await supabase.from('Posts').update({ title: post.title, content: post.content, image_url: post.url, upvotes: post.upvotes, comments: post.comments }).eq('id', params.id)
        window.location = '/';
    }
    return (
        <div>
            <Dashboard />
            <h1>Create New Post</h1>
            <form className="create-post-form">
                <input className="create-input" type='text' name='title' value={post.title} onChange={handleChange}></input>
                <textarea className="create-input" type='text' name='content' value={post.content} id='content-input' onChange={handleChange}></textarea>
                <input className="create-input" type='text' name='url' value={post.url} onChange={handleChange}></input>
                <button className="create-post-button" onClick={editPost}>Update Post</button>
            </form>
        </div>
    )
}

export default EditPost