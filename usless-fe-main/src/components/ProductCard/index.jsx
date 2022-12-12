import React ,{useRef,useState}from 'react'
import smile from "../../svg/笑脸_smiling-face.svg"
import {useShowProductsInfoStore} from "../../store/store"
import {  Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import "./index.css"
//消息弹窗组件
export default function ProductCard() {
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
    const setProductCardFalse=useShowProductsInfoStore(state=>state.setFalse)
    const productX=useRef()
    const showId=useShowProductsInfoStore((state)=>state.showId)
    console.log(showId)
    //关闭窗口
    const back=()=>{
         productX.current.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
          setProductCardFalse()
        },1000)
    }
    const items = datalist.map((item, index) => (
      <Swiper.Item key={index}>
        <div className="cs-Product-scroll">
          <div className="cs-ProductCard-x"  >
            <div className='cs-ProductCard-img-x'>
              <img src={item.img} alt="展示的商品" className="cs-ProductCard-img" onClick={back}/>
              <p className="cs-ProductCard-title">记忆标题:{item.title}</p>
            </div>
            <div className='cs-ProductCard-content'>
              <p>记忆标题:{item.title}</p>
              <p>记忆描述:{item.content}</p>
              <button className="cs-ProductCard-button" onClick={back}>返回</button>
            </div>
            <p>左右滑动查看上/下件商品</p>
          </div>    
        </div>
      </Swiper.Item>
    ))
  return (
    <div className="cs-ProductCard-background " ref={productX} id="cs-ProductCard-background" >
      <Swiper loop defaultIndex={showId-1}>{items}</Swiper>
    </div>
    
  )
}
