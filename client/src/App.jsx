import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { About, Cart, ChangePassword, Checkout, Error, HomeLayout, Landing, Login, Orders, Products, Profile, Register, SingleProduct } from './pages';
import ErrorElement from './components/ErrorElement';

// loaders
import { loader as landingLoader } from './pages/Landing';
import{loader as singleProductLoader} from './pages/SingleProduct'
import{loader as ProductsLoader} from './pages/Products'
import{loader as checkOutLoader} from './pages/Checkout'
import{loader as orderLoader} from './pages/Orders'
import{loader as profileLoader} from './pages/Profile'


//actions
import{action as registerAction} from './pages/Register'
import{action as LoginAction} from './pages/Login'
import{action as reviewAction} from './pages/SingleProduct'
import{action as checkOutAction} from './components/CheckOutForm'
import { action as updateProfileAction } from './pages/Profile';
import { action as updatePasswordAction } from './pages/ChangePassword';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


import { store } from './store';
import Payment from './components/Payment';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
      loader:landingLoader(queryClient)
      },
      {
        path:'products',
        element:<Products/>,
        errorElement:<ErrorElement/>,
        loader:ProductsLoader(queryClient)
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        errorElement:<ErrorElement/>,
        loader:singleProductLoader(queryClient),
        action:reviewAction
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement:<ErrorElement/>
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement:<ErrorElement/>,
        loader:profileLoader,
        action:updateProfileAction
      },
      {
        path:'change-password',
        element:<ChangePassword/>,
        errorElement:<ErrorElement/>,
        action:updatePasswordAction

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
        loader:orderLoader(store)
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
  return (
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
)}
export default App;