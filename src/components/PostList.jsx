import React from 'react'
import Post from './Post'

const PostList = ({ postList, removePost, postListTitle }) => {   

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
                            removePost={() => removePost(singlePost)}
                        />
                )
            }
        </div>
    )
}

export default PostList
