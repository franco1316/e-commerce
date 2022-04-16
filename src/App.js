import { HashRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import { Home, ProductDetail, Purchases } from './components/pages'
import {Footer, LoadingScreen, NavBar} from './components';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  const isLoading=useSelector(state=>state.isLoading)
 
 
  return (
    <HashRouter>
      <div className="App">
        {isLoading&&<LoadingScreen/>}
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/purchases" element={<Purchases/>}></Route>
          </Route>
        </Routes>
        {
          !isLoading&&
          <Footer/>
        }
      </div>
    </HashRouter>
  );
}

export default App;
