import React ,{useRef,useState}from 'react'
import smile from "../../svg/笑脸_smiling-face.svg"
import {useShowProductsInfoStore} from "../../store/store"
import { Button, Space, Swiper, Toast } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import "./index.css"
//消息弹窗组件
export default function ProductCard() {
    const [datalist ,setDatalist]=React.useState([
      {
        id:1,
        content:"今天很开心",
        img:smile,
      },
      {
        id:2,
        content:"今天很开心",
        img:smile,
      },
      {
        id:3,
        content:"今天很开心",
        img:smile,
      },{
        id:4,
        content:"今天很开心",
        img:smile,
      },
      {
        id:5,
        content:"今天很开心",
        img:smile,
      },
      {
        id:6,
        content:"今天很开心",
        img:smile,
      }  
    ])
    // const items = datalist.map((item, index) => (
    //   <Swiper.Item key={index}>
    //     <div
    //       className={styles.content}
    //       style={{ background: }}
    //       onClick={() => {
    //         Toast.show(`你点击了卡片 ${index + 1}`)
    //       }}
    //     >
    //     </div>
    //   </Swiper.Item>
    // ))
    
    //设置取消按钮
    const setProductCardFalse=useShowProductsInfoStore(state=>state.setFalse)
    const productX=useRef()
    const showId=useShowProductsInfoStore((state)=>state.showId)
    const show=datalist.filter((item)=>item.id===showId)[0]
    console.log(show)
    //关闭窗口
    const back=()=>{
         productX.current.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
          setProductCardFalse()
        },1000)
    }
   
  return (
    <div className="cs-ProductCard-background " ref={productX} id="cs-ProductCard-background" >
      <div className="cs-ProductCard-x"  >
        <div className='.cs-ProductCard-img-x'>
          <img src={show.img} alt="展示的商品" className="cs-ProductCard-img" onClick={back}/>
        </div>
        <p>记忆标题:{show.content}</p>
      </div>
      <div className='cs-ProductCard-content'>
        <p>记忆标题:{showId}</p>
        <p>记忆描述:{show.content}</p>
        <button className="cs-ProductCard-button" onClick={back}>返回</button>
      </div>
    </div>
    
  )
}
