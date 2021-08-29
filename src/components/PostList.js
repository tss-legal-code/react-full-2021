import React from 'react'
import Post from './Post'

const PostList = ({ postList, deletePostCommand, postListTitle }) => {
    return (
        <div>
            <h1
                style={{ textAlign: 'center' }}
            >
                {postListTitle}
            </h1>

            {postList
                .map(
                    (singlePost, index) =>
                        <Post
                            index={index + 1}
                            key={singlePost.id}
                            title={singlePost.title}
                            body={singlePost.body}
                            deletePostCommand={() => deletePostCommand(singlePost.id)}
                        />
                )
            }
        </div>
    )
}

export default PostList
