import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { Link, useLocation, useParams } from "react-router-dom";
import { supabase } from "../client";

const PostDetail = () => {
    const location = useLocation()
    // console.log(location.state)
    const data = location.state
    // console.log(data)
    let params = useParams()
    // const [detail, setDetail] = useState([])
    const [commentVal, setCommentVal] = useState('');
    // const [comment, setComment] = useState('Leave a comment');
    // const [displayPost, setDisplayPost] = useState({title: 'Title', content: 'Content (Optional)', url: 'Image URL (Optional)', upvotes: 0, comments:[]})
    const [upvotes, setUpvotes] = useState(data.upvotes)
    const [post, setPost] = useState({title: data.title, content: data.content, image_url: data.url, upvotes: data.upvotes, comments: data.comments})
    // const handleComment = () => {
    //     setComment([...comment, commentVal])
    // }
    const handleChange = (event) => {
        const {name, value} = event.target
        // console.log(name)
        // console.log(value)
        // console.log(post.title)
        // console.log(post.comments)
        // let test_var = [...post[0]['comments'], value]
        setPost((prev) => {
            return {
                ...prev,
                [name]: [...post.comments, value]
            }
        })
        setCommentVal('')
    }
    // let {data} = 0
    // useEffect(() => {
    //     const getPost = async () => {
    //         const {data} = await supabase.from('Posts').select().eq('id', params.id)
    //         setPost(data[0])
    //     }
    //     getPost()
    // }, [])
    // console.log(post)
    useEffect(() => {
        const updatePost = async () => {
            // console.log('create')
            // event.preventDefault();
            // console.log(post.comments)
            // const{data} = await supabase.from('Posts').select().eq('id', params.id)
            // setPost(data[0])
            // setPost((prev) => {
            //     return {
            //         ...prev,
            //         title: displayPost.title,
            //         content: displayPost.content,
            //         image_url: displayPost.image_url
            //     }
            // })
            await supabase.from('Posts').update({ title: post.title, content: post.content, image_url: post.image_url, upvotes: upvotes, comments: post.comments}).eq('id', params.id)
            // window.location = './'
        }
        updatePost()
    })

    const handleUpvotes = () => {
        // console.log(upvotes)
        setUpvotes(upvotes+1)
    }
    const deletePost = async () => {
        event.preventDefault();
        await supabase.from('Posts').delete().eq('id', params.id)
        // console.log('tesr')
        window.location = "/";
    }
    // console.log(post)
    // const handleChange = () => {
    //     // const {name, value} = event.target
    //     console.log(comment)
    //     const {comments} = 'comments'
    //     let copy = {...post}
    //     copy.title = ['bruh']
    //     setPost(copy)
    // }
    // console.log(post)
    // console.log(post.comments)
    // const handleCommentVal = (e) => {
    //     setCommentVal(e.target.value)
    // }
    // useEffect(() => {
    // const getPostData = async () => {
    //     const {data} = await supabase.from('Posts').select().eq('id', params.id)
    //     setPost(data[0])
    //     // console.log(data[0])
    // }
    // getPostData()
    // })
    // console.log(detail[0].image_url)
    return (
        <div>
            <Dashboard />
            <div className="detail-view">
                <div className="post-detail-text">
                    <div className="detail-top-row">
                        <p>{post && `Posted on: ${new Date(data.created_at).toLocaleDateString('en-US', {
                            day:   '2-digit',
                            month: '2-digit',
                            year:  'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}`}</p>
                        <button onClick={handleUpvotes}>Upvote</button>
                    </div>
                    <h2>{post && post.title}</h2>
                    <p>{post && post.content == "" ? "" : post && post.content}</p>
                    <div>
                        {post && post.image_url == "" ? null : <img id='detail-img' src={post && post.image_url} />}
                    </div>
                    <div className="upvotes">
                        <p>{post && `${upvotes} upvotes`}</p>
                    </div>
                    <div>{post.comments.map((comment) => <div className="comment">
                        <p>{comment}</p>
                    </div>)}</div>
                    <input id="comment-input" className="dashboard-input" placeholder='Leave a comment' value={commentVal} onChange={(e) => setCommentVal(e.target.value)}></input>
                    <div className="button-row">
                        <button id='upload-button' name='comments' value={commentVal} onClick={handleChange}>Upload</button>
                        <Link to={`/edit-post/${params.id}`} state={{created_at: post.created_at, title: post.title, content: post.content, url: post.image_url, upvotes: upvotes, comments: post.comments}} style={{color: 'black', 'text-decoration': 'none'}}><button>Edit Post</button></Link>
                        <button onClick={deletePost}>Delete Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail