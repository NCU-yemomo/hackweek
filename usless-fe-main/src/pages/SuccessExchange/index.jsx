import React,{useRef,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { Ellipsis } from 'antd-mobile'
import {useShowFooterStore} from "../../store/store"
import "./index.css"
import like from "../../svg/喜欢_like.svg"
import back from "../../svg/箭头左_arrow-left.svg"
import storeLogo from "../../svg/无用商店织毛衣.svg"
import share from "../../svg/分享他人.svg"
export default function SuccessExchange() {
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
            navigate(`/product/other-home/${responseData.fromId}}`)
    }
    //展示客户商品
    const ensure=()=>{
        alert("yes ")
        navigate(`/product`)
    }
    //展示的信封
    return (
    <div className="cs-SuccessExchange-x" ref={box}>
        <img alt="返回" src={back} onClick={backTo}></img>
        <header className="cs-SuccessExchange-header">
            <h1>交换成功🎆</h1>
        </header>
        <div className="cs-SuccessExchange-product">
            <div className='cs-SuccessExchange-product-exchange'>
                <div className="cs-SuccessExchange-exchange">
                    <img src={responseData.toImg} alt="商户商品"></img>
                    <p>{responseData.toTitle}</p>
                </div>
            </div>
            <div className="cs-SuccessExchange-notice">
                <p>恭喜,美好交换成功</p>
                <img src={share} alt="分享" onClick={()=>navigate("/product/share/"+responseData.toId)}></img>
            </div>
            <h2>寄语：</h2>
            <div className="cs-SuccessExchange-appraiseContent">
                <div className='cs-SuccessExchange-content'>
                <Ellipsis
                    direction='end'
                    content={responseData.appraise}
                    expandText='倾听寄语'
                    collapseText='收起寄语'
                    rows={2}
                />
                </div>
            </div>
            <div className="cs-SuccessExchange-button-x">
                <button className="cs-SuccessExchange-button-ensure" onClick={ensure}>确定</button>
            </div>
            <img src={storeLogo} alt="商店logo"></img>
        </div>
    </div>
  )
}
