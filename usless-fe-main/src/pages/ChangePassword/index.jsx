import React ,{useEffect, useRef, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import {userInfoStore} from "../../store/userStore"
import logo from "../../svg/logo.svg"
import showBackground from "../../svg/打开背景.svg"
import "./index.css"

export default function ChangePassword() {
  const usernameRef = useRef()
  const passwordOldRef=useRef()
  const passwordNewRef=useRef()
  const backgroundRef=useRef()
  const navigate = useNavigate()
  const userinfo=userInfoStore(state=>state.Info)
  const setUserInfo=userInfoStore(state=>state.setInfo) 
  //向后端提交用户名和密码
  const submit=async()=>{
    let data;
    const username=usernameRef.current.value
    const oldPassword=passwordOldRef.current.value
    const newPassword=passwordNewRef.current.value
    if (!oldPassword || !username || !newPassword) {
      alert("请填写完整信息")
      return
    }
    if (oldPassword===newPassword){
      alert("新旧密码不能相同")
      return
    }
    const response=await fetch("https://api.hangyi.top/user/password",{
      method:"PUT",
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify({
        oldPassword,
        newPassword,
      })
    })
    switch (response.status){
      case 200:
        data=await response.json()
        console.log(data)
          alert(data.message)
          //设置zustand info
          setUserInfo({
            username,
            password:newPassword
          })
          console.log(userinfo)
          navigate("/product")
          return
      case 403:
        data=await response.json()
        console.log(data)
        alert(data.message)
        return
      }
      
    }
  const goRegis=()=>{
    navigate("/register")
  }
  return (
    <div className='cs-ChangePassword-x'>
      <h1>Welcome</h1>
      <img src={logo} alt="logo"></img>
      <div className="cs-ChangePassword-form">
        <div className="cs-ChangePassword-username">
          <p>请输入用户名</p>
          <input  placeholder='用户名' type="text" ref={usernameRef}></input>
        </div>
        <div className="cs-ChangePassword-password">
          <p>请输入旧密码</p>
          <input  placeholder="密码" type="password" ref={passwordOldRef}></input>
        </div>
        <div className="cs-ChangePassword-password">
          <p>请输入新密码</p>
          <input  placeholder="密码" type="password" ref={passwordNewRef}></input>
        </div>
        <button className="cs-ChangePassword-submit" onClick={submit}>登录</button>
      </div>
      <div className="cs-ChangePassword-func">
        <p onClick={()=>navigate("/login")}>去登录</p>
        <p>快速<a src="#" onClick={goRegis}>注册</a></p>
      </div>
    </div>
    
  )
}
