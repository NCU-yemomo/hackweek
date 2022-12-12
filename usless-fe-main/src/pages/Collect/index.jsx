import React,{useEffect} from 'react'
import {Outlet,useNavigate} from "react-router-dom"
import waoku from "../../svg/waoku.jpg"
import "./index.css"
//后期会放在zustand中
const data=[
  {
      id:1,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
  {
      id:2,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
  {
      id:3,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
  {
      id:4,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
  {
      id:5,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
  {
      id:6,
      name:"商品1",
      img:waoku,
      desc:"商品1的描述"
  },
]
export default function Collect() {
    const navigate=useNavigate()
    useEffect(()=>{
      if (data.length==0){
        navigate("empty")
      }
    })
  return (
    <div className="cs-Collect-x">
        <Outlet/>
    </div>
  )
}
