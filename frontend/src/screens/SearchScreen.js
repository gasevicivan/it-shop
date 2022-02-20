import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen() {
    const navigate = useNavigate();
    const{name = 'all', category = 'all', min = 0, max = 0, rating = 0, order='newest'} = useParams();
 
    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;

    const dispatch = useDispatch();

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {loading: loadingCategories, error: errorCategories, categories} = productCategoryList;


    useEffect( () =>{
            
        dispatch(listProducts({name: name !== 'all' ? name : '', category: category !== 'all' ? category : '',
                                min, max, rating, order}));
    }, [dispatch, name, category, min, max, rating, order]);

    const getFilterUrl = (filter) =>{
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    }

    return (
        <div>
            <div className='row'>
                {loading? (<LoadingBox></LoadingBox>)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                : (
                    <div>Pronađeno proizvoda: {products.length}</div>
                )}

                <div>
                    Poredaj po{' '}
                    <select value={order} 
                        onChange={ (e) => navigate(getFilterUrl({order: e.target.value}))}>
                        <option value='newest'>NAJNOVIJE</option>
                        <option value='lowest'>CIJENI - NAJNIŽOJ</option>
                        <option value='highest'>CIJENI - NAJVIŠOJ</option>
                        <option value='toprated'>OCJENI KORISNIKA</option>
                    </select>
                </div>
            </div>

            <div className='row top'>
                <div className='col-1'>
                    <h3>KATEGORIJE</h3>

                    <div>
                        {loadingCategories? (<LoadingBox></LoadingBox>)
                        : errorCategories? (<MessageBox variant='danger'>{errorCategories}</MessageBox>)
                        : (
                        <ul className='categories'>
                            <li>
                                <Link className={'all' === category ? 'active' : ''}
                                    to={getFilterUrl({category: 'all'})}>
                                        Sve kategorije
                                </Link>
                            </li>
                            {categories.map((c) =>(
                                <li key={c}>
                                    <Link className={c === category ? 'active' : ''}
                                        to={getFilterUrl({category: c})}>
                                            - {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                
                
                <div>
                    <br />
                    <h3>CIJENA</h3>
                    <ul>
                        {prices.map((p) =>(
                            <li key={p.name}>
                                <Link className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                                    to={getFilterUrl({min: p.min, max: p.max})}>
                                    {p.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div>
                    <br />
                    <h3>OCJENA KORISNIKA</h3>
                    <ul>
                        {ratings.map((r) =>(
                            <li key={r.name}>
                                <Link className={`${r.rating}` === `${rating}` ? 'active' : ''}
                                    to={getFilterUrl({rating: r.rating})}>
                                        <Rating caption={' & više'} rating={r.rating}></Rating>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='col-3'>
                {loading? (<LoadingBox></LoadingBox>)
                    : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                    : (
                        <>
                            {products.length === 0 && (
                                <MessageBox>Nisu pronađeni proizvodi koji odgovaraju vašem odabiru.</MessageBox>
                            )}
                            <div className='row center'>
                                {products.map( (product) =>(
                                    <Product key={product._id} product={product}></Product>
                                ))}
                            </div>
                        </>
                    )}
            </div>
            </div>
        </div>
  )
}
