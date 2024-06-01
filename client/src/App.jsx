import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Cart, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Register, SingleProduct } from './pages';
import ErrorElement from './components/ErrorElement';

// loaders
import { loader as landingLoader } from './pages/Landing';
import{loader as singleProductLoader} from './pages/SingleProduct'
import{loader as ProductsLoader} from './pages/Products'
import{loader as checkOutLoader} from './pages/Checkout'

//actions
import{action as registerAction} from './pages/Register'
import{action as LoginAction} from './pages/Login'
import{action as reviewAction} from './pages/SingleProduct'
import{action as checkOutAction} from './components/CheckOutForm'
import { store } from './store';
import Payment from './components/Payment';

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
      index:true,
      element:<Landing/>,
      errorElement:<ErrorElement/>,
      loader:landingLoader
      },
      {
        path:'products',
        element:<Products/>,
        errorElement:<ErrorElement/>,
        loader:ProductsLoader
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement:<ErrorElement/>,
        loader:singleProductLoader,
        action:reviewAction
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement:<ErrorElement/>
      },
      { path: 'about', 
      element: <About />,
      errorElement:<ErrorElement/>
    },
      {
        path: 'checkout',
        element: <Checkout />,
        errorElement:<ErrorElement/>,
        loader:checkOutLoader(store),
        action:checkOutAction(store)
      },
      {
        path: 'orders',
        element: <Orders />,
        errorElement:<ErrorElement/>,
      },
      {
        path: 'payment',
        element: <Payment />,
        errorElement:<ErrorElement/>,
       

       
      },
    ]
  }
  ,
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action:LoginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    action:registerAction,
    errorElement: <Error />,
  },
])

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;