import React from 'react'
import "./index.css"
import reject from "../../svg/Draw/错 1.svg"
import accept from "../../svg/Draw/对 1.svg"
export default function Draw() {
  return (
    <div className="cs-Draw-x">
        <p>今日扭蛋</p>
        <img src={reject} alt="拒绝" className="cs-Draw-reject"></img>
        <img src={accept} alt="接受" className="cs-Draw-accept"></img>
    </div>
  )
}
