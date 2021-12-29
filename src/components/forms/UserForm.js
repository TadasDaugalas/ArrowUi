import {Form, Formik} from "formik";
import Container from "@mui/material/Container";
import {Alert, Button, CircularProgress, Paper} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import * as Yup from "yup";
import {createUser} from "../../api/userApi";
import {useState} from "react";
import {Translation} from "react-i18next";


const validateScheme = Yup.object().shape({
    username: Yup.string()
        .min(5, 'Value must be more then 5')
        .required(),
    name: Yup.string()
        .min(5, 'Value must be more then 5')
        .required(),
    surname: Yup.string()
        .min(5, 'Value must be more then 5')
        .required(),
    password: Yup.string()
        .min(8, 'Minimum 8 simbols')
        .required('Password is required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
export default () => {
    const [notification, setNotification] = useState({isVisible: false, message: '', severity: ''});
    const onCreateUser = (user, helpers) => {
        createUser(user)
            .then(({status}) => {
                if (status === 201) {
                    setNotification({isVisible: true, message: 'User create successfully', severity: 'success'});
                    helpers.resetForm();
                }
            })
            .catch((error) => setNotification({isVisible: true, message: 'Something goes wrong', severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));

    }
    return (
        <Translation>
            {(t) =>
                <Formik initialValues={{
                    username: '',
                    name: '',
                    surname: '',
                    country: '',
                    city: '',
                    street: '',
                    zipCode: '',
                    password: '',
                    passwordConfirmation: ''
                }}
                        onSubmit={onCreateUser}
                        validationSchema={validateScheme}
                >

                    {props => (
                        <Container maxWidth="sm">
                            <Paper elevation={3} sx={{py: 1}}>
                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity} sx={{width: '100%'}}>
                                        {notification.message}
                                    </Alert>
                                }
                                <Form className="product-form">
                                    <TextFieldInput error={props.touched.username && !!props.errors.username}
                                                    fieldName="username"
                                                    label={t('user:username')}
                                                    placeholder={t('user:username')}/>
                                    <TextFieldInput error={props.touched.name && !!props.errors.name}
                                                    fieldName="name"
                                                    label={t('user:name')}
                                                    placeholder={t('user:name')}/>
                                    <TextFieldInput error={props.touched.surname && !!props.errors.surname}
                                                    fieldName="surname"
                                                    label={t('user:surname')}
                                                    placeholder={t('user:surname')}/>
                                    <TextFieldInput error={props.touched.country && !!props.errors.country}
                                                    fieldName="country"
                                                    label={t('user:country')}
                                                    placeholder={t('user:country')}/>
                                    <TextFieldInput error={props.touched.city && !!props.errors.city}
                                                    fieldName="city"
                                                    label={t('user:city')}
                                                    placeholder={t('user:city')}/>
                                    <TextFieldInput error={props.touched.street && !!props.errors.street}
                                                    fieldName="street"
                                                    label={t('user:street')}
                                                    placeholder={t('user:street')}/>
                                    <TextFieldInput error={props.touched.zipCode && !!props.errors.zipCode}
                                                    fieldName={t('user:zip_code')}
                                                    label={t('user:zip_code')}
                                    />
                                    <TextFieldInput error={props.touched.password && !!props.errors.password}
                                                    fieldName="password"
                                                    label={t('user:password')}
                                                    type="password"
                                    />
                                    <TextFieldInput
                                        error={props.touched.passwordConfirmation && !!props.errors.passwordConfirmation}
                                        fieldName="passwordConfirmation"
                                        label={t('user:repeate_password')}
                                        type="password"/>

                                    {props.isSubmitting ? <CircularProgress size={20}/> :
                                        <Button variant="outlined" type="submit">{t('translation:submit')}</Button>
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