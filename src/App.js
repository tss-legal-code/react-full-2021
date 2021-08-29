import React, { useEffect, useRef, useState } from 'react'
// import Counter from './components/Counter'
import './styles/App.css'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import { GET_DB, SET_DB } from './ioLocalStorage'
import MySelect from "./components/UI/select/MySelect"
import MyInput from './components/UI/input/MyInput'

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
  }, [postList])

  const [selectedSort, setSelectedSort] = useState("")

  useEffect(
    () => {
      if (selectedSort) setPostList([...postList].
        sort(
          (a, b) =>
            a[selectedSort].
              localeCompare(
                b[selectedSort]
              )
        )
      )
    }, [selectedSort, postList.length])
  const sortPosts = (sortBy) => {
    setSelectedSort(sortBy)
  }

  const [searchQuery, setSearchQuery] = useState('')


  return (
    <div className="App">
      <PostForm
        postList={postList}
        addPost={addPost} />


      <hr style={{ margin: "15px 0" }} />
      <MyInput
        value={searchQuery}
        placeholder="Searching ... "
        onChange={e => setSearchQuery(e.target.value)}
      />
      <MySelect
        value={selectedSort}
        onChange={setSelectedSort}
        options={
          [
            { id: 0, name: "sort by title", value: 'title' },
            { id: 1, name: "sort by body", value: 'body' },
          ]
        }
        defaultOption="no sorting" />

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
