import { createContext, useContext, useEffect, useReducer } from "react"
import reducer from '../reducers/filter_reducer'
import {
    LOAD_PRODUCTS,
    SET_GRIDVIEW,
    SET_LISTVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    GET_FEATURED_PRODUCTS
} from '../actions'

const initialState = {
    filtered_products: [],
    all_products: [],
    totalProducts: 0,
    sort: 'latest',
    featured_products:[],
    filters: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        max_price: 0,
        price: 0,
        freeShipping: false,
    },
}

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getAllProducts = (products) => {

        dispatch({ type: LOAD_PRODUCTS, payload: products })

    }
    const getFeaturedProducts=()=>{
        dispatch({ type: GET_FEATURED_PRODUCTS})

    }
    useEffect(() => {
      
            dispatch({ type: FILTER_PRODUCTS });
            dispatch({ type: SORT_PRODUCTS });
        
    }, [ state.sort, state.filters]);
    
    
   /*   useEffect(() => {
        dispatch({ type: FILTER_PRODUCTS })
        dispatch({ type: SORT_PRODUCTS })
       
    }, [state.sort,state.filters])  */

    const updateSort = (e) => {
        const value = e.target.value
        dispatch({ type: UPDATE_SORT, payload: value })
    }

    const updateFilters = (e) => {
        let name = e.target.name
        let value = e.target.value
      
      if (name === 'freeShipping') {
        value = e.target.checked 
      } 
      if (name === 'price') {
        value = Number(value)
      }      
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } })




    }

    const clearFilters = () => { 
        dispatch({ type: CLEAR_FILTERS })
    }
    return (
        <FilterContext.Provider value={{ ...state, getAllProducts, updateSort, updateFilters, clearFilters ,getFeaturedProducts}}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}