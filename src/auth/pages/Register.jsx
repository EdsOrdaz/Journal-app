import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/"
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: '',
}
const formValidations = {
    email: [( value ) => value.includes('@'), 'El correo debe tener un @'],
    password: [( value ) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
    displayName: [( value ) => value.length >= 1, 'El nombre es obligatorio'],
}

export const Register = () => {

  const [formSubmited, setFormSubmited] = useState(false);
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { 
          displayName, email, password, onInputChange, formState,
          isFormValid, displayNameValid, emailValid, passwordValid 
    } = useForm( formData, formValidations );

  const onSubmit = ( event ) => {
      event.preventDefault();
      setFormSubmited( true );

      if( !isFormValid ) return;

      dispatch( startCreatingUserWithEmailPassword( formState ));
  }

  return (
    <AuthLayout title='Registro'>
      <form onSubmit={ onSubmit }
        className='animate__animated  animate__fadeIn'>
        <Grid container>
          <Grid item xs={ 12 } sx={{ mt:2 }}>
            <TextField 
                label="Nombre Completo" 
                type="text" 
                placeholder="Edson Ordaz" 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange }
                error={ !!displayNameValid && formSubmited }
                helperText={ displayNameValid }
              />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt:2 }}>
            <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@gmail.com" 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmited }
                helperText={ emailValid }
              />
          </Grid>
          <Grid item xs={ 12 } sx={{ mt:2 }}>
            <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="Contraseña" 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmited }
                helperText={ passwordValid }
              />
          </Grid>

          <Grid container
            spacing={2}
            sx={{ mb:2, mt:1}}
          >
            <Grid 
              item 
              xs={ 12 }
              display={ !!errorMessage ? '' : 'none' }
            >
                <Alert severity='error'> { errorMessage } </Alert>
            </Grid>

            <Grid item xs={ 12 }>
                <Button
                  variant="contained" fullWidth
                  type='submit'
                  disabled={ isCheckingAuthentication }
                  >
                  Crear cuenta
                </Button>
            </Grid>
          </Grid>

          <Grid container direction={'row'} justifyContent={'end'}>
            <Typography sx={{ mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color={'inherit'} to={'/auth/login'}
            >
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
