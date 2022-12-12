import React, { useEffect } from 'react'
import "./index.css"
import smile from "../../svg/笑脸_smiling-face.svg"
import love from "../../svg/喜欢_like.svg"
import upon from "../../svg/商品_commodity.svg"
import {useShowGuestMessageStore,useShowProductsUponStore,
        useShowProductsInfoStore} from "../../store/store"
import {Link} from "react-router-dom"
//我的店铺界面
export default function MyHome() {
  //商品数据
  const [datalist ,setDatalist]=React.useState([
    {
      id:1,
      content:"今天很开心",
      img:smile,
      sort:1
    },
    {
      id:2,
      content:"今天很开心",
      img:smile,
      sort:2
    },
    {
      id:3,
      content:"今天很开心",
      img:smile,
      sort:3
    },{
      id:4,
      content:"今天很开心",
      img:smile,
      sort:4
    },
    {
      id:5,
      content:"今天很开心",
      img:smile,
      sort:5
    },
    {
      id:6,
      content:"今天很开心",
      img:smile,
      sort:6
    }  
  ])
  //更改状态，hook钩子
  const [loveTimes,setLoveTimes]=React.useState(0)
  const setGuestMessageTrue=useShowGuestMessageStore(state=>state.setTrue)
  const setUponTrue=useShowProductsUponStore((state)=>state.setTrue)
  const setProductTrue=useShowProductsInfoStore(state=>state.setTrue)
  const setShowId=useShowProductsInfoStore(state=>state.setShowId)
  
  //函数部分
  //加载页面获取用户信息
  useEffect(()=>{
    let data
    async function getData(){
      const response=await fetch("https://api.hangyi.top/product",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      switch (response.status){
        case 200:
          data=await response.json()
          console.log(data)
          return
        case 404:
          data=await response.json()
          console.log("未找到")
      }
    }
    getData()
},[useShowProductsUponStore(state=>state.isShow)])
  //送花提醒消息（临时）
  function increaseShow(){
    setLoveTimes((loveTimes)=>loveTimes+1);
    setGuestMessageTrue()
    setTimeout(()=>{
      const element=document.getElementById("cs-GuestMessage-x")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  //提交商品按钮
  function productUpon(){
    //设置需要展示
    setUponTrue()
    setTimeout(()=>{
      const element=document.getElementById("cs-PostProducts-background")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  //展示商品卡片
  function showProduct(event){
    //只检测图片的点击，事件委托
    if (event.target.className!="cs-MyHome-content-img"){
      return
    }
    //设置本次卡片的图片，传递给store
    setProductTrue()
    setShowId(event.target.dataset.id)
    setTimeout(()=>{
      const element=document.getElementById("cs-ProductCard-background")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  return (
    <div className="cs-MyHome">
      {/*头部*/}
      <div className="cs-MyHome-header">
        <input type="text" placeholder="请输入你心仪的店铺名"/>
      </div>
      {/*内容*/}
      <Link  to="/product/store"><p className="cs-MyHome-store">仓库</p></Link>
      <div className="cs-MyHome-content" onClick={showProduct}>
        {/*展示小商铺内容*/}
        {datalist.map((item)=>{
          return (
            <div className="cs-MyHome-content-item" key={item.id}>
              <img src={item.img} alt="商品图片" className="cs-MyHome-content-img" data-id={`${item.sort}`}/>
              <p>{item.content}</p>
            </div>
          )
        })}
      </div>
      <div className="cs-MyHome-footer">
        <div className='cs-MyHome-love'>
          <img src={love} alt="喜欢" onClick={()=>{increaseShow()}}/>
          <div className="cs-MyHome-loveTimes-x">
            <p className="cs-MyHome-loveTimes">{loveTimes}</p>
          </div>
        </div>
        <div className='cs-MyHome-upon'>
          <img src={upon} alt="商品上传" onClick={productUpon}></img>
          <p>商品上传</p>
        </div>
      </div>
    </div>
  )
}
