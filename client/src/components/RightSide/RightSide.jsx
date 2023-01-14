import React,{useState} from 'react';
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard"
import { Link } from 'react-router-dom';

import Home from '../../img/home.png';
import Comment from '../../img/comment.png';
import Noti from '../../img/noti.png';
import { AiOutlineSetting } from "react-icons/ai";
import ShareModal from '../ShareModal/ShareModal';


function RightSide() {

  const[modalOpened,setModalOpened] = useState(false)

  return (
    <div className='RightSide'>
        <div className='navIcons'>
          <Link to='../home'><img src={Home} alt="" /></Link>
            <AiOutlineSetting className='AiIcon'/>
            <img src={Noti} alt="" />
           <Link to="../chat"><img src={Comment} alt="" /></Link>
        </div>

    <TrendCard/>

    <button className='button r-button' onClick={()=>{setModalOpened(true)}}> 
        Share
    </button>

    <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>

    </div>
  )
}

export default RightSide