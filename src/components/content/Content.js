import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Product from "../forms/Product";
import {Route, Routes} from "react-router-dom";
import Products from "../../page/Products";
import UserForm from "../forms/UserForm";
import UpdateProduct from "../forms/UpdateProduct";
import Cart from "../../page/Cart";
import Login from "../forms/Login";
import SecuredRoute from "../security/SecuredRoute";
import ReadMore from "../../page/ReadMore";

export default () => {
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Products/>}/>
                <Route path="/products/create" element={<SecuredRoute/>}>
                    <Route path="/products/create" element={<Product/>}/>
                </Route>
                <Route path="/users/registration" element={<UserForm/>}>
                </Route>
                <Route path="/products/update/:productId" element={<UpdateProduct/>}/>
                <Route path="/products/readMore/:productId" element={<ReadMore/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    )
}