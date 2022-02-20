import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const navigate = useNavigate();

    const productCreate = useSelector((state) => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate,
        product: createdProduct,} = productCreate;

    const productDelete = useSelector((state) => state.productDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successCreate){
            dispatch({type: PRODUCT_CREATE_RESET});
            navigate(`/product/${createdProduct._id}/edit`);
        }

        if(successDelete){
            dispatch({type: PRODUCT_DELETE_RESET});
        }

        dispatch(listProducts({}));
    }, [dispatch, successCreate, navigate, createdProduct, successDelete]);

    const deleteHandler = (product) => {
        if(window.confirm('Da li ste sigurni da želite obrisati odabrani proizvod?')){
            dispatch(deleteProduct(product._id));
        }
    };

    const createHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div>
            <div className='row'>
                <label></label>
                <center><h1>PROIZVODI</h1></center>
                <button type='button' className='primary' onClick={createHandler}>
                        Dodaj proizvod
                </button>
            </div>

            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}

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