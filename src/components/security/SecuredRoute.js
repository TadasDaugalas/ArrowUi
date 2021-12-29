import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";

export default ({roles}) => {
    const user = useSelector(state => state.user.user);
    const allow = roles ? user?.roles.some(r => roles.includes(r)) : user;

    return allow ? <Outlet/> : <Navigate to="/"/>
}