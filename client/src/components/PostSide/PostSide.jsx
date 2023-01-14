import React from 'react'
import PostShare from '../../components/PostShare/PostShare'
import Posts from '../Posts/Posts'

import "./PostSide.css"

function PostSide() {
  return (
    <div className='PostSide'>
        <PostShare/>
        <Posts/>
    </div>
  )
}

export default PostSide