import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/dashboard'
import { supabase } from './client'
import { Link, useLocation } from 'react-router-dom'
// CodepathFinal$12345 

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await supabase.from('Posts').select().order('created_at', {ascending: false})
      setPosts(data)
    }
    fetchData()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    // console.log(search)
    // setPosts([...posts.filter(post => post.title.includes(e.target.value) || e.target.value == '')])
  }

  const sortByTimeFirst = () => {
    setPosts([...posts.sort((a,b) => a.created_at > b.created_at ? 1 : -1)])
    // console.log(posts[0].created_at < posts[1].created_at)
  }
  const sortByTimeRecent= () => {
    setPosts([...posts.sort((a,b) => a.created_at < b.created_at ? 1 : -1)])
    // console.log(posts[0].created_at < posts[1].created_at)
  }

  const sortByUpvotes = () => {
    setPosts([...posts.sort((a,b) => a.upvotes < b.upvotes ? 1 : -1)])
  }

  // const date = new Date("Jul 21, 2013")
  // const date = Date();
  // const date = new Date("2023-04-20 00:34:33.311559+00").toLocaleDateString('en-US', {
  //   day:   '2-digit',
  //   month: '2-digit',
  //   year:  'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit'
  // });
  
  return (
    <div className="App">
      <div>
            <div className="dashboard">
                <h2 id="title">
                    <Link style={{color: 'white', 'text-decoration': 'none'}} to={'/'}>Book Board</Link>
                </h2>
                <input className='search dashboard-input' placeholder='Search' value={search} onChange={handleSearch}/>
                <p id="create-post">
                    <Link to={'/create-post'} style={{color: 'white', 'text-decoration': 'none'}}>Create New Post</Link>
                </p>
            </div>
        </div>
      <div>
        <h1 id='post-gallery'>Post Gallery</h1>
        <div className='sort-row'>
          <p>Sort by: </p>
          <button onClick={sortByTimeFirst}>Time (first posted) </button>
          <button onClick={sortByTimeRecent}>Time (most recent) </button>
          <button onClick={sortByUpvotes}>Upvotes</button>
        </div>
      </div>
      <div className='gallery'>{posts.length == 0 ? "No Posts Yet" : posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || search == '').map((post) => {
        // date = new Date()
        return (
          <Link to={`/post-detail/${post.id}`} state={{created_at: post.created_at, title: post.title, content: post.content, url: post.image_url, upvotes: post.upvotes, comments: post.comments}} style={{color: 'black', 'text-decoration': 'none'}}>
            <div className='post-card'>
              <p className='post-time'>{`Posted on: ${new Date(post.created_at).toLocaleDateString('en-US', {
                day:   '2-digit',
                month: '2-digit',
                year:  'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}`}</p>
              <h3>{post.title}</h3>
              <div>{`${post.upvotes} upvotes`}</div>
            </div>
          </Link>
        )}
      )}</div>
    </div>
  )
}

export default App
