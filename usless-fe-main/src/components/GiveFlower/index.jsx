import React from 'react'
import {useNavigate} from "react-router-dom"
import flower from "../../svg/送花标签.svg"
import back from "../../svg/花花返回界面.png"
import {useShowGiveFlowerStore} from "../../store/store"
import {userInfoStore} from "../../store/userStore"
import "./index.css"
//消息弹窗组件
export default function GiveFlower() {
    //id需要后端传递，找到对应的信件
    const id=2;
    const setGiveFlowerFalse=useShowGiveFlowerStore(state=>state.setFalse)
    const navigate=useNavigate()
    const info = userInfoStore(state => state.info)
    //uuid从后端传递，使用zustand综合管理员和用户的uuid
    //隐藏窗口
    const hide=()=>{
        async function giveFlower(){
          let data
          //uuid由后端传递，使用zustand综合管理员和用户的uuid
          const response = await fetch(`https://api.hangyi.top/user/flower/${info.uuid}`, {
            method: 'PUT',
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        switch (response.status){
          case 200:
            data=await response.json()
            alert(data.message) 
          default:
            data=await response.json()
            console.log(data.message) 
        }
      }
      giveFlower()
        toBack()
    }
    const toBack=()=>{
      const element=document.getElementById("cs-GiveFlower-x")
        element.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
            setGiveFlowerFalse()
            navigate(`/product`)
        },1000)
    }
  return (
    <div>
      <div className="cs-GiveFlower-x" id="cs-GiveFlower-x" >
        <img src={back} alt="返回" className="cs-GiveFlower-back" onClick={toBack}></img>
        <p className="cs-GiveFlower-text">送她一朵小红花</p>
        <img src={flower} alt="花花"></img>
        <button className="cs-GiveFlower-button" to={`guestResponse/${id}`} onClick={hide}>送出</button>
      </div>
    </div>
  )
}
