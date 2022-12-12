import React from 'react'
import {useNavigate} from "react-router-dom"
import {useShowGuestMessageStore} from "../../store/store"
import "./index.css"
//消息弹窗组件
export default function GuestMessage() {
    //id需要后端传递，找到对应的信件
    const id=2;
    const setGuestMessageFalse=useShowGuestMessageStore(state=>state.setFalse)
    const navigate=useNavigate()
    //隐藏窗口
    const hide=()=>{
        const element=document.getElementById("cs-GuestMessage-x")
        element.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
            setGuestMessageFalse()
            navigate(`/product/guest-response/${id}`)
        },1000)
    }
  return (
    <div>
      <div className="cs-GuestMessage-x" id="cs-GuestMessage-x" >
        <p className="cs-GuestMessage-text">叮咚,有新客人啦~</p>
        <button className="cs-GuestMessage-button" to={`guestResponse/${id}`} onClick={hide}>查看</button>
      </div>
    </div>
  )
}
