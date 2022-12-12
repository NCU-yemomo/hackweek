import React ,{useRef,useState}from 'react'
// import {useNavigate} from "react-router-dom"
import {useShowProductsUponStore} from "../../store/store"
import { TextArea } from 'antd-mobile'

import "./index.css"
//消息弹窗组件
export default function PostProducts() {
    //设置取消按钮
    const setPostProductsFalse=useShowProductsUponStore(state=>state.setFalse)
    const uponX=useRef()
    const checkFile=useRef()
    const title=useRef()
    const canvasRef=useRef()                   

    const [description,setDescription]=useState("")
    const [upTimes,setUpTimes]=useState(0)
    const [upState,setUpState]=useState(false)
    //关闭窗口
    const back=()=>{
        uponX.current.style.transform="scale(0)"
        //延迟一秒跳转，并清除
        setTimeout(()=>{
          setPostProductsFalse()
        },1000)
    }
    //获取文本框内容
    const getValue=(event)=>{
      console.log(event.target.value)
      setDescription(event.target.value)
    }
    //上传文件
    const uponFile=()=>{
      if (upTimes>0){
        alert("只能上传一张图片")
        return
      }
      

      checkFile.current.click()

    }
    const fileinputChange=(event)=>{
      //限制文件大小不能超过2M
      if(event.target.files[0].size>2*1024*1024){
        alert("文件大小不能超过2M")
        return
      }
      const fileData = event.target.files[0];
      console.log(fileData)
      let reader = new FileReader();
      reader.readAsDataURL(fileData);
      //在canvas展示图片
      reader.onload = function (e) {
      
        let canvas = canvasRef.current
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = e.target.result;
        const w = canvas.width;
        const h = canvas.height;
        function calculate(pw, ph) {
          var px = 0;
          var py = 0;
          if(pw < w && ph < h){
              px = 0.5 * w - 0.5 * pw;
              py = 0.5 * h - 0.5 * ph;
          }else if (ph / pw > h / w) {
              var uu = ph;
              ph = h
              pw = pw * h / uu
              px = 0.5 * w - 0.5 * pw;
          } else {
              var uu = pw;
              pw = w;
              ph = ph * pw / uu
              py = 0.5 * h - 0.5 * ph;
          }
          return {px, py, pw, ph}
      }
        img.onload = function () {
          const iw = this.width;
          const ih = this.height;
          const local = calculate(iw, ih)
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.drawImage(this, local.px, local.py, local.pw, local.ph)
          setUpTimes(upTimes+1)
          setUpState(true)
        }
      }
    }
    const submit=()=>{
      if (!upState){
        alert("请上传图片")
        return
      }
      const titleValue=title.current.value
      const img=checkFile.current.files[0]
      console.log(titleValue)
      console.log(description)
      console.log(img)
      
      async function upData(){
        let formData = new FormData();
        formData.append('title', titleValue);
        formData.append('file', img);
        formData.append('content',description);
        console.log (localStorage.getItem("token"))
        const response = await fetch('https://api.hangyi.top/memory', {
          method: 'POST',
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        })
        let data
        switch (response.status) {
          case 200:
            data=await response.json()
            console.log(data)
            alert("上传成功")
            break
          case 400:
            data = await response.json()
            console.log(data)
            alert("上传失败")
            break;
          case 498:
            data = await response.json()
            console.log(data)
            break;
          case 401:
            alert("请先登录")
            break;
          case 500:
            alert("服务器错误")
            break;        
      }
    }
    upData()
  }
  return (
    <div className="cs-PostProducts-background " ref={uponX} id="cs-PostProducts-background" >
      <div className="cs-PostProducts-x"  >
        <canvas width="242px" height="242px" className="cs-PostProducts-show" ref={canvasRef}></canvas>
        <input type="file" accept='image/*' name="image" className="cs-PostProducts-file" 
        placeholder='请上传您美好的记忆' ref={checkFile} onChange={fileinputChange}></input>
        <button className="cs-PostProducts-upon" onClick={uponFile}>上传美好记忆</button>
        <input className='cs-PostProducts-title' placeholder='请输入您的记忆标题' type="text" ref={title}></input>
        <div className='cs-PostProducts-description-x'>
          <TextArea
            placeholder='请输入内容'
            autoSize={{ minRows: 1, maxRows:3 }}
            showCount
            value={description}
            onChange={val => {
              setDescription(val)
            }}
          />
        </div>
        <button className="cs-PostProducts-button" onClick={submit}>确定</button>
        <button className="cs-PostProducts-button" onClick={back}>返回</button>
      </div>
    </div>
  )
          }
