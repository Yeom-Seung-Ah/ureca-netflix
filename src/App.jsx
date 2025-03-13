import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import MoviePage from './pages/Movies/MoviePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
 

  return (
    
        <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Homepage/>}/> //index 를 쓰면 부모의 path와 같음
          {/* <Route path="movies"> // 다른 페이지 추가할때 편함
            <Route index element={<MoviePage/>}/>
            <Route path=":id" element={<MovieDetail/>}/>
                
          </Route> */}
          
      </Route>


      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
        
    
  )
}

export default App
