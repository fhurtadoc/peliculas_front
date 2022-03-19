import { Card, Grid, CardContent, TextField, Typography, Button, Input, InputLabel } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';



import env from '../../enviroment'


import React, { useEffect, useState } from "react";


import './form_movies.css';

export default function Form_movies() {

    
    const [file, setFile] = useState(null)    

    const [movie, setMovies] = useState({
        title: "",
        description: "",
        long_time:"",
        url_youtube:"",
        date_release:"",
        cover:""
    });

    const selectedHandler = e => {
        setFile(e.target.files[0])
      }

    const navigate = useNavigate();
    
    const upload_file=async (e)=>{
        if(!file){
            console.log("erro");
        }else{
            var extence=file.name.split('.');            
            if(extence[1]==="png" || extence[1]==="jpg"){
                movie.cover=file
                console.log(movie);
            }else{
                console.log("formato no permitido");                
            }
        } 
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();  
        
        
        let form_data=new FormData();
        form_data.append('title',movie.title)
        form_data.append('description',movie.description)
        form_data.append('long_time',movie.long_time)
        form_data.append('url_youtube',movie.url_youtube)
        form_data.append('cover',movie.cover)
        form_data.append('date_release',movie.date_release)        
        
        try {            
                const response = await fetch(env.URL+'movies/newMovie', {
                    method:"POST",                    
                    body: form_data
                });
                await response.json();
                navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) =>
    setMovies({ ...movie, [e.target.name]: e.target.value });
    
    return(
        <Grid conteiner  direction='column'  alignItems='center' justifyContent='center' >
            <Grid item xs={3} > 
                <Card sx={{mt:5 }}>
                    <Typography className="formTitle">
                        Nueva Pelicula
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="continer">
                            <TextField
                                name="title"
                                variant="filled"
                                label="Titulo"
                                className="field"
                                value={movie.title}
                                onChange={handleChange}
                            />

                            <TextField
                                name="description"  
                                variant="filled"
                                label="Descripcion"
                                multiline
                                rows={4}
                                className="field"
                                value={movie.description}
                                onChange={handleChange}
                            />
                            {/*<LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker                                
                                value={movie.long_time}
                                onChange={(newMovie) => {
                                    setMovies(newMovie);
                                }}                                
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>*/}
                            <TextField
                                name="long_time"
                                variant="filled"
                                label="Duracion"
                                className="field"
                                value={movie.long_time}
                                onChange={handleChange}
                            />                          
                            <TextField
                                name="url_youtube"
                                variant="filled"
                                label="URL You-tube"
                                className="field"
                                value={movie.url_youtube}
                                onChange={handleChange}
                            />
                            <TextField
                                name="date_release"
                                variant="filled"
                                label="Fecha de lanzamiento"
                                className="field"
                                type="date"
                                inputProps={{ style: { height: "50px" } }}
                                value={movie.date_release}
                                onChange={handleChange}
                            />                                                                                     
                            <InputLabel>
                                Subir Portada
                            </InputLabel>
                            <Input
                                name="cover"
                                accept="image/*"  
                                label="Portada"                                                              
                                id="image-upload"
                                type="file" 
                                className="form-control"                                
                                onChange={selectedHandler}                             
                            />
                            <Button className="upload"  onClick={upload_file}> 
                                Subir Imagen
                            </Button> 
                            <Button
                            type="submit"
                            variant="contained"                        
                            >
                            Guardar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}