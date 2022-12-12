import React ,{useEffect, useRef, useState}from 'react'
import { useNavigate } from 'react-router-dom'
import {userInfoStore} from "../../store/userStore"
import logo from "../../svg/logo.svg"
import showBackground from "../../svg/开屏界面.png"
import "./index.css"

export default function Login() {
  const usernameRef = useRef()
  const passwordRef=useRef()
  const backgroundRef=useRef()
  const checkNotice=useRef()
  const navigate = useNavigate()
  const [isShow,setIsShow]=useState(true)
  const userinfo=userInfoStore(state=>state.Info)
  const setUserInfo=userInfoStore(state=>state.setInfo) 
  useEffect(()=>{
    setTimeout(()=>{
      backgroundRef.current.style.opacity="0"
      setTimeout(()=>{
        setIsShow(false)
      },500)
    },1000)
  },[])
  //向后端提交用户名和密码
  const submit=async()=>{
    let data;
    const username=usernameRef.current.value
    const password=passwordRef.current.value
    if (!password || !username) {
      alert("请填写完整信息")
      return
    }
    if (!checkNotice.current.checked){
      alert("请勾选同意用户协议")
      return
    }
    const response=await fetch("https://api.hangyi.top/user/login",{
      method:"POST",
      body:JSON.stringify({
        username,
        password,
      })
    })
    switch (response.status){
      case 200:
        data=await response.json()
        console.log(data)
        localStorage.setItem("token",data.token)
          alert("登录成功")
          //设置zustand info
          setUserInfo({
            username,
            password
          })
          console.log(userinfo)
          navigate("/product")
          return
      case 400:
        data=await response.json()
        console.log(data)
        alert("用户名或密码错误")
        return
      }
      
    }
  const goRegis=()=>{
    navigate("/register")
  }
  const forgetPassword=()=>{
    navigate("/password")
  }
  return (
    <div className='cs-login-x'>
      <img src={logo} alt="logo"></img>
      <div className="cs-login-form">
        <div className="cs-login-username">
          <p>请输入用户名</p>
          <input  placeholder='用户名' type="text" ref={usernameRef}></input>
        </div>
        <div className="cs-login-password">
          <p>请输入密码</p>
          <input  placeholder="密码" type="password" ref={passwordRef}></input>
        </div>
        <button className="cs-login-submit" onClick={submit}>登录</button>
      </div>
      <div className="cs-login-func">
        <p onClick={forgetPassword}>忘记密码</p>
        <p><a src="#" onClick={goRegis}>快速注册</a></p>
      </div>
      <div className="cs-login-notice">
        <input type="checkbox" ref={checkNotice}></input>
        <p>登陆/注册无用商店代表已阅读《无用商店用户协议》</p>
      </div>
        {isShow?<img src={showBackground} className="cs-showBackground" ref={backgroundRef}></img>:<div></div>
        }
    </div>
    
  )
}
