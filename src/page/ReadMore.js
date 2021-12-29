import Grid from "@mui/material/Grid";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteProduct, getProductById} from "../api/productApi";
import {Alert, Box, CircularProgress, IconButton, Link} from "@mui/material";
import SwipableTextMobileStepper from "../components/SwipableTextMobileStepper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import * as React from "react";
import {addToCart} from "../store/slice/cartSlice";
import {Translation} from "react-i18next";

const ReadMore = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const user = useSelector(state => state.user.user);
    const dispatcher = useDispatch();
    const onAddProduct = (product) => dispatcher(addToCart(product));

    useEffect(() => {
        getProductById(productId)
            .then(({data}) => setProduct(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const onDeleteProduct = (id) => {
        deleteProduct(id)
            .then(({status}) => {
                if (status === 204) {
                    setNotification({isVisible: true, message: 'Product deleted successfully', severity: 'success'});
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}));
    }
    return (
        <Translation>
            {(t) =>
                <>
                    {loading ?
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                        :
                        <Container sx={{width: '100%'}}>
                            {
                                notification.isVisible &&
                                <Alert severity={notification.severity} sx={{width: '100%'}}>
                                    {notification.message}
                                </Alert>
                            }
                            <Typography variant={"h2"} align={"center"}> {product.name}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={5}>
                                    <SwipableTextMobileStepper
                                        imageURLs={product.images.map(o => `http://localhost:8080/arrow/files/blobs/${o.id}`)}/>
                                </Grid>
                                <Grid item xs={7}>
                                    <Box sx={{display: 'flex'}}>
                                        <Typography style={{overflowWrap: 'break-word'}} variant={"h5"}>
                                            {t('product:description')}
                                            {product.description}</Typography>
                                    </Box>
                                    <Button sx={{mt: 3}} variant="contained" color="success"
                                            onClick={() => onAddProduct(product)}>
                                        {t('translation:to_cart')}
                                    </Button>
                                    {user &&
                                    <>
                                        {
                                            user.roles.includes('ADMIN') &&
                                            <>
                                                <Link
                                                    variant="button"
                                                    color="text.primary"
                                                    to={`/`}
                                                    sx={{my: 1, mx: 1.5}}
                                                    onClick={() => onDeleteProduct(product.id)}
                                                    component={NavLink}>
                                                    {t('translation:delete_product')}
                                                </Link>
                                                <Link
                                                    variant="button"
                                                    color="text.primary"
                                                    to={`/products/update/${product.id}`}
                                                    sx={{my: 1, mx: 1.5}}
                                                    component={NavLink}>
                                                    {t('translation:update_product')}
                                                </Link>
                                            </>
                                        }
                                    </>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                    }
                </>
            }
        </Translation>
    )
}
export default ReadMore;