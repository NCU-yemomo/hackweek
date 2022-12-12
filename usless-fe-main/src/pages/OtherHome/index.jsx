import React, { useEffect } from 'react'
import "./index.css"
import smile from "../../svg/笑脸_smiling-face.svg"
import love from "../../svg/喜欢_like.svg"
import {useShowGuestMessageStore,useShowProductsOthersInfoStore,useShowGiveFlowerStore} from "../../store/store"
import {userInfoStore} from '../../store/userStore'
import cuteHorse from "../../svg/cute_horse.png"
import rabbit from "../../svg/cute_rabbit.svg"
import flower from "../../svg/花篮.svg"
//我的店铺界面
export default function OtherHome() {
  //商品数据
  const [datalist ,setDatalist]=React.useState([
    {
      id:1,
      content:"今天很开心",
      img:cuteHorse,
      isBest:true,
    },
    {
      id:2,
      content:"今天很开心",
      img:smile,
      isBest:false,
    },
    {
      id:3,
      content:"今天很开心",
      img:smile,
      isBest:false,
    },{
      id:4,
      content:"今天很开心",
      img:smile,
      isBest:false,
    },
    {
      id:5,
      content:"今天很开心",
      img:smile,
      isBest:false,
    },
    {
      id:6,
      content:"今天很开心",
      img:smile,
      isBest:false,
    }  
  ])
  const [otherInfo,setOtherInfo]=React.useState({})
  const [loveTimes,setLoveTimes]=React.useState(0)
  //从仓库获取对应的需要的状态和API
  //商品卡片的仓库
  const setGuestMessageTrue=useShowGuestMessageStore(state=>state.setTrue)
  const setGiveFlowerTrue=useShowGiveFlowerStore(state=>state.setTrue)
  const setProductTrue=useShowProductsOthersInfoStore(state=>state.setTrue)
  const setShowId=useShowProductsOthersInfoStore(state=>state.setShowId)
  const info = userInfoStore(state => state.info)
  //函数事件部分
  //增加点赞数 
  function increaseShow(){
    // setLoveTimes((loveTimes)=>loveTimes+1);
    // setGuestMessageTrue()
    // setTimeout(()=>{
    //   const element=document.getElementById("cs-GuestMessage-x")
    //   console.log(element)
    //   element.style.transform="scale(1)"
    // },500)
    setLoveTimes((loveTimes)=>loveTimes+1);
    setGiveFlowerTrue()
    setTimeout(()=>{
      const element=document.getElementById("cs-GiveFlower-x")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  //展示商品卡片
  function showProduct(event){
    //只检测图片的点击，事件委托
    if (event.target.className!="cs-OthersHome-content-img"){
      return
    }
    //设置本次卡片的图片，传递给store
    setProductTrue()
    setShowId(event.target.dataset.id)
    setTimeout(()=>{
      const element=document.getElementById("cs-ProductCardOther-background")
      console.log(element)
      element.style.transform="scale(1)"
    },500)
  }
  //进入时随机展示
  useEffect(()=>{
    checkRandom()
  },[])
  const checkRandom=()=>{
    async function getRandom(){
      let data
      const res=await fetch("https://api.hangyi.top/memory/random",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      switch(res.status){
        case 200:
          data=await res.json()
          console.log(data)
          setOtherInfo(data)
          alert("随机切换成功")
          break
        default:
          data=await res.json()
          alert(data.message)
      }
    }
    getRandom()
  }
  return (
    <div className="cs-OtherHome">
      <button onClick={checkRandom} className="cs-OtherHome-button">切换商铺</button>
      {/*头部*/}
      <div className="cs-OtherHome-header">
      {/*这里准备接后端数据*/}
        <p>马鬼小铺</p>
      </div>
      <div className="cs-OtherHome-best-product-x">
         <img src={datalist.filter((item)=>item.isBest)[0].img} alt="店铺图片" className="cs-OhterHome-best-product"/>
      </div>
      {/*内容*/}
      <div className="cs-OtherHome-content" onClick={showProduct}>
        {/*展示小商铺内容*/}
        {datalist.filter((item)=>!item.isBest).map((item)=>{
          return (
            <div className="cs-OtherHome-content-item" key={item.id}>
              <img src={item.img} alt="商品图片" className="cs-OthersHome-content-img" data-id={item.id}/>
              <p>{item.content}</p>
            </div>
          )
        })}
        <img className="cs-OtherHome-rabbit" src={rabbit} alt="兔子"></img>
      </div>
      <div className="cs-OtherHome-footer">
        <div className='cs-OtherHome-love'>
          <img src={flower} alt="喜欢" onClick={()=>{increaseShow()}}/>
          <div className="cs-OtherHome-loveTimes-x">
            <p className="cs-OtherHome-loveTimes">{loveTimes}</p>
          </div>
        </div>
      </div>
    </div>
  )
      }
