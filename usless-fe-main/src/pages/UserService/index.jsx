import React ,{useEffect,useState,useRef} from 'react'
import {useShowFooterStore} from "../../store/store"
import {nanoid} from "nanoid"
import servicer from "../../svg/小二客服.svg"
import smile from "../../svg/用户.svg"
import back from "../../svg/箭头左_arrow-left.svg"
import  {Avatar} from 'antd-mobile'
import "./index.css"
import { useNavigate } from 'react-router-dom'

//数据由后端传递，初始时可以存在store
const userData={
  header:smile,
  userName:"叶墨沫",
  nickname:"无用商店忠实用户"
}
export default function UserService() {
  const message=useRef()
  const [communicate,setCommunicate]=useState([
    { id:nanoid(),
      content:"您好,我想问一下无用商店有啥能用的嘛"
    }
  ])
  const navigate=useNavigate()
  const toBack=()=>navigate(-1)
  const submit=()=>{
    const info=message.current.value
    //异步
    setCommunicate([...communicate,{id:nanoid(),content:info}])
    setTimeout(()=>{
      window.scrollTo(0, document.documentElement.scrollHeight-document.documentElement.clientHeight)
      message.current.value=""
    },100)
  }
  //隐藏底部导航栏
  const setFooterFalse=useShowFooterStore(state=>state.setFalse)
  const setFooterTrue=useShowFooterStore(state=>state.setTrue)
  const toSubmit=(e)=>{
    //阻止默认事件

    if(e.keyCode===13){
      submit()
    }
  }
  useEffect(()=>{      
          setFooterFalse()
          return ()=>{
              setFooterTrue()
          }
  })
  return (
      <div className="cs-UserService-x">
      <img className="cs-UserService-back" src={back} alt="返回" onClick={toBack}></img>
      <div className="cs-UserService-header-x">
        <p>XX的店主小二</p>
        <img src={servicer} alt="商户"></img>
      </div>
      <p className="cs-UserService-notice">客服正在火速赶路中...</p>
      <div className="cs-UserService-service-x">
        <div className="cs-UserService-header">
          <Avatar src={servicer}/>
          <div  className="cs-UserService-service-text">
            <p className="cs-UserService-userName">万能的客服小二</p>
            <p className="cs-UserService-nickname">机器人</p>
          </div>
        </div>
        <div  className="cs-UserService-service-content">
          <p>您好，欢迎来到无用商店，我是万能的客服小二，有什么可以帮到您的吗？</p>
        </div>
      </div>

      {/*用户盒子区域，后续数组可能需要间断插入客服和用户盒子，先展示存储这个吧*/}
      {
        communicate.map((item)=>{
          return (
          <div className="cs-UserService-user-x" key={item.id}>
            <div className="cs-UserService-user-header">
              <Avatar src={smile}/>
              <div  className="cs-UserService-user-text ">
                <p className="cs-UserService-userName">{userData.userName}</p>
                <p className="cs-UserService-nickname">{userData.nickname}</p>
              </div>
            </div>
            <div  className="cs-UserService-service-content">
              <p>{item.content}</p>
            </div>
          </div>
          )
        })
      }

        <div className="cs-UserService-bottom">
          <input type="text" className="cs-UserService-input" placeholder="请输入您的问题" ref={message} onKeyDown={toSubmit}/>
          <button className='cs-UserService-submit' onClick={submit}>提交</button>
        </div>
      
    </div>
  )
}
