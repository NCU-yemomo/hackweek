import Login from "../pages/Login"
import Register from "../pages/Register"
import NotFound from "../pages/NotFound"
import ProductPage from "../ProductPage"
import {Navigate} from "react-router-dom"
import MyHome from "../pages/MyHome"
import GuestResponse from "../pages/GuestResponse"
import MyStore from "../pages/MyStore"
import OthersHome from "../pages/OtherHome"
import Exchange from "../pages/Exchange"
import MyInfo from "../pages/MyInfo"
import Setting from "../pages/Setting"
import SuccessExchange from "../pages/SuccessExchange"
import UserService from "../pages/UserService"
import ChangePassword from "../pages/ChangePassword"
import Share from "../pages/Share"
import FailExchange from "../pages/FailExchange"
import Collect from "../pages/Collect"
import CollectEmpty from "../pages/Collect/CollectEmpty"
import CollectFull from "../pages/Collect/CollectFull"
import Email from "../pages/Email"
import Draw from "../pages/Draw"
import FailRegis from "../pages/FailRegis"
import SuccessRegis from "../pages/SuccessRegis"
import AlreadyExchange from "../pages/AlreadyExchange"
const routes=[
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:"/password",
        element:<ChangePassword/>
    },
    {
        path:"fail-regis",
        element:<FailRegis/>
    },
    {
        path:"success-regis",
        element:<SuccessRegis/>,
    },
    {
        path:"/product",
        element:<ProductPage/>,
        children:[
            {
                path:"home",
                element:<MyHome/>
            },
            {
                path:"store",
                element:<MyStore/>
            },
            {
                path:"guest-response/:id",
                element:<GuestResponse/>
            },
            {
                path:"",
                element:<Navigate to="home"/>
            },
            {
                path:"other-home/:id",
                element:<OthersHome/>,
            },
            {
                path:"other-home/:id/exchange",
                element:<Exchange/>
            },
            {
                path:"my-info/:id",
                element:<MyInfo/>
            },
            {
                path:"setting/:id",
                element:<Setting/>
            },
            {
                path:"success-exchange",
                element:<SuccessExchange/>
            },
            {
                path:"fail-exchange",
                element:<FailExchange/>
            },
            {
                path:"user-service",
                element:<UserService/>
            },
            {
                path:"share/:id",
                element:<Share/>
            },
            {
                path:"collect",
                element:<Collect/>,
                children:[
                    {
                        path:"empty",
                        element:<CollectEmpty/>
                    },
                    {
                        path:"",
                        element:<CollectFull/>
                    }
                ]
            },
            {
                path:"already-exchange",
                element:<AlreadyExchange/>
            },
            {
                path:"email",
                element:<Email/>
            },
            {
                path:"draw",
                element:<Draw/>
            }
        ]
    },
    {
        path:"/",
        element:<Navigate to="/login"/>
    },
    {
        path:"/*",
        element:<NotFound/>
    },
    
]
export default routes