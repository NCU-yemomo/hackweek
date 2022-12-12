import React ,{useRef,useState}from 'react'
import smile from "../../svg/笑脸_smiling-face.svg"
import {useShowProductsOthersInfoStore} from "../../store/store"
import close from "../../svg/关闭_close.svg"
import {  Swiper } from 'antd-mobile'
//Ref的使用处
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import "./index.css"
import { useNavigate } from 'react-router-dom'
import storeLogo from "../../svg/无用商店织毛衣.svg"
import share from "../../svg/分享他人.svg"
import cat from "../../svg/趴猫.svg"

//消息弹窗组件
export default function ProductCardOther() {
    const [datalist ,setDatalist]=React.useState([
      {
        id:1,
        content:"今天很开心",
        img:smile,
        title:"记忆1"
      },
      {
        id:2,
        content:"今天很开心",
        img:smile,
        title:"记忆2"
      },
      {
        id:3,
        content:"今天很开心",
        img:smile,
        title:"记忆3"
      },{
        id:4,
        content:"今天很开心",
        img:smile,
        title:"记忆4"
      },
      {
        id:5,
        content:"今天很开心",
        img:smile,
        title:"记忆5"
      },
      {
        id:6,
        content:"今天很开心",
        img:smile,
        title:"记忆6"
      }  
    ])
   
    
    //设置取消按钮
    const setProductCardOtherFalse=useShowProductsOthersInfoStore(state=>state.setFalse)
    const showId=useShowProductsOthersInfoStore((state)=>state.showId)
    const productX=useRef()
    const navigate=useNavigate()
    //关闭窗口
    const back=()=>{
         productX.current.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
          setProductCardOtherFalse()
        },1000)
    }
    const exchange=()=>{
      //交换需要和后端对接
      console.log("交换")
      back()
      navigate(`/product/other-home/2/exchange`)
    }
    const collect=()=>{
      //收藏需要和后端对接
      console.log("收藏")
    }
    const items = datalist.map((item, index) => (
      <Swiper.Item key={index}>
        <div className="cs-Product-scroll">
          <div className="cs-ProductCardOther-x"  >
            <img src={cat} alt="趴猫" className="cs-ProductCardOther-cat"/>
            <div className='cs-ProductCardOther-img-x'>
              <img src={item.img} alt="展示的商品" className="cs-ProductCardOther-img" onClick={back}/>
              <p className="cs-ProductCardOther-title">记忆标题:{item.title}</p>
            </div>
            
            <div className='cs-ProductCardOther-content'>
              <div className="cs-ProductCardOther-content-func">
                <p>{item.title}</p>
                {/*此处为随机传id*/}
                <img src={share} alt="share" onClick={()=>{navigate("/product/share/"+item.id);back()}}></img>
              </div>
              <div className="cs-ProductCardOther-content-button">
                <button className="cs-ProductCardOther-button" onClick={collect}>收藏</button>
                <button className="cs-ProductCardOther-button" onClick={exchange}>交换</button>
              </div>
            </div>
            <img src={close} alt="关闭" className="cs-ProductCardOther-close" onClick={back}/>
            <p>左右滑动查看上/下件商品</p>
          </div>
          <img src={storeLogo} alt="logo" className="cs-ProductCardOther-footer-img"></img> 
        </div>
      </Swiper.Item>
    ))
  return (
    <div className="cs-ProductCardOther-background " ref={productX} id="cs-ProductCardOther-background" >
      <Swiper loop defaultIndex={showId-1}>{items}</Swiper>
    </div>
    
  )
}
