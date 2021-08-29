import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  }, [postList.length])

  const [selectedSort, setSelectedSort] = useState("")

  const sortedPosts = useMemo(
    () => {
      if (selectedSort) {
        return [...postList].
          sort(
            (a, b) =>
              a[selectedSort].
                localeCompare(
                  b[selectedSort]
                )
          )
      }
      return postList
    },
    [selectedSort, postList])


  const [searchQuery, setSearchQuery] = useState('')

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, sortedPosts])


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
            // postList={postList}
            postList={sortedAndSearchedPosts}
            removePost={removePost}
            postListTitle={postListTitle} />

      }

    </div>
  );
}

export default App;
