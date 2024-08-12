import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// import RootLayout from './Components/RootLayout';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  let router=createBrowserRouter(
    [
      {
        path:"",
        element:<Register/>
      },

         {
            path:"Login",
            element:<Login/>
          },
          ,{
            path:'home',
            element:<Home/>
          },
          {
            path:'admin',
            element:<Admin/>
          }

         
        
        
      
      
       
    ]
  )
  return (
    <div >
    <RouterProvider router={router}/>
    </div>
  );
}

export default App;