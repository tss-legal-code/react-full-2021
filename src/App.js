import React, { useEffect, useRef, useState } from 'react'
// import Counter from './components/Counter'
import './styles/App.css'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/input/MyInput'
import PostForm from './components/PostForm'
import { GET_DB, SET_DB } from './ioLocalStorage'


function App() {

  const postListTitle = "POSTS"

  const [postList, setPostList] = useState(GET_DB)

  const addPost = (post) => {
    setPostList(
      [
        ...postList,
        post
      ]
    )
    console.log(`adding ${JSON.stringify(post)} to localStorage`)
    // SET_DB(postList) // update localStorage
    // console.table(GET_DB())
  }

  const removePost = (post) => {
    setPostList(
      postList.filter(
        singlePost =>
          singlePost.id !== post.id
      )
    )
    console.log(`removing ${JSON.stringify(post)} from localStorage`)
    // SET_DB(postList) // update localStorage
    // console.table(GET_DB())
  }

  useEffect(() => {
    SET_DB(postList)
    console.table(GET_DB())
  }, [postList])

  return (
    <div className="App">
      <PostForm
        postList={postList}
        addPost={addPost} />

      {
        postList.length === 0
          
          ? <h1 style={{ textAlign: "center" }}>
            NO POSTS TO DISPLAY
          </h1>
          
          : <PostList
            postList={postList}
            removePost={removePost}
            postListTitle={postListTitle} />
            
      }

    </div>
  );
}

export default App;
