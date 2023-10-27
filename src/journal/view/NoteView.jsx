import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks"
import { useEffect, useRef } from "react"
import moment from "moment/moment"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, formState, onInputChange } = useForm(note);
    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [ formState ])

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ( { target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ));
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
        Swal.fire('Nota eliminada', '', 'info');
    }
    
    

  return (
    <Grid container direction={'row'} justifyContent='space-between' alignItems='center' sx={{ mb:1 }}  
        className="animate__animated  animate__fadeIn"
    >

        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ moment(date).format('DD MMMM YYYY, h:mm:ss a') } </Typography>
        </Grid>


        <Grid item>
            <input
                ref={ fileInputRef }
                type="file"
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                    <UploadOutlined />
            </IconButton>
            <Button color="primary" sx={{ padding:1 }}
                disabled={ isSaving }
                onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text" 
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                name="title"
                value={ title }
                onChange={ onInputChange }
                sx={{
                    border: 'none',
                    mb: 1
                }}
            />

            <TextField 
                type="text" 
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedio hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }   
                sx={{ mt:2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        {/* IMAGENES */}
        <ImageGallery images={ note.imageUrls } />
        
    </Grid>
  )
}
