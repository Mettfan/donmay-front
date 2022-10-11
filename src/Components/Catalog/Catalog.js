import React, { useState } from "react";
import './Catalog.css'
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getProducts } from "../../redux/actions/productActions";
import { fetchAllProducts } from "../../redux/slices/products/product";
import { fetchAllProducts  as fetchProducts, setCounter } from '../../features/products/productSlicetest';
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { checkIfProductIsUpdated } from "../UpdatePrice/UpdatePrice/updateTools";
import { useNavigate } from "react-router-dom";
import AddProductToCart from "../../app/AddProductToCart/AddProductToCart";
import CreateProduct from "../CreateProduct/CreateProduct";
export default function Catalog (props){
    let nav = useNavigate()
    let todaysDate = new Date()
    let editMode = props.editmode
    const productState = useSelector( state => state)
    const productList = productState.products.products
    let cookie = new Cookies()
    let store = useSelector( status => status )
    let dispatch = useDispatch()
    let [state, setState] = useState({
        store: store,
        response: cookie.get('response')
    })
    let response = state.response
    function downloadExcel () {
        dispatch( fetchAllProducts() )
    }
    function getAllProducts () {
        dispatch( fetchProducts() )
    }
    
    return (<>
    
        <div>
        {/* <div>
            <CreateProduct></CreateProduct>
        </div> */}
            <div>
                <button onClick={ () => downloadExcel() }> DOWNLOAD EXCEL </button>
                {/* {JSON.stringify(state.store)} */}
                
                
                <button onClick={ () => getAllProducts() }>  GET ALL PRODUCTS </button>

            </div>
            {productList.map( product => {
                // return  product[props.filter] === props.value &&
                return ( <div className="catalogContainer">
                    <span className="productBg">
                        <img className="productImage" src={productPlaceholder }/>
                        <div className="productInfoContainer">
                            <div onClick={()=>{ nav('/products/'+product.id) }} >{product.Producto}</div>
                            <div>{product['P. Venta']}</div>
                            {/* <AddProductToCart id={product.id} ></AddProductToCart> */}
                            {/* <RemoveProductToCart></RemoveProductToCart> */}
                            {editMode && <div>{product.id}</div>}
                            {editMode && <div>{checkIfProductIsUpdated(
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[1]),
                                Number(product['updatedAt']?.split('T')[0]?.split('-')[2]),
                                todaysDate.getMonth()+1,
                                todaysDate.getDate(),
                                'onlyNumbers'
                                
                                )}</div>}
                            {editMode && <div style={{
                                cursor: 'pointer'
                                
                            }} onClick={ () => dispatch(setCounter(product.id)) }>
                                
                                    Edit
                                
                                </div>}
                        </div>


                    </span>

                </div>)
            })}
        </div>

        

    </>)
}