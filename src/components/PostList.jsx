import React from 'react'
import Post from './Post'

const PostList = ({ postList, removePost, postListTitle }) => {

    if (postList.length) {
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
    return (
        <h1 style={{ textAlign: "center" }}>
            NO POSTS TO DISPLAY
        </h1>
    )
}

export default PostList