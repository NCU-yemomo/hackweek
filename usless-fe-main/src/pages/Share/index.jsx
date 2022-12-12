import React,{useRef,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {useShowFooterStore} from "../../store/store"
import "./index.css"
import like from "../../svg/喜欢_like.svg"
import back from "../../svg/箭头左_arrow-left.svg"
import close from "../../svg/关闭_close.svg"

import picture from "../../svg/share/图片.png"
import text from "../../svg/share/文字.svg"
import mood from "../../svg/share/心.svg"
import position from "../../svg/share/位置.svg"


export default function Share() {
    //请求的商户数据，有些时候可能需要useEffect进行后端传递
    const box=useRef()
    const navigate=useNavigate()
    const setFooterFalse=useShowFooterStore(state=>state.setFalse)
    const setFooterTrue=useShowFooterStore(state=>state.setTrue)
    useEffect(()=>{      
            setFooterFalse()
            return ()=>{
                setFooterTrue()
            }
    })
    const responseData={
        //from=客户，to=商户
            fromId:2,
            toId:1,
            appraise:"你的商品太棒了,我好想和你交换捏啊！！！,！！你的商品太棒了,我好想和你交换捏啊！！！！！,你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！你的商品太棒了,我好想和你交换捏啊！！！！！",
            fromTitle:"小爱心",
            toTitle:"小爱心",
            fromImg:like,
            toImg:like,
    }
    //返回
    const backTo=()=>{
            navigate(`/product`)
    }
    //展示客户商品
    const share=()=>{
        alert("已分享")
        navigate(`/product/home`)
    }
    //展示的信封
    return (
    <div className="cs-Share-x" ref={box}>
        <img alt="返回" src={back} onClick={backTo}></img>
        <header className="cs-Share-header">
            <h1>分享物品卡片🎆</h1>
        </header>
        <div className="cs-Share-product">
            <img src={close} alt="用户头像" className="cs-Share-product-card-left"></img>
            <img src={close} alt="用户头像" className="cs-Share-product-card-right"></img>
            <div className='cs-Share-product-share'>
                <div className="cs-Share-share">
                    <img src={responseData.toImg} alt="商户商品"></img>
                    <p>{responseData.toTitle}</p>
                </div>
            </div>
        </div>
        <div className="cs-Share-check-icon-x">
            <div className="cs-Share-check-icon">
                <img src={picture} alt="图片"></img>
                <p>图片</p>
            </div>
            <div className="cs-Share-check-icon">
                <img src={text} alt="文字"></img>
                <p>文字</p>
            </div>
            <div className="cs-Share-check-icon">
                <img src={mood} alt="心情"></img>
                <p>心情</p>
            </div>
            <div className="cs-Share-check-icon">
                <img src={position} alt="位置"></img>
                <p>位置</p>
            </div>
        </div>
                <button className="cs-Share-button-ensure" onClick={share}>点击分享</button>
    </div>
  )
}
