import { Card, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import env from '../../enviroment'
import {useNavigate} from 'react-router-dom' 

import Movie from '../movie/movie' 

import './movies.css'; 

export default function Movies() {
    const navigate_local = useNavigate();
    const [movies, setMovies ]=useState([]);
    const [premieres, setpremieres ]=useState([]);
    
    const loadMovies= async()=>{
        const response= await fetch(env.URL+'movies/list_movies');
        const data = await response.json();        
        setMovies(data);

    }

    const loanMovie= async(id)=>{
        
    }
    

    useEffect(() => {
        loadMovies();
    }, []);
    
    
    return (                
        <React.Fragment> 
            <h1>Estrenos</h1>
            <div className="estrenos">                
            <Card  className="movie" >
                    una                    
                </Card>
                <Card className="movie" >
                    dos                    
                </Card>

                <Card className="movie" >
                    tres                    
                </Card>

                <Card className="movie" >
                    cuatro                   
                </Card>
                <Card className="movie">
                    cuatro                   
                </Card>                
            </div>
            <h1>Todas las Peliculas</h1>
            <div id="allmovies">
            {movies.map((movie) => (
                <Card  className="movie" >                    
                    <figure>
                        <img src={env.URL+ movie.cover} alt={movie.title+".img"}/>
                        <div class="capa">
                            <h3>{movie.title}</h3>
                            <p>{movie.description}</p>                            
                            <Button
                                variant="contained"                                
                                onClick={() => navigate_local(`/movie/${movie.id_movie}`)}
                                >
                                var mas
                            </Button> 
                        </div>                
                    </figure>
                </Card>
            ))}
            </div>
        </React.Fragment>
        
    )
    
}

