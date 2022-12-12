import React from 'react'
import { useNavigate} from 'react-router-dom'
import {useShowProductsUponStore,
} from "../../../store/store"
import share from "../../../svg/分享欲 1.svg"
import "./index.css"
export default function CollectEmpty() {
  const setUponTrue=useShowProductsUponStore((state)=>state.setTrue)
  function productUpon(){
    //设置需要展示
    setUponTrue()
    setTimeout(()=>{
      const element=document.getElementById("cs-PostProducts-background")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  //展示商
  const navigate=useNavigate()
  //这里需要后端逻辑
  const add=()=>{
    productUpon()
    alert("已添加")
    navigate("/product/collect")
  }
  return (
    <div className="cs-Collect-empty">
      {/*店铺的虚拟形象*/}
      <div className="cs-Collect-visual-img-x">
        <img src={share} alt="idou"/>
      </div>
      <p>让分享欲成为浪漫的起点吧</p>
      <button className="cs-Collect-empty-btn" onClick={add}>点击添加商品</button>
    </div>
  )
}
