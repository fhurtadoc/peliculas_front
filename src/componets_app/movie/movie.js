import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom' 
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import env from '../../enviroment'
import './movie.css'
import { parse } from "date-fns";

export default function Movie() {

    const params=useParams()
    const [movie, setMovie] = React.useState(false);
    const [value, setValue] = React.useState(2);        

    useEffect(() => {
        
        if (params.id) {
            loadMovie(params.id);
            get_coments(params.id)
          }
        
    }, [params.id]);


    const get_coments=async(id)=>{
        console.log(id);
    }

    const loadMovie=async (id)=>{
        const res = await fetch(env.URL +'movies/one_movie/'+ id);
        const data = await res.json();        
        setMovie(data)
    }


    const calificacion=async(e)=>{        
        if (e && "preventDefault" in e) e.preventDefault()
        var data={
            score:value,
            id_movie:parseInt(params.id) 
        }        
        try {            
            const response2 = await fetch(env.URL+'movies/score', {
                method:"POST",
                headers: { "Content-Type": "application/json" },                    
                body: JSON.stringify(data),
            });
            await response2.json(); 
            
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <React.Fragment>
            <div className="continer_movie" >                
                <div id="trailer" >                      
                    <iframe src={movie.url_youtube}></iframe>                 
                </div>             
                <img src={env.URL+ movie.cover} alt={movie.title+".img"} />
                <div id="Data" >  
                    <h2>{movie.title}</h2>                       
                    <p> Descripcion: {movie.description}</p>
                    <p> La pelicula Dura:{movie.long_time}</p>
                    <p>El puntaje a la fecha de esta pelicula es: {movie.cal_score}</p>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                            >
                            <Typography component="legend">Calificar</Typography>                        <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                                onClick={calificacion}
                            />                                                
                        </Box>                                                            
                </div> 
            </div> 
            <h2 >Comentarios de la Pelicula</h2>
            <div className="continerComentarios">
                <div className="new_coment">
                
                </div> 
                <div className="coments">
                
                </div> 
            </div>            

        </React.Fragment> 

    )
    
}
