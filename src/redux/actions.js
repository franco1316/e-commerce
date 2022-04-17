import axios from "axios"

export const actions={
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART",
    setPurchases: "SET_PURCHASES"
}

const getConfig=()=>({
    headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` }
})

export const setProducts = (products) => ({
    type: actions.setProducts, 
    payload: products
})

export const setIsLoading = (isLoading) => ({
    type: actions.setIsLoading, 
    payload: isLoading
})

export const setCategories = (categories) => ({
    type: actions.setCategories, 
    payload: categories
})

export const setCart = (cart) => ({
    type: actions.setCart,
    payload: cart
})

export const setPurchases = (purchases) => ({
    type: actions.setPurchases, 
    payload: purchases
})

export const getProductsThunk=()=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
        .then(res=>dispatch(setProducts(res.data)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getCategoriesThunk=()=>{
    return dispatch=>{
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res=>dispatch(setCategories(res.data)))
    }
}

export const filterCategoryThunk=(id)=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
        .then(res=>dispatch(setProducts(res.data)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const filterTitleThunk=(search)=>{
    return dispatch=>{
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${search}`)
        .then(res=>dispatch(setProducts(res.data)))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const loginThunk = (credentials) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const addProductToCartThunk = (cart) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', cart, getConfig())
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getShoppingCartProductsThunk = () =>{
    return dispatch =>{
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
        .then(res=>dispatch(setCart(res.data.data.cart)))
        .catch(error=>{
            if(error.response?.status===404){
                dispatch(setCart([]))
            }
        })
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const DeleteProductShoppingCartThunk = (id) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(()=>dispatch(getShoppingCartProductsThunk()))
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const getPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
        .then(res=>dispatch(setPurchases(res.data.data.purchases)))
        .catch(error=>{
            if(error.response?.status===404){
                dispatch(setPurchases([]))
            }
        })
        .finally(()=>dispatch(setIsLoading(false)))
    }
}

export const PurchaseProductsInCartThunk = (cart) => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', cart, getConfig())
        .catch(error=>{
            if(error.response?.status===404){
                dispatch(setPurchases([]))
            }
        })
        .finally(()=>dispatch(setIsLoading(false)))
    }
}