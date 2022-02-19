import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen() {
    const{ name } = useParams() || {name: 'all'};

    const productList = useSelector((state) => state.productList);
    const {loading, error, products} = productList;

    const dispatch = useDispatch();
    useEffect( () =>{
        dispatch(listProducts(name));
    }, [dispatch, name]);

    return (
        <div>
            <div className='row'>
                {loading? (<LoadingBox></LoadingBox>)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                : (
                    <div>Pronađeno je {products.length} proizvoda.</div>
                )}
            </div>

            <div className='row top'>
                <div className='col-1'>
                    <h3>Kategorije</h3>
                    <ul>
                        <li>Desktop računari</li>
                    </ul>
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
