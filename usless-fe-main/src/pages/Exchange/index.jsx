import React,{useEffect, useRef,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { TextArea } from 'antd-mobile'
import {useShowFooterStore,} from "../../store/store"
import "./index.css"
import like from "../../svg/喜欢_like.svg"
import back from "../../svg/左_left brown.svg"
import exchange from "../../svg/exchange.svg"

export default function Exchange() {
    //请求的商户数据，有些时候可能需要useEffect进行后端传递
    const box=useRef()
    const navigate=useNavigate()
    const [value,setValue]=useState("")
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
    const setFooterFalse=useShowFooterStore(state=>state.setFalse)
    const setFooterTrue=useShowFooterStore(state=>state.setTrue)
    
    useEffect(()=>{      
            setFooterFalse()
            return ()=>{
                setFooterTrue()
            }
    })
    const backTo=()=>{
            navigate(`/product/other-home/${responseData.fromId}}`)
    }
    //展示客户商品
    const submit=()=>{
        alert("已上传")
        navigate(`/product/other-home/${responseData.fromId}}`)
    }
    //展示的信封
    return (
    <div className="cs-Exchange-x" ref={box}>
        <div className="cs-Exchange-back" onClick={backTo}>
            <img alt="返回" src={back} ></img>
            <p>返回</p>
        </div>
        <header className="cs-Exchange-header">
            
            <h1>申请交换</h1>
        </header>
        <div className="cs-Exchange-title">
            <p>亲爱的店主:</p>
            <p>    您好</p>
            <p>    我想用本店的：</p>
        </div>
        <div className="cs-Exchange-product">
            <div className='cs-Exchange-product-exchange'>
                <div className="cs-Exchange-exchange">
                    <img src={responseData.fromImg} alt="客人商品"></img>
                    <p>{responseData.fromTitle}</p>
                </div>
                    <img alt="交换" src={exchange}></img>
                <div className="cs-Exchange-exchange">
                    <img src={responseData.toImg} alt="商户商品"></img>
                    <p>{responseData.toTitle}</p>
                </div>
            </div>
            <h2>寄语：</h2>
            <div className="cs-Exchange-appraiseContent">
                <TextArea
                    placeholder='在这里讲讲商品背后的故事，拍摄那天发生,了什么，你的心情如何。也可以给店长送上祝福哦~'
                    value={value}
                    onChange={val => {
                    setValue(val)
                }}
                    autoSize={{ minRows: 7, maxRows:7 }}
                    style={{
                        "--font-size":"16px",
                        "--placeholder-color":"rgba(0, 0, 0, 0.45)"

                    }}
                />
            </div>
            <div className="cs-Exchange-button-x">
                <button className="cs-Exchange-button-submit" onClick={submit}>发送申请</button>
            </div>
        </div>
        
    </div>
  )
}
