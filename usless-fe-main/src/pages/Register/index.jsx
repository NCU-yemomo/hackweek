import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../svg/login/welcome 1.svg"
import "./index.css"

export default function Register() {
  const usernameRef = useRef()
  const passwordRef=useRef()
  const checkNotice=useRef()
  const passwordEnsureRef=useRef()
  const navigate = useNavigate()
  
  //向后端提交用户名和密码
  const submit=async()=>{
    let data;
    console.log(usernameRef,passwordRef,passwordEnsureRef)
    const username=usernameRef.current.value
    const password=passwordRef.current.value
    const passwordEnsure=passwordEnsureRef.current.value
    if (!password || !username || !passwordEnsure) {
      alert("请填写完整信息")
      return
    }
    if (password!==passwordEnsure) {
      alert("两次密码不一致")
      return
    }
    if (!checkNotice.current.checked){
      alert("请勾选同意用户协议")
      return
    }
    const response=await fetch("https://api.hangyi.top/user/register",{
      method:"POST",
      body:JSON.stringify({
        username,
        password
      })
    })
    console.log(response.status)
    switch(response.status){
      case 201:
        data=await response.json()
        console.log(data)
        alert("注册成功")
        navigate("/success-regis")
        return
      case 400:
        data=await response.json()
        console.log(data)
        return
    }
    }
  
  const goLogin=()=>{
    navigate("/login")
  }

  return (
    <div className='cs-regis-x'>
    <img src={logo} alt="logo"></img>
    <div className="cs-regis-form">
      <input className="cs-regis-username" placeholder='用户名' type="text" ref={usernameRef}></input>
      <input className="cs-regis-password" placeholder="密码" type="password" ref={passwordRef}></input>
      <input className="cs-regis-password-ensure" placeholder="确认密码" type="password" ref={passwordEnsureRef}></input>
      <button className="cs-regis-submit" onClick={submit}>注册</button>
      <p >已有帐号?去<a onClick={goLogin}>登陆</a></p>
    </div>
    <div className="cs-regis-notice">
        <input type="checkbox" ref={checkNotice}></input>
        <p>登陆/注册无用商店代表已阅读《无用商店用户协议》</p>
      </div>
  </div>
  )
  }