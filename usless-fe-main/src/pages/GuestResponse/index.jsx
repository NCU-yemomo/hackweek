import React,{useRef,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { Ellipsis } from 'antd-mobile'
import {useShowFooterStore} from "../../store/store"
import "./index.css"
import like from "../../svg/喜欢_like.svg"
import back from "../../svg/箭头左_arrow-left.svg"
import exchange from "../../svg/exchange.svg"

export default function GuestResponse() {
    //请求的商户数据，有些时候可能需要useEffect进行后端传递
    const box=useRef()
    const navigate=useNavigate()
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
    //隐藏底部导航栏
    const setFooterFalse=useShowFooterStore(state=>state.setFalse)
    const setFooterTrue=useShowFooterStore(state=>state.setTrue)
    useEffect(()=>{      
            setFooterFalse()
            return ()=>{
                setFooterTrue()
            }
    })
    //返回
    const backTo=()=>{
            navigate(`/product`)
    }
    //展示客户商品
    const reject=()=>{
        alert("太可惜捏")
        navigate(`/product/fail-exchange`)
    }
    const agree=()=>{
        alert("yes ")
        navigate(`/product/success-exchange`)
    }
    //展示的信封
    return (
    <div className="cs-GuestResponse-x" ref={box}>
        <div className="cs-Exchange-back" onClick={backTo}>
            <img alt="返回" src={back}></img>
            <p>返回</p>
        </div>
        <header className="cs-GuestResponse-header">
            
            <h1>交换申请</h1>
        </header>
        <div className="cs-GuestResponse-title">
            <p>亲爱的店主:</p>
            <p>    您好</p>
            <p>    我想用本店的：</p>
        </div>
        <div className="cs-GuestResponse-product">
            <div className='cs-GuestResponse-product-exchange'>
                <div className="cs-GuestResponse-exchange">
                    <img src={responseData.fromImg} alt="客人商品"></img>
                    <p>{responseData.fromTitle}</p>
                </div>
                    <img alt="交换" src={exchange}></img>
                <div className="cs-GuestResponse-exchange">
                    <img src={responseData.toImg} alt="商户商品"></img>
                    <p>{responseData.toTitle}</p>
                </div>
            </div>
            <h2>寄语：</h2>
            <div className="cs-GuestResponse-appraiseContent">
                <div className='cs-GuestResponse-content'>
                <Ellipsis
                    direction='end'
                    content={responseData.appraise}
                    expandText='倾听寄语'
                    collapseText='收起寄语'
                    rows={6}
                />
                </div>
            </div>
            <div className="cs-GuestResponse-button-x">
                <button className="cs-GuestResponse-button-agree" onClick={agree}>同意</button>
                <button className="cs-GuestResponse-button-reject" onClick={reject}>拒绝</button>
            </div>
        </div>
    </div>
  )
}
