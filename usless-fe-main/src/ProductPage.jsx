import React,{useState,useRef,useEffect} from "react"
import {Outlet,useNavigate} from "react-router-dom"
import { useShowGuestMessageStore,useShowProductsUponStore ,
  useShowProductsInfoStore,useShowProductsOthersInfoStore,
  useShowCheckFavoriteStore,useShowFooterStore,useShowGiveFlowerStore} from "./store/store";

//用户信息引入
import {userInfoStore} from "./store/userStore"

import './App.css';
import myHome from "./svg/footer/footer1.png"
import otherHome from "./svg/footer/footer2.svg"
import draw from "./svg/footer/footer4.svg"
import user from "./svg/footer/footer5.svg"
import collect from "./svg/footer/footer3.svg"

//组件列表
import GuestMessage from "./components/GuestMessage"
import PostProducts from "./components/PostProducts";
import ProductCard from "./components/ProductCard";
import ProductCardOther from "./components/ProductCardOther";
import CheckFavorite from "./components/CheckFavorite";
import Glass from "./components/Glass";
import GiveFlower from "./components/GiveFlower";

function ProductPage() {
  const token=localStorage.getItem("token")
  let isToken=true
  if (!token){
    console.log("isTrue")
    isToken=false
  }
  const [isOpacity1,setIsOpacity1]=useState(false)
  const [isOpacity2,setIsOpacity2]=useState(false)
  const navigate=useNavigate()
  //前排提醒，钩子必须在组件中使用
  
  //弹窗状态咨询表
  const isShowMessage=useShowGuestMessageStore((state)=>state.isShow)
  const isShowUpon=useShowProductsUponStore((state)=>state.isShow)
  const isShowProducts=useShowProductsInfoStore((state)=>state.isShow)
  const isShowProductsOthers=useShowProductsOthersInfoStore((state)=>state.isShow)
  const isShowCheckFavorite=useShowCheckFavoriteStore((state)=>state.isShow)
  const isShowFooter=useShowFooterStore((state)=>state.isShow)
  const isShowGiveFlower=useShowGiveFlowerStore((state)=>state.isShow)
  //用户信息状态
  const userInfo=userInfoStore((state)=>state.info)
  console.log(userInfo)

  //跳转到其他人商铺
  const toOthersHome=()=>{
    navigate("/product/other-home/123")
  }
  //跳转到自己的店铺
  const toMyHome=()=>{
    navigate("/product/home")
  }
  const toMyInfo=()=>{
    navigate(`/product/my-info/3`)
  }
  const toCollect=()=>{
    navigate("/product/collect")
  }
  const toDraw=()=>{
    navigate("/product/draw")
  }
  if (isToken){
    return (
      <div className="cs-all">
        <div className="cs-content">
            <Outlet/>
        </div>
        {/*底部导航栏*/}
        {isShowFooter?<footer className="cs-footer">
            {/**对应的选项 */}
            <div className="cs-indexList-state" onClick={toOthersHome}>
              <img src={otherHome} alt="其他人商店"/>
              <p>他人店铺</p>
            </div>
            <div className="cs-indexList-state" onClick={toMyHome}>
              <img src={myHome} alt="自己商店"/>
              <p>我的店铺</p>
            </div>
            <div className="cs-indexList-state" onClick={toCollect}>
              <img src={collect} alt="收藏"/>
              <p>收藏</p>
            </div>
            <div className="cs-indexList-state" onClick={toDraw}>
              <img src={draw} alt="svg" />
              <p>扭蛋机</p>
            </div>
            <div className="cs-indexList-state" onClick={toMyInfo}>
              <img src={user} alt="svg" />
              <p>我的</p>
            </div>
        </footer>:null
        }  
        {/*根据state来判断是否留存 Glass黑幕 防止误触 本身透明*/}
        {
          (isShowMessage || isShowUpon || isShowProducts || isShowProductsOthers || isShowCheckFavorite)?<Glass/>:null
        }
        {
          isShowMessage?<GuestMessage/>:null
        }
        {
          isShowUpon?<PostProducts/>:null
        }
        {
          isShowProducts?<ProductCard/>:null
        }
        {
          isShowProductsOthers?<ProductCardOther/>:null
        }
        {
          isShowCheckFavorite?<CheckFavorite/>:null
        }
        {
          isShowGiveFlower?<GiveFlower/>:null
        }
      </div>
    );
    }else{
      return (
        <div>
          <p>没有权限</p>
        </div>
      )
    }
}

export default ProductPage;
