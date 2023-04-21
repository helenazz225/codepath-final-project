import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from './components/createPost'
import PostDetail from './components/postDetail';
import EditPost from './components/editPost';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
          <Route index={true} path="/" element={<App />} />
          <Route index={false} path="/create-post" element={<CreatePost />} />
          <Route index={false} path='/post-detail/:id' element={<PostDetail />}/>
          <Route index={false} path='/edit-post/:id' element={<EditPost />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
