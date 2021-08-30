// https://www.youtube.com/watch?v=GNrdg3PzpJQ  

import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import { GET_DB, SET_DB } from './ioLocalStorage'
import PostFilter from './components/PostFilter'
import MyModal from './components/UI/modal/MyModal'
import MyButton from './components/UI/button/MyButton'

function App() {

  const postListTitle = "POSTS"

  const [postList, setPostList] = useState(GET_DB())

  const idForAddingPost = function* () {
    let lastId = 0
    postList.forEach(postDataset => { if (postDataset.id >= lastId) lastId = postDataset.id })
    while (true)
      yield ++lastId;
  }()

  const addPost = (postWithoutId) => {
    const newPost = {
      id: idForAddingPost.next().value,
      title: postWithoutId.title,
      body: postWithoutId.body
    }
    setPostList(
      [
        ...postList,
        newPost
      ]
    )
    console.log(`adding ${JSON.stringify(newPost)} to localStorage`)
    setModal(false)
  }

  const removePost = (post) => {
    setPostList(
      postList.filter(
        singlePost =>
          singlePost.id !== post.id
      )
    )
    console.log(`removing ${JSON.stringify(post)} from localStorage`)
  }

  useEffect(() => {
    SET_DB(postList)
  }, [postList.length])

  const [filter, setFilter] = useState({ sort: "", query: "" })

  const sortedPosts = useMemo(
    () => {
      if (filter.sort) {
        return [...postList].
          sort(
            (a, b) =>
              a[filter.sort].
                localeCompare(
                  b[filter.sort]
                )
          )
      }
      return postList
    },
    [filter.sort, postList])



  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(filter.query.toLowerCase()) ||
      post.body.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedPosts])

  const [modal,setModal] = useState(false)


  return (
    <div className="App">
      <MyButton style={{marginTop: "30px"}} onClick={()=> setModal(true)}>
        CREATE POST
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm
          postList={postList}
          addPost={addPost} />
      </MyModal>


      <hr style={{ margin: "15px 0", color: 'black' }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter} />

      <hr style={{ margin: "15px 0", color: 'black' }} />

      <PostList
        postList={sortedAndSearchedPosts}
        removePost={removePost}
        postListTitle={postListTitle} />



    </div>
  );
}

export default App;
