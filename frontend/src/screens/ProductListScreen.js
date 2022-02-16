import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const navigate = useNavigate();

    const productCreate = useSelector((state) => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate,
        product: createdProduct,} = productCreate;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            navigate(`/product/${createdProduct._id}/edit`);
        }
        dispatch(listProducts());
    }, [dispatch, successCreate, navigate, createdProduct]);

    const deleteHandler = () => {
        /// TODO: dispatch delete action
    };

    const createHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div>
            <div className='row'>
                <h1>Proizvodi</h1>
                <button type='button' className='primary' onClick={createHandler}>
                    Dodaj proizvod
                </button>
            </div>
            {loadingCreate && (<LoadingBox></LoadingBox>)}
            {errorCreate && (<MessageBox variant='danger'>{errorCreate}</MessageBox>)}
            {loading ? (<LoadingBox></LoadingBox>)
            : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>IME</th>
                    <th>CIJENA</th>
                    <th>KATEGORIJA</th>
                    <th>PROIZVOĐAČ</th>
                    <th>IZMJENE</th>
                </tr>
                </thead>

                <tbody>
                {products.map((product) =>(
                    <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>

                        <button type="button" className="small"
                            onClick={() =>navigate(`/product/${product._id}/edit`)}>
                            Izmijeni
                        </button>

                        <button type="button" className="small" 
                            onClick={() => deleteHandler(product)}>
                            Izbriši
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    );
  }