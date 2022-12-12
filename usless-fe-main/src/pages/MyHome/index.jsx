import React, { useEffect } from "react";
import "./index.css";
import smile from "../../svg/笑脸_smiling-face.svg";
import love from "../../svg/喜欢_like.svg";
import flower from "../../svg/花篮.svg";
import {
  useShowGiveFlowerStore,
  useShowProductsUponStore,
  useShowGuestMessageStore,
  useShowProductsInfoStore,
  useShowCheckFavoriteStore,
} from "../../store/store";
import {
  useToHomeTimesStore,
  useAllProductStore,
  userInfoStore,
} from "../../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import cuteHorse from "../../svg/cute_horse.png";
import rabbit from "../../svg/cute_rabbit.svg";
import email from "../../svg/信封.svg";
import store from "../../svg/store.svg";
//我的店铺界面
export default function MyHome() {
  //商品数据
  const [datalist, setDatalist] = React.useState([
    {
      id: 1,
      content: "今天很开心",
      img: cuteHorse,
      sort: 1,
      isBest: true,
    },
    {
      id: 2,
      content: "今天很开心",
      img: smile,
      sort: 2,
      isBest: false,
    },
    {
      id: 3,
      content: "今天很开心",
      img: smile,
      sort: 3,
      isBest: false,
    },
    {
      id: 4,
      content: "今天很开心",
      img: smile,
      sort: 4,
      isBest: false,
    },
    {
      id: 5,
      content: "今天很开心",
      img: smile,
      sort: 5,
      isBest: false,
    },
    {
      id: 6,
      content: "今天很开心",
      img: smile,
      sort: 6,
      isBest: false,
    },
  ]);
  const [isEmpty, setIsEmpty] = React.useState(true);
  //更改状态，hook钩子
  const [loveTimes, setLoveTimes] = React.useState(0);
  const navigate = useNavigate();
  const setGiveFlowerTrue = useShowGiveFlowerStore((state) => state.setTrue);
  const setGuestMessageTrue = useShowGuestMessageStore(
    (state) => state.setTrue
  );
  const setUponTrue = useShowProductsUponStore((state) => state.setTrue);
  const setProductTrue = useShowProductsInfoStore((state) => state.setTrue);
  const setShowId = useShowProductsInfoStore((state) => state.setShowId);
  //选择感兴趣的方面
  const setCheckFavoriteTrue = useShowCheckFavoriteStore(
    (state) => state.setTrue
  );
  const times = useToHomeTimesStore((state) => state.openTimes);
  const setTimes = useToHomeTimesStore((state) => state.setTimes);
  const info = userInfoStore((state) => state.info);
  //页面加载显示感兴趣盒子 useEffect
  React.useEffect(() => {
    console.log(times);
    if (times > 0) {
      return;
    } else {
      setCheckFavoriteTrue();
      setTimeout(() => {
        const element = document.getElementById("cs-CheckFavorite-x");
        element.style.transform = "scale(1)";
      }, 500);
      setTimes();
    }
  }, [setCheckFavoriteTrue]);
  //函数部分
  const productData = useAllProductStore((state) => state.data);
  const setData = useAllProductStore((state) => state.setData);
  const setInfo = userInfoStore((state) => state.setInfo);

  //加载页面获取用户信息,传给综合store，进行统一管理
  useEffect(() => {
    let data;
    async function getData() {
      const response = await fetch("https://api.hangyi.top/memory", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      switch (response.status) {
        case 200:
          data = await response.json();
          console.log(data);
          setData(data);
          return;
        case 404:
          data = await response.json();
          console.log("未找到");
        case 498:
          data = await response.json();
          navigate("/fail-regis");
          console.log(data);
      }
    }
    getData();
  }, []);
  useEffect(() => {
    console.log(datalist);
    if (datalist.length == 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  });
  useEffect(() => {
    async function getInfo() {
      let dataUser;
      const response = await fetch("https://api.hangyi.top/user/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      switch (response.status) {
        case 200:
          dataUser = await response.json();
          console.log("用户信息", dataUser.data);
          setInfo(dataUser.data);
          break;
        default:
          dataUser = await response.json();
          alert(dataUser.message);
      }
    }
    getInfo();
  }, []);
  //初始获取用户信息
  //送花提醒消息（临时）
  function increaseShow() {
    setLoveTimes((loveTimes) => loveTimes + 1);
    setGuestMessageTrue();
    setTimeout(() => {
      const element = document.getElementById("cs-GuestMessage-x");
      console.log(element);
      element.style.transform = "scale(1)";
    }, 500);
    // setLoveTimes((loveTimes)=>loveTimes+1);
    // setGiveFlowerTrue()
    // setTimeout(()=>{
    //   const element=document.getElementById("cs-GiveFlower-x")
    //   console.log(element)
    //   element.style.transform="scale(1)"
    // },500)
  }
  //修改标题
  const changeShopName = (event) => {
    const value = event.target.value;
    console.log(value);
    async function GetValue() {
      let data;
      const response = await fetch("https://api.hangyi.top/user/info", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          shopName: value,
          like: "娱乐",
        }),
      });
      switch (response.status) {
        case 200:
          data = await response.json();
          console.log(data);
          break;
        default:
          data = await response.json();
          console.log(data);
      }
    }
    GetValue();
  };

  //提交商品按钮
  function productUpon() {
    //设置需要展示
    setUponTrue();
    setTimeout(() => {
      const element = document.getElementById("cs-PostProducts-background");
      console.log(element);
      element.style.transform = "scale(1)";
    }, 500);
  }
  //展示商品卡片
  function showProduct(event) {
    //只检测图片的点击，事件委托
    console.log("enter");
    if (event.target.className != "cs-MyHome-content-img") {
      return;
    }
    //设置本次卡片的图片，传递给store
    setProductTrue();
    setShowId(event.target.dataset.id);
    setTimeout(() => {
      const element = document.getElementById("cs-ProductCard-background");
      console.log(element);
      element.style.transform = "scale(1)";
    }, 500);
  }
  function toStore() {
    navigate("/product/store");
  }
  function toEmail() {
    navigate("/product/email");
  }
  return (
    <div className="cs-MyHome">
      <img
        className="cs-MyHome-email"
        src={email}
        alt="邮箱"
        onClick={toEmail}
      ></img>

      <img
        className="cs-MyHome-store"
        src={store}
        alt="仓库"
        onClick={toStore}
      ></img>
      {/*头部*/}
      <div className="cs-MyHome-header">
        <input
          type="text"
          placeholder="请输入你心仪的店铺名"
          defaultValue={info.shopName}
          readOnly={false}
          onBlur={changeShopName}
        />
      </div>
      <div className="cs-MyHome-best-product-x">
        {isEmpty ? (
          <div></div>
        ) : (
          <img
            src={datalist.filter((item) => item.isBest)[0].img}
            alt="店铺图片"
            className="cs-MyHome-best-product"
          />
        )}
      </div>
      {/*内容*/}
      <div className="cs-MyHome-content" onClick={showProduct}>
        {/*展示小商铺内容*/}
        {isEmpty ? (
          <p className="cs-MyHome-empty-text">晒过的记忆更温暖哦</p>
        ) : (
          datalist.map((item) => {
            if (item.isBest) {
              return;
            }
            return (
              <div className="cs-MyHome-content-item" key={item.id}>
                <img
                  src={item.img}
                  alt="商品图片"
                  className="cs-MyHome-content-img"
                  data-id={`${item.sort}`}
                />
                <p>{item.content}</p>
              </div>
            );
          })
        )}
        <img className="cs-MyHome-rabbit" src={rabbit} alt="兔子"></img>
      </div>
      <button className="cs-MyHome-upon" onClick={productUpon}>
        上传记忆
      </button>
      <div className="cs-MyHome-footer">
        <div className="cs-MyHome-love">
          <img
            src={flower}
            alt="喜欢"
            onClick={() => {
              increaseShow();
            }}
          />
          <div className="cs-MyHome-loveTimes-x">
            <p className="cs-MyHome-loveTimes">{info.beLiked}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
