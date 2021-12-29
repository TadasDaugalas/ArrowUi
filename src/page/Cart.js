import Container from "@mui/material/Container";
import {
    Alert, Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "../store/slice/cartSlice";
import {Translation} from "react-i18next";

export default () => {

    const products = useSelector(state => state.cart);
    const dispatcher = useDispatch();
    const onRemoveProduct = (id) => dispatcher(removeFromCart(id));
    return (
        <Translation>
            {(t)=>
        <Container maxWidth="md" sx={{my: 2}}>
            {
                products.length === 0 ?
                    <Alert severity="info">{t('cart:basket_empty')}</Alert>
                    :
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 100}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("cart:name")}</TableCell>
                                    <TableCell align="right">{t("cart:category")}</TableCell>
                                    <TableCell align="right">{t("cart:description")}</TableCell>
                                    <TableCell align="right">{t("cart:quantity")}</TableCell>
                                    <TableCell align="right">{t("cart:price")}</TableCell>
                                    <TableCell align="right">{t("cart:sub_total")}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell component="th" scope="row">{product.name}</TableCell>
                                        <TableCell align="right">{product.category}</TableCell>
                                        <TableCell align="right">{product.description}</TableCell>
                                        <TableCell align="right">{product.count}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">{product.price * product.count}</TableCell>
                                        <TableCell>
                                            <Button variant="outlined"
                                                    color="error"
                                                    onClick={() =>onRemoveProduct(product.id)}
                                            >
                                                <DeleteOutlineIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </Container>
            }
        </Translation>
    )
}