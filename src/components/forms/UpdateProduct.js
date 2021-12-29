import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById, updateProduct} from "../../api/productApi";
import {Form, Formik} from "formik";
import Container from "@mui/material/Container";
import {Alert, Box, Button, CircularProgress, Hidden, Paper} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import * as Yup from "yup";
import {Translation} from "react-i18next";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Value must be more than 5')
        .required(),
    category: Yup.string()
        .required(),
    description: Yup.string()
        .max(1000, 'Value must be less than 1000')
        .required(),
    quantity: Yup.number()
        .typeError('Must be a number')
        .positive()
        .required(),
    price: Yup.number()
        .typeError('Must be a number')
        .positive()
        .required()
});

const UpdateProduct = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const onUpdateProduct = (product, helpers) => {
        product.id = productId;
        updateProduct(product)
            .then(({status}) => {
                if (status === 202) {
                    setNotification({isVisible: true, message: 'Product updated successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    useEffect(() => {
        getProductById(productId)
            .then(({data}) => setProduct(data))
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
                        <Formik initialValues={{
                            name: product?.name || '',
                            category: product?.category || '',
                            description: product?.description || '',
                            quantity: product?.quantity || '',
                            price: product?.price || ''
                        }}
                                onSubmit={onUpdateProduct}
                                validationSchema={validationSchema}
                        >
                            {props => (
                                <Container maxWidth="sm">
                                    <Paper elevation={3} sx={{p: 1}}>
                                        {
                                            notification.isVisible &&
                                            <Alert severity={notification.severity} sx={{width: '100%'}}>
                                                {notification.message}
                                            </Alert>
                                        }
                                        <Form className="product-form">
                                            <TextFieldInput error={props.touched.name && !!props.errors.name}
                                                            fieldName="name"
                                                            label={t('product:name')}
                                                            placeholder={t('product:name')}/>
                                            <TextFieldInput error={props.touched.category && !!props.errors.category}
                                                            fieldName="category"
                                                            label={t('product:category')}/>
                                            <TextFieldInput
                                                error={props.touched.description && !!props.errors.description}
                                                fieldName="description"
                                                label={t('product:description')}
                                                placeholder={t('product:description')}
                                                multiline
                                                rows={3}/>
                                            <TextFieldInput error={props.touched.quantity && !!props.errors.quantity}
                                                            fieldName="quantity"
                                                            label={t('product:quantity')}
                                                            placeholder={t('product:quantity')}/>
                                            <TextFieldInput error={props.touched.price && !!props.errors.price}
                                                            fieldName="price"
                                                            label={t('product:price')}
                                                            placeholder={t('product:price')}/>
                                            {
                                                props.isSubmitting ? <CircularProgress/> :
                                                    <Button type="submit">{t('translation:submit')}</Button>
                                            }
                                        </Form>
                                    </Paper>
                                </Container>
                            )}
                        </Formik>
                    }
                </>
            }
        </Translation>
    )
}
export default UpdateProduct;