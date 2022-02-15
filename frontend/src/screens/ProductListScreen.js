import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductListScreen() {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listProducts());
    }, [dispatch]);

    const deleteHandler = () => {
      /// TODO: dispatch delete action
    };
    
    return (
      <div>
        <h1>Proizvodi</h1>
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
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>

                    <button type="button" className="small"
                        onClick={() =>navigate(`/product/${product._id}/edit`)}>
                        Izmijenite
                    </button>

                    <button type="button" className="small" 
                        onClick={() => deleteHandler(product)}>
                        Izbrišite
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