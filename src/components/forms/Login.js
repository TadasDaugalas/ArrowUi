import {Form, Formik} from 'formik';
import {Alert, Button, Container} from "@mui/material";
import TextFieldInput from "./TextFieldInput";
import * as Yup from 'yup';
import {login} from "../../api/userApi";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/slice/userSlice";
import {useNavigate} from 'react-router-dom';
import {Translation} from "react-i18next";

const loginValidationScheme = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required()
});

export default () => {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogin = (loginData, helpers) => {
        login(loginData)
            .then(({data, headers}) => {
                dispatch(addUser({
                    user: data,
                    jwtToken: headers.authorization
                }));
                navigate('/');
            })
            .catch((response) => setError(true))
            .finally(() => helpers.setSubmitting(false));
    }

    return (
        <Translation>
            {(t)=>
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            onSubmit={onLogin}
            validationSchema={loginValidationScheme}
        >
            {props=>(
                <Container maxWidth="sm">
                    {
                        error &&
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Bad credentials
                        </Alert>
                    }
                    <Form>
                        <TextFieldInput
                            error={props.touched.username && !!props.errors.username}
                            fieldName="username"
                            label={t('user:username')}/>
                        <TextFieldInput
                            error={props.touched.password && !!props.errors.password}
                            fieldName="password"
                            label={t('user:password')}
                            type="password"/>
                        <Button
                            variant="outlined"
                            type="submit"
                            disabled={props.isSubmitting}>
                            {t('translation:login')}</Button>
                    </Form>
                </Container>
            )}
        </Formik>
            }
        </Translation>
    )
}