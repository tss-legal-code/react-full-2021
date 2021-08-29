import React from 'react'
import MyButton from './UI/button/MyButton'

const Post = ({ title, body, index, removePost }) => {
    return (
        <div className="post">
            <div className="post__content">

                <h1>{index}. {title}</h1>
                <div>
                    {body}
                </div>


            </div>

            <div className="post__btn">
                <MyButton onClick={removePost}>DELETE</MyButton>
            </div>

        </div>
    )
}

export default Post
