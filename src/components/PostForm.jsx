import React, { useState } from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'

const PostForm = ({ addPost }) => {

    const initialPostObject = {
        title: "",
        body: ""
    }
    const [post, setPost] = useState(initialPostObject)

    

    const sendAddPost = (event) => {
        event.preventDefault()
        addPost({
            title: post.title,
            body: post.body
        })
        setPost(initialPostObject)
    }

    return (

        <form>

            <MyInput
                value={post.title}
                onChange={(event) => setPost({ ...post, title: event.target.value })}
                type="text"
                placeholder="post title"
            />
            <MyInput
                value={post.body}
                onChange={(event) => setPost({ ...post, body: event.target.value })}
                type="text"
                placeholder="post body"
            />
            <MyButton
                onClick={sendAddPost }
            >
            SOME LONG TEXT
            </MyButton>
        </form >
    )
}

export default PostForm
