import React, { useEffect ,useState} from "react";
import "./index.css";
import smile from "../../svg/background.jpg";
import { useNavigate } from "react-router-dom";
import { ImageViewer } from 'antd-mobile'
import { useShowFooterStore } from "../../store/store";
import close from "../../svg/箭头左_arrow-left.svg"
import deleteImg from "../../svg/删除.svg"
import { SearchBar } from "antd-mobile";
import { Popup} from 'antd-mobile'
//data后端可以设置个state，然后传递过来
// const data = [
//   {
//     id: 1,
//     content: "今天很开心",
//     img: smile,
//     sort: 1,
//   },
//   {
//     id: 2,
//     content: "今天很开心",
//     img: smile,
//     sort: 2,
//   },
//   {
//     id: 3,
//     content: "今天很开心",
//     img: smile,
//     sort: 3,
//   },
//   {
//     id: 4,
//     content: "今天很开心",
//     img: smile,
//     sort: 4,
//   },
//   {
//     id: 5,
//     content: "今天很开心",
//     img: smile,
//     sort: 5,
//   },
//   {
//     id: 6,
//     content: "今天很开心",
//     img: smile,
//     sort: 6,
//   },
//   {
//     id: 7,
//     content: "今天很开心",
//     img: smile,
//     sort: 7,
//   },
// ];

export default function MyStore() {
  const setFooterFalse = useShowFooterStore((state) => state.setFalse);
  const setFooterTrue = useShowFooterStore((state) => state.setTrue);
  const [data,setData]=useState([])
  const [visible, setVisible] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    setFooterFalse();
    return () => {
      setFooterTrue();
    };
  });
  useEffect(()=>{
    let data_end
    async function getData(){
      const response=await fetch("https://api.hangyi.top/memory?limit=-1",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        },
      })
      switch (response.status){
        case 200:
          data_end=await response.json()
          console.log(data_end)
          setData(data_end.data)
          return
        case 404:
          data_end=await response.json()
          console.log("未找到")
        case 498:
          data_end=await response.json()
          navigate("/fail-regis")
          console.log(data_end)
      }
    }
    getData()
},[])
  console.log(data)
  const dataLeft=data.filter((item,index)=>index%2==0)
  const dataRight=data.filter((item,index)=>index%2==1)
  const showPng=(img)=>{
    let visible=true
    const props={
      visible: visible,
      image: img,
      onClose: () => {
        visible=false
      },
    }
    ImageViewer.show(props)
  }
  const backEdit=()=>{
    setVisible(false)
  }
  const ensureSubmit=()=>{
    //这里还有一些逻辑
    setVisible(false)
  }

  const backBefore=()=>{
    navigate(-1)
  }
  const deletePicture=(uuid)=>{
    let dataDelete
    async function deletePicture(){
      const response=await fetch("https://api.hangyi.top/memory/"+uuid,{
        method:"DELETE",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
        })
      switch (response){
        case 200:
          dataDelete=await response.json()
          console.log(dataDelete.message)
        case 404:
          dataDelete=await response.json()
          console.log(dataDelete)
        case 400:
          dataDelete=await response.json()
          console.log(dataDelete.message)
      }
    }
    deletePicture()
}
  return (
    <div className="cs-MyStore-x">
      <img src={close} alt="返回" onClick={backBefore} className="cs-MyStore-back"/>
      <button className="cs-MyStore-already-exchange" onClick={()=>navigate("/product/already-exchange")}>已交换</button>
      <SearchBar placeholder="请输入内容" showCancelButton={() => true}
        style={{
          "--background":"white",
          "marginTop":"270px",
        }}
      />
      <div className="cs-MyStore-Content-x">
        <div className="cs-MyStore-show">
        {dataLeft.map((item, index) => {
          return (<div className={index%2===0?"cs-MyStore-Rectangle":"cs-MyStore-square"} key={item.uuid}>
                    <img src={deleteImg} alt="删除" onClick={()=>deletePicture(item.uuid)} 
                    className="cs-MyStore-delete-img"/>
                    <img src={item.name==""?smile: "https://api.hangyi.top/images/"+item.name} 
                    className="cs-MyStore-img"
                    alt="记忆" onClick={()=> showPng("https://api.hangyi.top/images/"+item.name)}/>
                  </div>);
        })}
        </div>
        <div className="cs-MyStore-show">
        {dataRight.map((item, index) => {
          return (<div className={index%2===1?"cs-MyStore-Rectangle":"cs-MyStore-square"} key={item.uuid}>
                    <img src={deleteImg} alt="删除" onClick={()=>deletePicture(item.uuid)} 
                    className="cs-MyStore-delete-img"/>
                    <img src={item.picture==""?smile:"https://api.hangyi.top/images/"+item.name} alt="记忆" className="cs-MyStore-img" onClick={()=> showPng("https://api.hangyi.top/images/"+item.name)}/>
                  </div>);
        })}
        </div>
      </div>
      <button className="cs-MyStore-button" onClick={()=>setVisible(true)}>批量上架</button>
      <Popup
      visible={visible}
      onMaskClick={() => {
        setVisible(false)
      }}
      bodyStyle={{ height: '40vh' }}
      >
        <div className="cs-MyStore-Popup-x">
          <div className="cs-MyStore-scroll-x">
            {
              data.map((item,index)=>{
              return (
                <div className="cs-MyStore-check" key={item.uuid}>
                  <img src={item.name==""?smile:"https://api.hangyi.top/images/"+item.name} alt="商品"></img>
                  <input type="checkbox"></input>
                </div>
              )
            })
          }
          </div>
          <h1>请选择需要上架的商品</h1>
          <div className="cs-MySore-Popup-button">
            <button onClick={backEdit}>退出编辑</button>
            <button onClick={ensureSubmit}>确认上架</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}
