import create from "zustand"

//决定弹幕是否弹出的商店
const useShowGuestMessageStore=create((set)=>({
    isShow:false,
    //set方法使用合并的方式
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false}),
}))
const useShowGiveFlowerStore=create((set)=>({
    isShow:false,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false}),
}
))
const useShowProductsUponStore=create((set)=>({
    isShow:false,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false})
}))
const useShowProductsInfoStore=create((set)=>({
    isShow:false,
    showId:null,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false}),
    setShowId:(showId)=>set({showId})
}))
const useShowProductsOthersInfoStore=create((set)=>({
    isShow:false,
    showId:null,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false}),
    setShowId:(showId)=>set({showId})
}))
const useAllInfoStore=create((set)=>({
    Info:{},
    setInfo:(Info)=>set({Info})
}))
//上架所有卡片的商店，点击卡片时会全部获取
const useProductImgStore=create((set)=>({
    img:null,
    setImg:(img)=>set({img})
}))
//决定是否显示很喜欢
const useShowCheckFavoriteStore=create((set)=>({
    isShow:false,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false})
})) 
//决定是否展示底部状态栏
const useShowFooterStore=create((set)=>({
    isShow:true,
    setTrue:()=>set({isShow:true}),
    setFalse:()=>set({isShow:false})
}))

export {useShowGuestMessageStore,useShowProductsUponStore,
    useShowProductsInfoStore,useAllInfoStore,
    useProductImgStore,useShowProductsOthersInfoStore,useShowCheckFavoriteStore,useShowFooterStore,
    useShowGiveFlowerStore,
    }