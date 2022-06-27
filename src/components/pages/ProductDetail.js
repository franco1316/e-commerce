import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProductToCartThunk, getProductsThunk } from '../../redux/actions';
import '../../styles/productDetail.css'
import iShoppingCart from '../../assets/shopping-cart.png';

const ProductDetail = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [dispatch]);

    const products = useSelector(state => state.products.data?.products)
    const [productsRecommended, setProductRecommended] = useState({})
    const productFound = products?.find(product => product.id === Number(id))
    const [quantityProduct, setQuantityProduct] = useState(0);
    
    useEffect(() => {
        if(productFound?.category.id)
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productFound?.category?.id}`)
        .then(res => setProductRecommended(res.data?.data?.products))
    }, [dispatch, productFound]);

    const addProductsToCart = (e) => {
        e.preventDefault()
        const cart = {
            id: productFound.id,
            quantity: quantityProduct
        }
        dispatch(addProductToCartThunk(cart))
        setQuantityProduct(0)
    }
    
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    
    return (
        <div>
            <div ref = {myRef}></div>
                {
                    productFound &&
                        <div className = 'product-detail'>
                            <span className = 'path '>
                                <div className = 'flex-container-path1'>
                                    <Link to = {"/"} >
                                        <p>Home</p>
                                    </Link>
                                    <div className = 'dot'></div>
                                    <p className = 'product-title'>
                                        <strong>
                                            {productFound.title}
                                        </strong>
                                    </p>
                                </div>
                            </span>
                            <div className = "center">
                                <section className = "product-image">
                                    <div className = 'container-img-products'>
                                        <img src = {productFound.productImgs} alt = "img-product" className = 'img-products'/>
                                    </div>
                                </section>
                                <section className = "product-info">
                                    <h2 className = 'product-title'>
                                        <strong>
                                            {productFound.title}
                                        </strong>
                                    </h2>
                                    <h3 className = 'product-description'>
                                        {productFound.description}
                                    </h3>
                                    <div className = "pq-flex">
                                        <div className = "flex-vertical">
                                            <h3 className = 'pq-label'>Price: </h3>
                                            <p className = 'pq price'>$
                                                {productFound.price}
                                            </p>
                                        </div>
                                        <form className = "favorites" onSubmit = {e => addProductsToCart(e)}>
                                            <div className = "input-container">
                                                <div className = "flex-vertical">
                                                    <label htmlFor = "pq" className = 'pq-label'>Quantity</label>
                                                    <input
                                                        className = 'quantity'
                                                        type = "text"
                                                        name = ""
                                                        id = "quantity"
                                                        onChange = {(e) => setQuantityProduct(e.target.value)}
                                                        value = {quantityProduct}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className = "container-button-add-cart">
                                            <button onClick = {e => addProductsToCart(e)} className = 'button-add-cart'>
                                                <p>Add to cart</p>
                                                <i className = 'fa-solid fa-cart-shopping img-i'></i>
                                            </button>
                                    </div>
                                </section>
                            </div>
                            <h2 className = 'red'>Discover similar items</h2>
                            <ul className = 'recomended-products'>
                                {
                                    productsRecommended.length > 0 &&
                                        productsRecommended.map(product => (
                                            <li key = {product.id}>
                                                {
                                                    <div>
                                                        <Link to = {`/product/${product.id}`} onClick = {executeScroll()} className = 'center'>
                                                                <div className = "container-product-recomended">
                                                                    <div className = 'container-img-products'>
                                                                        <img className = 'img-products' src = {product.productImgs} alt = "img" />
                                                                    </div>
                                                                    <div className = 'separator-horizontal'></div>
                                                                    <div className = "container-info-product">
                                                                        <h2 className = 'title'>{product.title}</h2>
                                                                        <h3 className = 'price'>Price
                                                                            <p className = "price-text">$ 
                                                                                {product.price}
                                                                            </p>
                                                                        </h3>
                                                                        <div className = "container-button">
                                                                            <button className = "button-shop-cart">
                                                                                <img src = {iShoppingCart} alt = "buy" className = "i-shop-cart" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        </Link>
                                                    </div>
                                                }
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                }
        </div>
    );
};

export default ProductDetail