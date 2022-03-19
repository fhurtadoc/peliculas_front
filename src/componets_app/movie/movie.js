import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {useNavigate, useParams} from 'react-router-dom' 
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import env from '../../enviroment'
import './movie.css'

export default function Movie() {

    const params=useParams()
    const [movie, setMovie] = React.useState(false);
    const [value, setValue] = React.useState(2);        

    useEffect(() => {
        
        if (params.id) {
            loadMovie(params.id);
          }
        
    }, [params.id]);

    const get_coments=async(coments)=>{
        coments.forEach(element => {
            coments.púsh(element)        
        });
    }

    const loadMovie=async (id)=>{
        const res = await fetch(env.URL +'movies/one_movie/'+ id);
        const data = await res.json();        
        setMovie(data)
    }

    const calificacion=async()=>{
        var form_data=new FormData()
        form_data.append('score', value);
        form_data.append('movie_id', params.id)
        console.log(value);
        const response = await fetch(env.URL+'movies/score', {
                method:"POST",                    
                body: form_data
            });
        }



    return (
        <React.Fragment>
            <div className="continer" >
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <img src={env.URL+ movie.cover} alt={movie.title+".img"} />
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

        </React.Fragment> 

    )
    
}
