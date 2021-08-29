import React from 'react'

const Post = ({ title, body, index, deletePostCommand }) => {
    return (
        <div className="post">
            <div className="post__content">

                <h1>{index}. {title}</h1>
                <div>
                    {body}
                </div>


            </div>

            <div className="post__btn">
                <button onClick={deletePostCommand}>DELETE</button>
            </div>

        </div>
    )
}

export default Post
