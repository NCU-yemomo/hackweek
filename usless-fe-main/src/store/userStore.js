import create from "zustand"

const userInfoStore =create((set)=>({
    info:{
        username: "",
        type: "",
        shopName: "",
        beLiked: 0,
        createdAt: "2022-12-11T23:51:10.185289Z",
        updatedAt: "2022-12-11T23:51:10.185289Z"
    },
    setInfo:(info)=>set({info:info})
}))
const useToHomeTimesStore=create((set)=>({
    openTimes:0,
    setTimes:()=>set((state)=>({openTimes:state.openTimes+1}))
}))
const useAllProductStore=create((set)=>({
    data:[],
    setData:(data)=>set({data:data})
}))

export {userInfoStore,useToHomeTimesStore,useAllProductStore}