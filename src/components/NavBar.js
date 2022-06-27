import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesThunk, getShoppingCartProductsThunk, loginThunk } from '../redux/actions';
import { Shop } from '../components'
import { useNavigate } from 'react-router-dom';
import '../styles/navBar.css';

const NavBar = () => {

    const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    const [loginError, setLoginError] = useState("");
    const [createError, setCreateError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cleanBoxes = () => {
        setFirstName(""); setLastName("")
        setEmail(""); setPassword("")
        setPhone(""); setRole("")
    }

    const createUser = (e) => {
        e.preventDefault()

        const user = {
            firstName, lastName,
            email, password,
            phone, role
        }

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', user)
        .then(res =>
            setCreateError(res.data.status)
        )
        .catch(error => {
            error.response.data.message === 'Must be 10 digits long' ? 
                setCreateError('Phone length ' + error.response.data.message + ' for this app')
            :
                setCreateError(error.response.data.message)
        })

        cleanBoxes()
    }

    const login = (e) => {
        e.preventDefault()

        const credentials = {
            email, password
        }

        dispatch(loginThunk(credentials))
        .then(res => {
            localStorage.setItem("token", res.data.data.token)
            setLoginError("")
        })
        .catch(error => {
            setLoginError(error.response.data.message);
        })

        cleanBoxes()
    }

    const updateCreateUser = (e) => {
        if(e !== null)
            setIsCreateUserOpen(!isCreateUserOpen)
        setIsLoginOpen(false)
        setCreateError("")
    }

    const updateLoginUser = (e) => {
        if(e !== null)
            setIsLoginOpen(!isLoginOpen)
        setIsCreateUserOpen(false)
        setLoginError("")
    }

    const updateShoppingCart = (e) => {
        if(e !== null){
            setIsShoppingCartOpen(!isShoppingCartOpen)
            dispatch(getShoppingCartProductsThunk())
        }
    }

    const showMyPurchases = (e) => {
        if(e){
            dispatch(getPurchasesThunk())
            navigate('/purchases')
        }
    }

    return (
        <div className={`nav-form
            ${isCreateUserOpen ? 'open-create-user' : ''}
            ${isLoginOpen ? 'open-login' : ''}`}
        >
            <nav className = 'nav-bar'>
                <section className = 'title'>
                    <h1 className = 'title-text'>
                        <strong className = "strong-title">e-commerce</strong>
                    </h1>
                </section>
                <section className = "actions flex">
                    <div className = 'separator-vertical first-separator-vertical'></div>
                    <button onClick = {e => updateLoginUser(e)} className = 'button-actions'>
                        <i className = {`fa-solid fa-user img-i ${(isLoginOpen || isCreateUserOpen) ? 'i-icon-selected' : 'i-icon'}`}></i>
                    </button>
                    <div className = 'separator-vertical'></div>
                    <button className = 'button-actions' onClick = {e => showMyPurchases(e)}>
                        <i className = 'fa-solid fa-shop img-i i-icon'></i>
                    </button>
                    <div className = 'separator-vertical'></div>
                    <button onClick = {e => updateShoppingCart(e)} className = 'button-actions'>
                        <i className = {`fa-solid fa-cart-shopping img-i ${isShoppingCartOpen ? 'i-icon-selected' : 'i-icon'} `}></i>
                    </button>
                </section>
            </nav>
            <hr className = 'separator-horizontal'/>
            <form action = "" onSubmit = {createUser} className = {`login ${isCreateUserOpen && 'open'}`}>
                <section className = "grid-form">
                    <article className = "elements">
                        <label htmlFor = "first-name">First Name: </label>
                        <input
                            type = "text"
                            placeholder = 'First name'
                            name = "first-name"
                            id = "first-name"
                            onChange = {(e) => setFirstName(e.target.value)}
                            value = {firstName}
                        />
                    </article>
                    <article className = "elements">
                        <label htmlFor = "last-name">Last Name: </label>
                        <input
                            type = "text"
                            placeholder = 'Last name'
                            name = "last-name"
                            id = "last-name"
                            onChange = {(e) => setLastName(e.target.value)}
                            value = {lastName}
                        />
                    </article>
                    <article className = "elements">
                        <label htmlFor = "email">Email: </label>
                        <input
                            type = "email"
                            placeholder = 'Email'
                            name = "email"
                            id = "email"
                            onChange = {(e) => setEmail(e.target.value)}
                            value = {email}
                        />
                    </article>
                    <article className = "elements">
                        <label htmlFor = "password">Password: </label>
                        <input
                            type = "password"
                            placeholder = 'Password'
                            name = "password"
                            id = "password"
                            onChange = {(e) => setPassword(e.target.value)}
                            value = {password}
                        />
                    </article>
                    <article className = "elements">
                        <label htmlFor="phone">Phone: </label>
                        <input
                            type = "text"
                            placeholder = 'Phone'
                            name = "phonee"
                            id = "phone"
                            onChange = {(e) => setPhone(e.target.value)}
                            value = {phone}
                        />
                    </article>
                    <article className = "elements">
                        <label htmlFor = "role">Role: </label>
                        <input
                            type = "text"
                            placeholder = 'Role'
                            name = "role"
                            id = "role"
                            onChange = {(e) => setRole(e.target.value)}
                            value = {role}
                        />
                    </article>
                </section>
                    {
                        isCreateUserOpen &&
                            (
                                <p className = 'message-error'>
                                    {createError}
                                </p>
                            )
                    }
                <button className = 'form-submit'>Create New User</button>
                <span className = "flex-container">
                    <p>Have an account?</p>
                    <button onClick = {e => updateLoginUser(e)}>
                        Log in
                    </button>
                </span>
            </form>

            <form action = "" onSubmit = {login} className = {`login ${isLoginOpen && 'open'}`}>
                {
                    localStorage.getItem("token") ?
                        <button onClick={() => localStorage.setItem("token", "")}>
                            {localStorage.getItem("token") && "Log out"}
                        </button>
                    : (
                        <>
                            <section className = "grid-form">
                                    <article className = "elements">
                                        <label htmlFor = "email">Email: </label>
                                        <input
                                            type = "email"
                                            placeholder = 'Email'
                                            name = "email"
                                            id = "login-email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value = {email}
                                        />
                                    </article>
                                    <article className = "elements">
                                        <label htmlFor = "password">Password: </label>
                                        <input
                                            type = "password"
                                            placeholder = 'Password'
                                            name = "password"
                                            id = "login-password"
                                            onChange = {(e) => setPassword(e.target.value)}
                                            value = {password}
                                        />
                                    </article>
                            </section>
                            {
                                isLoginOpen &&
                                    (
                                        <p className='message-error'>
                                            {loginError}
                                        </p>
                                    )
                            }
                            <button className = 'form-submit'>Login</button>
                            <span className = "flex-container">
                                <p>Don't have an account?</p>
                                <button onClick = {e => updateCreateUser(e)}>Sign up</button>
                            </span>
                        </>
                    )
                }
            </form>
            
            <Shop isOpen = {isShoppingCartOpen}/>
        </div>
    );
};

export default NavBar;