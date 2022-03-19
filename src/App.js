import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Container} from '@mui/material';





import Movies from './componets_app/movies/movies';
import Form_movies from './componets_public/form_movies/form_movies';
import Movie from './componets_app/movie/movie'
import  Navbar  from './componets_public/navbar/navbar' 


import './App.css';


function App() {
  
  return (    
      <BrowserRouter>
        <Navbar/>
        <Container>
            <Routes>
              <Route path='/' element={<Movies/>}/>
              <Route path="/new_movie" element={<Form_movies/>} />
              <Route path="/movie/:id" element={<Movie/>} />
            </Routes>      
        </Container>                                   
      </BrowserRouter>
      
  );
}

export default App;
