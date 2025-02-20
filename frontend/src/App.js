import './App.css';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
  

import Login from './components/Login';
import Signup from './components/Signup';
import Users from './components/Users';
import Homepage from './components/HomePage';
import Header from './components/Header';


const Applayout = () => {
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
};

const App = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/users',
          element: <Users />,
        },
        {
          path: '/',
          element: <Homepage />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
