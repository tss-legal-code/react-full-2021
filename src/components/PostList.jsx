import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
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

                <TransitionGroup>
                    {postList
                        .map(
                            (singlePost, index) =>
                                <CSSTransition
                                    key={singlePost.id}
                                    timeout = {500}
                                    classNames = "trans"
                                >
                                    <Post
                                        index={index + 1}
                                        title={singlePost.title}
                                        body={singlePost.body}
                                        removePost={() => removePost(singlePost)}
                                    />
                                </CSSTransition>
                        )
                    }
                </TransitionGroup>
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