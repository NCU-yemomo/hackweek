import React from 'react'
import waoku from "../../../svg/waoku.jpg"
import "./index.css"
//用户数据，用于测试，需要id，商品名，商品图片，商品描述,后面从后端获取时可能会放在zustand
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
export default function CollectFull() {
  return (
    <div className="cs-Collect-full">
        {data.map((item)=>{
            return (
                <div className="cs-Collect-full-item" key={
                    item.id
                }>
                    <img src={item.img} alt="item.name"/>
                    <p>{item.name}</p>
                </div>
            )
        })}
    </div>
  )
}
