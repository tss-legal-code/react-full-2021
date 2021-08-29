import React, { useRef, useState } from 'react'
// import Counter from './components/Counter'
import './styles/App.css'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/input/MyInput'

function App() {

  const postListTitle = "...HERE WE GO AGAIN"

  const [postList, setPostList] = useState([
    { id: 1, title: "JS", body: "JAVASCRIPT" },
    { id: 2, title: "TS", body: "TYPESCRIPT" },
    { id: 3, title: "J", body: "JAVA" },
    { id: 4, title: "S", body: "SCRIPT" },
  ])


  const composeDeletePostCommand =
    (list, setList) => /// in case if we have to display and manage several lists
      (id) =>
        setList(
          list.filter(
            singlePost =>
              singlePost.id !== id
          )
        )

  const initialPostObject = {
    title: "",
    body: ""
  }
  const [post, setPost] = useState(initialPostObject)
  // const [title, setTitle] = useState('')
  // const bodyInputRef = useRef()

  const idFor_PostList = function* () {
    let lastId = 0
    postList.forEach(postDataset => { if (postDataset.id >= lastId) lastId = postDataset.id })
    while (true)
      yield ++lastId;
  }()

  const addNewPost = (event) => {
    event.preventDefault()

    setPostList(
      // postList.concat({
      //   id: idFor_PostList.next().value,
      //   title: title,
      //   body: bodyInputRef.current.value
      // })
      [...postList, {
        id: idFor_PostList.next().value,
        title: post.title,
        body: post.body //bodyInputRef.current.value
      }]
    )

    setPost(initialPostObject)
    // setTitle('')
    // bodyInputRef.current.value = ""
  }



  return (
    <div className="App">
      <form>

        {/* CONTROLLABLE COMPONENT */}
        <MyInput
          value={post.title}
          onChange={(event) => setPost({ ...post, title: event.target.value })}
          type="text"
          placeholder="post title" />

        {/* NONCONTROLLABLE COMPONENT */}
        <MyInput
          value={post.body}
          // ref={bodyInputRef}
          onChange={(event) => setPost({ ...post, body: event.target.value })}
          type="text"
          placeholder="post body" />
        <MyButton

          onClick={addNewPost}
        >
          SOME LONG TEXT
        </MyButton>

      </form>

      <PostList
        postList={postList}
        deletePostCommand={composeDeletePostCommand(postList, setPostList)}
        postListTitle={postListTitle} />
    </div>
  );
}

export default App;
