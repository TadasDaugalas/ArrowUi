import {Form, Formik} from 'formik';
import {Alert, Button, CircularProgress, Paper} from '@mui/material';
import * as Yup from 'yup';
import TextFieldInput from "./TextFieldInput";
import Container from "@mui/material/Container";
import '../../style.css'
import {createProducts, uploadProductImage} from "../../api/productApi";
import {useState} from "react";
import UploadImages from "../UploadImages";
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

export default () => {

    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const [images, setImages] = useState([]);


    const onCreateProduct = (product, helpers) => {
        createProducts(product)
            .then((response) => {
                if (response.status === 201) {
                    setNotification({isVisible: true, message: 'Product created successfully', severity: 'success'});

                    if (images && images.length > 0) {
                        const productId = response.data;
                        let promises = [];
                        for (let image of images) {
                            promises.push(uploadProductImage(productId, image));
                        }
                        Promise.all(promises).then((values) => {
                            console.log(values);
                        });
                    }

                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    function onImagesChanged(files) {
        setImages(files);
    }

    return (
        <Translation>
            {(t)=>
            <Formik initialValues={{
                name: '',
                category: '',
                description: '',
                quantity: '',
                price: ''
            }}
                    onSubmit={onCreateProduct}
                    validationSchema={validationSchema}>
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
                                <TextFieldInput error={props.touched.description && !!props.errors.description}
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
                                <UploadImages onImagesChanged={onImagesChanged}/>
                                {
                                    props.isSubmitting ? <CircularProgress/> : <Button type="submit">{t('translation:submit')}</Button>
                                }
                            </Form>
                        </Paper>
                    </Container>
                )}
            </Formik>
            }
        </Translation>
    )
}
