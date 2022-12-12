import React,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {useShowFooterStore} from "../../store/store"
import right from "../../svg/right_next.svg"
import back from "../../svg/箭头左_arrow-left.svg"

import "./index.css"
export default function Setting() {
    const navigate=useNavigate()
    const toBack=()=>{
        navigate(-1)
    }
    //隐藏底部导航栏
    const setFooterFalse=useShowFooterStore(state=>state.setFalse)
    const setFooterTrue=useShowFooterStore(state=>state.setTrue)
    useEffect(()=>{      
            setFooterFalse()
            return ()=>{
                setFooterTrue()
            }
    })
    const toUserService=()=>navigate("/product/user-service")
  return (
    <div className="cs-Setting-x">
        <img src={back} alt="返回" onClick={toBack} className="cs-Setting-back"/>
        <div className='cs-Setting-title-x'>
            <h1 className="cs-Setting-title" >设置</h1>
        </div>
        <div className="cs-Setting-select-x">
            <div className="cs-Setting-select-item">
                <p>个人资料</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p>账号设置</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p></p>
            </div>
            <div className="cs-Setting-select-item">
                <p>关于无用商店</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p>给我们评价</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p onClick={toUserService}>反馈中心</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p>无用商店协议</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p>无用商店协议</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p>私信屏蔽</p>
                <img src={right} alt="go"/>
            </div>
            <div className="cs-Setting-select-item">
                <p></p>
            </div>
            <div className="cs-Setting-select-item">
                <p>清空缓存</p>
                <p>13MB</p>
            </div>
            <div className="cs-Setting-select-item">
                <p>退出登录</p>
                <img src={right} alt="go"/>
            </div>
    </div>
    </div>
  )
}
