import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Cart, ChangePassword, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Profile, Register, SingleProduct } from './pages';
import ErrorElement from './components/ErrorElement';

// loaders
import { loader as landingLoader } from './pages/Landing';
import { loader as productsLoader } from './pages/Products';

import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as checkOutLoader } from './pages/Checkout'
import { loader as orderLoader } from './pages/Orders'
import { loader as profileLoader } from './pages/Profile'


//actions
import { action as registerAction } from './pages/Register'
import { action as LoginAction } from './pages/Login'
import { action as checkOutAction } from './components/CheckOutForm'
import { action as updateProfileAction } from './pages/Profile';
import { action as updatePasswordAction } from './pages/ChangePassword';
import { store } from './store';
import Payment from './components/Payment';



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
   
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader:landingLoader,
        errorElement: <ErrorElement />,
       
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <ErrorElement />,
        loader:productsLoader
       
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader,
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement: <ErrorElement />
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorElement />,
        loader: profileLoader,
        action: updateProfileAction
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
        errorElement: <ErrorElement />,
        action: updatePasswordAction

      },
      {
        path: 'about',
        element: <About />,
        errorElement: <ErrorElement />
      },
      {
        path: 'checkout',
        element: <Checkout />,
        errorElement: <ErrorElement />,
        loader: checkOutLoader(store),
        action: checkOutAction(store)
      },
      {
        path: 'orders',
        element: <Orders />,
        errorElement: <ErrorElement />,
        loader: orderLoader(store)
      },
      {
        path: 'payment',
        element: <Payment />,
        errorElement: <ErrorElement />,



      },
    ]
  }
  ,
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: LoginAction(store)
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
    errorElement: <Error />,
  },
])

const App = () => {
  return (

    <RouterProvider router={router} />

  )
}
export default App;