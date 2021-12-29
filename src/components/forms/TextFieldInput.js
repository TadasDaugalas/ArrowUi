import {ErrorMessage, Field} from "formik";
import {FormControl, FormHelperText, TextField} from "@mui/material";

export default ({fieldName,error ,label,placeholder='Type here',...props})=>(

    <FormControl error={error}
                 fullWidth
                 margin="dense"
                 variant="standard">
        <Field error={error}
               id={fieldName}
               name={fieldName}
               label={label}
               placeholder={placeholder}
               {... props}
               as={TextField}/>
        <ErrorMessage name={fieldName}
                      component={FormHelperText}/>
    </FormControl>

)