import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {userInfoStore} from '../../store/userStore'
import smile from "../../svg/笑脸_smiling-face.svg"
import next from "../../svg/right_next.svg"
import "./index.css"
export default function MyInfo() {
    const navigate=useNavigate()
    const info=userInfoStore(state=>state.info)
    console.log(info)
    const toSetting=()=>{
        navigate('/product/setting/3')
    }
    const toHome=()=>{
        navigate('/product/home')
    }
    // useEffect(()=>{
    //     async function getInfo(){
    //         let dataUser
    //         const response =await fetch("https://api.hangyi.top/user/info",{
    //             method:"GET",
    //             headers:{
    //                 Authorization:`Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         switch(response.status){
    //             case 200:
    //                 dataUser=await response.json()
    //                 setInfo(dataUser.data)
                    
    //                 break;
    //             default:
    //                 dataUser=await response.json()
    //                 alert(dataUser.message)
    //         }
    // }
    // getInfo()
    // },[])
  return (
    <div className="cs-MyInfo-x">
        <div className='cs-MyInfo-title-x'>
            <h1 className="cs-MyInfo-title" >我的</h1>
        </div>
        <div className="cs-MyInfo-card-x">
            <img src={smile} alt="头像"  className="cs-MyInfo-card-img"/>
            <div className="cs-MyInfo-card-info">
                <p className="cs-MyInfo-card-info-name">{info.username}</p>
                <p className="cs-MyInfo-card-info-id">ID:123456</p>
            </div>
        </div>
        <div className="cs-MyInfo-select-x">
            <div className="cs-MyInfo-select-item">
                <p>{info.shopName==="" ? "未命名":info.shopName}的铺子</p>
                <img src={next} alt="go" onClick={toHome}/>
            </div>
            <div className="cs-MyInfo-select-item">
                <p>设置</p>
                <img src={next} alt="go" onClick={toSetting}/>
            </div>
        </div>
    </div>
  )
}
