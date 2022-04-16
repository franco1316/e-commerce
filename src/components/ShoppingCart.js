import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteProductShoppingCartThunk, PurchaseProductsInCartThunk, setCart } from '../redux/actions';
import '../styles/shoppingCart.css';

const ShoppingCart = ({isOpen}) => {

    const cart=useSelector(state=>state.cart)
    let total = 0.0;
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const deleteProduct = (id) => {
        dispatch(DeleteProductShoppingCartThunk(id))
    }

    const checkoutCar = (e) => {
        if(e){
            dispatch(PurchaseProductsInCartThunk(cart))
            dispatch(setCart([]))
        }
    }

    return (
        <div className={`shopping-cart ${isOpen?'open':'close'}`}>
            <header className='header'>
                <h2 className='title'>Shopping Cart </h2>
            </header>
            <main className='main'>
                <ul className='ul'>
                    {
                        cart.products?.map(product=>(
                            <li
                                className='item'
                                key={product.id}
                                onClick={()=>navigate(`/product/${product.productsInCart.productId}`)}
                            >
                                <div className="horizontal-flex">
                                    <div className="vertical-flex">
                                        <h3 className='brand'>{product.brand}</h3>
                                        <h4 className='name'>{product.title}</h4>
                                        <div className="quantity">
                                            <p>{product.productsInCart.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="container-button">
                                        <button
                                            className='button-delete'
                                            onClick={()=>deleteProduct(product.productsInCart.productId)}
                                        >
                                            <i className='fa-regular fa-trash-can i-delete' alt="Delete"></i>
                                        </button>
                                    </div>
                                    
                                </div>
                                {
                                    <div className="hide">
                                        {total=parseFloat(total)+(parseFloat(product.price)*Number(product.productsInCart.quantity))}
                                    </div>
                                }
                               <div className="flex-item">
                                   <h5 className='total-item'>Total:</h5>
                                    <p className='total-content'>
                                        <strong>${product.price}</strong>
                                    </p>
                               </div>
                            </li>
                        ))
                    }
                </ul>
            </main>
            <hr />
            <footer className="footer-shop">
                
                <div className="flex-horizontal">
                    <h3 className='total'>Total: </h3>
                    <p>
                        <strong>${total}</strong>
                    </p>
                </div>
                <button className='checkout' onClick={e=>checkoutCar(e)}>
                    Checkout
                </button>
                    
            </footer>

        </div>
    );
};

export default ShoppingCart;