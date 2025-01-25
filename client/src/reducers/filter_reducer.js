import {
    LOAD_PRODUCTS,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    GET_FEATURED_PRODUCTS
} from '../actions'

const filter_reducer = (state, action) => {
    if (action.type === LOAD_PRODUCTS) {
        let maxPrice = action.payload.map((p) => p.price)
        maxPrice = Math.max(...maxPrice)

        return {
            ...state,
            all_products: [...action.payload],
            filtered_products: [...action.payload],
            filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
            totalProducts: action.payload.length
        }
    }

    if (action.type === UPDATE_SORT) {
        return { ...state, sort: action.payload }
    }

    if (action.type === UPDATE_FILTERS) {
        const { name, value } = action.payload
        return { ...state, filters: { ...state.filters, [name]: value } }
    }
    if (action.type === FILTER_PRODUCTS) {
        const { all_products } = state
        const { category, company, text, freeShipping, price } = state.filters
        let tempProducts = [...all_products]

        if (text) {
            tempProducts = tempProducts.filter((product) =>
                product.name.toLowerCase().includes(text.toLowerCase())
            )
        }
        if (category !== 'all') {
            tempProducts = tempProducts.filter((product) => product.category == category)
        }

        if (company !== 'all') {
            tempProducts = tempProducts.filter((product) => product.company == company)
        }

        if (freeShipping) {
            tempProducts = tempProducts.filter((product) => product.freeShipping === true)
        }

        tempProducts = tempProducts.filter((product) => product.price <= price)
        return { ...state, filtered_products: tempProducts, totalProducts: tempProducts.length }
    }

    if (action.type === SORT_PRODUCTS) {
        const { sort, filtered_products, totalProducts } = state
        let tempProducts = []
        if (sort === 'price-lowest') {
            tempProducts = filtered_products.sort((a, b) => a.price - b.price)

        }
        if (sort === 'price-highest') {
            tempProducts = filtered_products.sort((a, b) => b.price - a.price)

        }

        if (sort === 'a-z') {
            tempProducts = filtered_products.sort((a, b) => a.name.localeCompare(b.name))

        }

        if (sort === 'z-a') {
            tempProducts = filtered_products.sort((a, b) => b.name.localeCompare(a.name))

        }

        if (sort === 'latest') {
            tempProducts = [...state.all_products]

        }


        return { ...state, filtered_products: tempProducts, totalProducts: tempProducts.length }

    }

    if(action.type === CLEAR_FILTERS){
    return{
        ...state,
        filters: {
            ...state.filters,
            text: '',
            company: 'all',
            category: 'all',
            color: 'all',
            min_price: 0,
            max_price: state.filters.max_price,
            price: 0,
            freeShipping: false,
        },
    }
    }

    if(action.type === GET_FEATURED_PRODUCTS){
        
        const { all_products } = state
        let tempProducts = [...all_products]


        tempProducts= tempProducts.filter((product)=>product.featured === true).slice(0,4)
        return{...state,featured_products:tempProducts}
    }

}


export default filter_reducer