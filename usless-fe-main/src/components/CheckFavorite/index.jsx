import React,{useRef,useState} from 'react'
import {useShowCheckFavoriteStore,useMasksStore} from "../../store/store"
import {Mask} from 'antd-mobile'
import smile from "../../svg/笑脸_smiling-face.svg"
import "./index.css"
//消息弹窗组件
const checkData=[
  {sort:1,img:smile,content:"温馨"},
  {sort:2,img:smile,content:"温馨"},
  {sort:3,img:smile,content:"温馨"},
  {sort:4,img:smile,content:"温馨"},
  {sort:5,img:smile,content:"温馨"},
  {sort:6,img:smile,content:"温馨"},
  {sort:7,img:smile,content:"温馨"},
  {sort:8,img:smile,content:"温馨"},
  {sort:9,img:smile,content:"温馨"},
]
export default function CheckFavorite() {
    const setCheckFavoriteFalse=useShowCheckFavoriteStore(state=>state.setFalse)
    //隐藏窗口
    const check=useRef()
    const [visible, setVisible] = useState(true)
    const hide=()=>{
        const element=document.getElementById("cs-CheckFavorite-x")
        element.style.transform="scale(0)"
        //延迟一清除
        setTimeout(()=>{
            setCheckFavoriteFalse()
        },1000)
    }
    const focus=(event)=>{
      console.log(check.current)
      //锁定当前点击的checkbox
      check.current=event.target.closest(".cs-CheckFavorite-check-item").children[2]
      check.current.checked=!check.current.checked
    }
  return (
    <div className="cs-CheckFavorite-x" id="cs-CheckFavorite-x" >
      <h1>请感兴趣的话题</h1>
      <p>私人订制的无用商店，以后可随时更改</p>
      <div className="cs-CheckFavorite-check">
      { checkData.map((item,index)=>{
        return(
          <div className="cs-CheckFavorite-check-item" key={index} onClick={focus}>
            <img src={item.img} alt="选项图片"/>
            <p>{item.content}</p>
            <input type="checkbox"
             className='cs-CheckFavorite-checkbox'/>
          </div>
        )
      })
      }
      </div>
      <button className="cs-CheckFavorite-button"  onClick={hide}>下一步</button>
    </div>
  )
}
