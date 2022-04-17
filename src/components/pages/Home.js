import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProductToCartThunk, filterCategoryThunk, filterTitleThunk, getCategoriesThunk, getProductsThunk, setProducts } from '../../redux/actions';
import '../../styles/home.css';
import searchIcon from '../../assets/search.png';
import iClose from '../../assets/close.png';
import iFilter from '../../assets/filter.png';
import iShoppingCart from '../../assets/shopping-cart.png';

const Root = () => {

    const specialCharacters = {
        lessThan: '<',
        space: ' ',
        greaterThan: '>'

    }

    const dispatch=useDispatch()
    const [search, setSearch] = useState("")
    const [isPriceDown, setIsPriceDown] = useState(true);
    const [isCategoryDown, setIsCategoryDown] = useState(true)

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    const [screenSize, setScreenSize] = useState(0);

    let productsFiltered=[]
    const products = useSelector(state=>state.products.data?.products)
    const categories=useSelector(state=>state.categories.data?.categories)
    

    useEffect(() => {
        dispatch(getProductsThunk())
        dispatch(getCategoriesThunk())
    }, [dispatch]);

    useEffect(() => {
        const resize = () => {
            setScreenSize(window.innerWidth)
            if(window.innerWidth>991){
                setIsFilterOpen(true)
            }
            else{
                setIsFilterOpen(false)
            }
        }
        window.addEventListener('resize', resize)
        return ()=> {
            window.removeEventListener('resize', resize)
        }
    }, [screenSize]);

    const searchProducts=(e)=>{
        e.preventDefault()
        dispatch(filterTitleThunk(search))
        setSearch("")
    }

    const filterProducts=(e, from, to)=>{
        e.preventDefault()
        let index=0
        for(let i = 0; i<products.length; i++){
            const price=products?.[i]?.price
            if(parseFloat(price)<=parseFloat(to) && parseFloat(price)>=parseFloat(from)){
                productsFiltered[index]=products[i]
                index++;
            }
        }
        console.log(productsFiltered);
        setFromPrice("")
        setToPrice("")
    }

    const addProductsToCart = (e, id) => {
        e.preventDefault()
        const productFound=products?.find(product=>product.id===Number(id))
        const cart={
            id: productFound.id,
            quantity: 1
        }
        dispatch(addProductToCartThunk(cart))
    }

    return (
        <div className='home'>
            {
                (isFilterOpen || window.innerWidth>991) &&
                <aside className="filters-module">
                    <div className="position-close">
                        <div className="button-container x-container">
                            <button onClick={()=>setIsFilterOpen(false)}
                                className="button-close x-container">
                                <img src={iClose} alt="close" className="i-close" />
                            </button>
                        </div>
                    </div>
                    <nav className="filters">
                        <h1 className='filters-text'>Filters</h1>
                        <section className="subtitle">
                            <header>
                                <span className='flex'>
                                    <h2 className='subtitle-text'>Price</h2>
                                    <div className='drop-down'>
                                        
                                        <input type="checkbox"
                                            onClick={e=>setIsPriceDown(e.target.checked)}
                                            onChange={()=>''}
                                            checked={isPriceDown}
                                            className='select-input'
                                        />
                                        <p className='symbol'>
                                            {specialCharacters.greaterThan}
                                        </p>
                                    </div>
                                </span>
                            </header>
                            <hr className='vertical-margin'/>
                            <section className="price-content">
                                <span>
                                    <h3>
                                        <label htmlFor="from">From</label>
                                    </h3>
                                    <input
                                        type="number"
                                        id="from"
                                        onInput={e=>setFromPrice(e.target.value)}
                                        value={fromPrice}
                                     />
                                </span>
                                <div className='vertical-margin'></div>
                                 <span>
                                     <h3>
                                        <label htmlFor="from">To</label>
                                    </h3>
                                    <input
                                        type="number"
                                        id="to"
                                        onInput={e=>setToPrice(e.target.value)}
                                        value={toPrice}
                                     />
                                 </span>
                                 <div className="container-button">
                                     <button className="button-filter" onClick={e=>filterProducts(e, fromPrice, toPrice)}>
                                         <p className="filter-price">
                                             Filter price
                                        </p>
                                     </button>
                                 </div>
                                 <div className="box-hide"></div>
                                 <div 
                                    className={`${
                                        !isPriceDown ?
                                            'drop-up-content'
                                            :'drop-down-content'
                                        } box-hide`}>
                                            
                                </div>
                            </section>
                        </section>
                        <section className={`subtitle vertical-padding ${!isPriceDown?'slow-up':'slow-down'}`}>
                            <div className="category-content">
                            
                                <header>
                                    <span className='flex'>
                                        <h2 className='subtitle-text'>Category</h2>
                                        <div className='drop-down'>
                                        <input type="checkbox"
                                                onClick={e=>setIsCategoryDown(e.target.checked)}
                                                onChange={()=>''}
                                                checked={isCategoryDown}
                                                className='select-input'
                                            />
                                            <p className='symbol'>
                                                {specialCharacters.greaterThan}
                                            </p>
                                        </div>
                                    </span>
                                </header>
                                <hr className='vertical-margin' />
                                <ul className='category-list'>
                                    {
                                        categories?.map(category=>(
                                            <li key={category.id} 
                                                >
                                                <button className='button-category'
                                                    onClick={()=>dispatch(filterCategoryThunk(category.id))}
                                                >
                                                    <h3 className='category-name'>{category.name}</h3>
                                                </button>
                                            </li>
                                        ))
                                    }
                                    <div
                                        className={`${
                                            !isCategoryDown ?
                                                'drop-up-content'
                                                :'drop-down-content'
                                            } box-hide`}>
                                
                                    </div>
                                </ul>
                            </div>
                        </section>
                    </nav>
                </aside>
            }

            <main className='main'>
                
                <header className='header'>
                    <form action="" onSubmit={searchProducts} className='form-flex'>
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            onChange={e=>setSearch(e.target.value)}
                            value={search}
                            className='input-search'
                        />
                        <div className="box-search">
                            <img src={searchIcon} alt="search" className="i-search"/>
                            <button className='button-search'></button>
                        </div>
                    </form>
                    {
                        !isFilterOpen &&
                        <div className="container-button">
                            <button onClick={()=>setIsFilterOpen(true)}
                                className="button-filters flex-button">
                                <div className='container-i-filters'>
                                    <img src={iFilter} alt="filters" className="i-filters" />
                                </div>
                                <p>Filters</p>
                            </button>
                        </div>
                    }
                    
                </header>
                
                    <ul className='products'>
                        {
                            
                            
                            (products?.length===0 && productsFiltered.length===0)?(
                                <p>Don't found any result with this search</p>
                            ):(
                                products?.map(product=>(
                
                                    <li key={product.id}>
                                        {
                                            <div className='product'>
                
                                                <Link to={`/product/${product.id}`}>
                                                    <div className='container-img-products'>
                                                        <img className='img-products' src={product.productImgs} alt="img" />
                                                    </div>
                                                    <div className='separator-horizontal'></div>
                                                    <div className="container-info-product">
                                                    
                                                        <h2 className='title'>{product.title}</h2>
                                                        <h3 className='price'>Price
                                                            <p className="price-text">
                                                                $ {product.price}
                                                            </p>
                                                        </h3>
                                                        <div className="container-button">
                                                            <button className="button-shop-cart" onClick={e=>addProductsToCart(e, product.id)}>
                                                                <img src={iShoppingCart} alt="buy" className="i-shop-cart" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </li>
                                ))
                            )
                            }
                            
                            { 
                                productsFiltered.length>0 &&(
                                productsFiltered?.map(product=>(
                
                                    <li key={product.id}>
                                        {
                                            <div className='product'>
                
                                                <Link to={`/product/${product.id}`}>
                                                    <div className='container-img-products'>
                                                        <img className='img-products' src={product.productImgs} alt="img" />
                                                    </div>
                                                    <div className='separator-horizontal'></div>
                                                    <div className="container-info-product">
                                                    
                                                        <h2 className='title'>{product.title}</h2>
                                                        <h3 className='price'>Price
                                                            <p className="price-text">
                                                                $ {product.price}
                                                            </p>
                                                        </h3>
                                                        <div className="container-button">
                                                            <button className="button-shop-cart" onClick={e=>addProductsToCart(e, product.id)}>
                                                                <img src={iShoppingCart} alt="buy" className="i-shop-cart" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        }
                                    </li>
                                ))
                            )
                        }
                    
                    </ul>
            </main>
        </div>
    );
};

export default Root;