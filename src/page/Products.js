import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addToCart} from "../store/slice/cartSlice";
import {getProducts} from "../api/productApi";
import {Box, CircularProgress, IconButton, Link, Paper} from "@mui/material";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EllipsisText from "react-ellipsis-text";
import Grid from "@mui/material/Grid";
import {NavLink} from "react-router-dom";
import {Translation} from "react-i18next";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatcher = useDispatch();
    const onAddProduct = (product) => dispatcher(addToCart(product));


    useEffect(() => {
        getProducts()
            .then(({data}) => setProducts(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <Translation>
            {(t) =>
                <>
                    {loading ?
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress/>
                        </Box>
                        :
                        <Container maxWidth="md" sx={{my: 2}}>
                            <Grid
                                container
                                spacing={3}
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                {products.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                                        <Card component={Paper}>
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div"
                                                            sx={{textOverflow: 'ellipsis'}}>
                                                    <EllipsisText text={product.name} length={20}/>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary"
                                                            sx={{textOverflow: 'ellipsis'}}>
                                                    <EllipsisText text={product.description} length={100}/>
                                                </Typography>
                                                <Typography variant="h5" color="text.primary">
                                                    {product.price}$
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <IconButton variant="outlined" onClick={() => onAddProduct(product)}>
                                                    <AddShoppingCartIcon/>
                                                </IconButton>
                                                <Link
                                                    variant="button"
                                                    color="text.primary"
                                                    to={`/products/readMore/${product.id}`}
                                                    sx={{my: 1, mx: 1.5}}
                                                    component={NavLink}>
                                                    {t('translation:read_more')}
                                                </Link>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    }
                </>
            }
        </Translation>
    );
}

export default Products;
