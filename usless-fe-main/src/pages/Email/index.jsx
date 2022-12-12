import React,{useEffect} from 'react'
import {useShowFooterStore} from "../../store/store"

import "./index.css"
import smile from "../../svg/waoku.jpg"
import back from "../../svg/左_left brown.svg"
import { useNavigate } from 'react-router-dom'
export default function Email() {
  const setFooterFalse=useShowFooterStore(state=>state.setFalse)
  const setFooterTrue=useShowFooterStore(state=>state.setTrue)
  const navigate=useNavigate()
  const data=[
    {
      id:1,
      content:"您有新的交易消息",
      img:smile
    },
    {
      id:2,
      content:"您有新的交易消息",
      img:smile
    },
    {
      id:3,
      content:"您有新的鲜花消息",
      img:smile
    },
  ] 
    useEffect(()=>{      
      setFooterFalse()
      return ()=>{
          setFooterTrue()
      }
    })

    //这个副作用需要打开时找后端要data
    useEffect(()=>{

    })
    const toBack=()=>{
      navigate(-1)
    }
  return (
    <div className="cs-Email-x">
      <div className="cs-Email-back" onClick={toBack}>
        <img src={back} alt="返回"></img>
        <p>返回</p>
      </div>
      <div className="cs-Email-header">
        <p>消息通知</p>
      </div>
      <div className="cs-Email-content">
        <div className="cs-Email-title">
          <p>交易通知</p>
        </div>
        {
          data.map((item)=>{
            return (
            <div className="cs-Email-item" key={item.id}>
                <p>{item.content}</p>
                <div className="cs-Email-user">
                  <img src={item.img} alt="头像"></img>
                  <p>XX店主</p>
                </div>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}
