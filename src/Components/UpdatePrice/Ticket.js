import React, { useEffect } from "react";
import './Ticket.css'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productPlaceholder from '../../Assets/productPlaceholder.png'
import { Example } from "./PrintTest";
import { addProductToGlobalTicket, removeProductFromGlobalTicket } from "../../features/products/productSlicetest";
import Draggable from 'react-draggable'
import Calculator from "../Calculator/Calculator";
export function Ticket(){

    let [state, setState] = useState({
        ticketProducts: [],
        ticketSelectedProduct: {},
        total: 0,
        change: 0,
        payment: 0
    })
    let dispatch = useDispatch()
    let ticketProducts = useSelector( state => state.products.ticketProducts)
    let selectedProductCounter = useSelector( state => state.products.productSelectedCounter)
    let selectedProduct = useSelector( state => state.products.selectedProduct)
    let globalTicket = useSelector( state => state.products.ticketProducts)
    let userPayment = useSelector(state => state.products.payment)
    useEffect(() => {
        calculateChange(userPayment)
        setState({...state,
            payment: userPayment
        })
    }, [userPayment])
    useEffect(()=> {
        console.log(ticketProducts);
        if(selectedProduct['P. Venta']){
            addProductToTicket(selectedProduct)

        }

    }, [selectedProduct])
    useEffect(()=> {
        setState({
            ...state,
            ticketSelectedProduct: ticketProducts[selectedProductCounter]
        })

    }, [selectedProductCounter])
    function addProductToTicket ( product ) {
        let newTotal = null
        if(product){
            
            dispatch(addProductToGlobalTicket(product))
            //Verifica si el producto viene con el signo de pesos
            newTotal = state.total + ( product['P. Venta']?.includes('$') ? Number(product['P. Venta'].slice(1)   ) : Number(product['P. Venta']) )
            setState({
                ...state,
                total: newTotal
            })
            // calculateChange()
  
        }
    }
    function removeProductFromTicket ( product ) {
        let newTotal = null
        if(product){

            dispatch(removeProductFromGlobalTicket(product))
            
            newTotal = (state.total > 0 && state.total - (product['P. Venta']?.includes('$') ? Number(product['P. Venta'].slice(1)   ) : Number(product['P. Venta'])) || 0   )
            setState({
                ...state,
                total: newTotal
            })
            // calculateChange()

            
            
  
        }
    }
    function totalTicket(){
        let total = 0;
        globalTicket['P. Venta'] && globalTicket.forEach( (product) => {
            total += Number(product['P. Venta'].slice(1)*product?.quantity)
        })
        setState({
            ...state,
            total: total
        })
    }
    function currentTicket(){
        
        return (<>
        <table>
                <tr>
                    <td>{'Cant.'}</td>
                    <td>{'Concepto'}</td>
                    <td>{'Precio'}</td>
                    
                </tr>
                {ticketProducts.map(producto => {
                    return <tr>
                    <td>{Number(producto?.quantity) + 1}</td>
                    <td>{producto?.Producto?.substring(0, 10) }</td>
                    <td>{producto['P. Venta'] && producto['P. Venta']}</td>

                </tr>
                })}
            
        </table>
            <div className="totalTicket">
            {'A pagar: ' + '$' + state.total}            
            <div>
                {'Pagado: ' + '$' + state.payment}
            </div>
            <div>
                {'Cambio: ' + '$' + state.change}
            </div>
        </div>

        </>)

    }
    function calculateChange(payingQuantity){
        setState({
            ...state,
            change: state.total - payingQuantity
        })
        
    }
    function handleInputPaymentOnChange(e){
        
        setState({
            ...state,
            payment: e.target.value
        })
        // calculateChange(e.target.value)
    }
    function handlePaymentOnSubmit(e){
        e?.preventDefault && e.preventDefault()
        calculateChange(state.payment)
    }
   
    return (<>
        <div className="downSearchContainer">
            <Draggable>
                <Calculator></Calculator>
            </Draggable>
            {/* <div>TICKET</div> */}
            <div className="totalTicketCalculated">
                {'$' + state.total}            
            </div>
            <div>
                {/* {JSON.stringify(ticketProducts)} */}
            </div>
            <div className="ticketContainer">

            <Example ticket = {currentTicket()} payment = {state.payment} change = {state.change} total = {state.total} showTicket = {true} ></Example>
            </div>
            <div className="productTicketContainer" >
                {ticketProducts && ticketProducts.map( product => {
                        return (<div className="productTicketAddedContainer">

                        
                        <button className="buttonRemoveProduct" onClick={() => { removeProductFromTicket(product) }}>-</button>
                        <div className="productTicketAdded">
                                <img className="productTicketAddedImage" src={productPlaceholder }/>
                                <div className="">
                                    <div>{product.Producto.substring(0, 10) }</div>  
                                    <div>{product['P. Venta']}</div>
                                    <div>{Number(product['quantity'] + 1)}</div>

                                </div>

                        </div>
                        <button className="buttonAddProduct" onClick={() => { addProductToTicket(product) }}>+</button>
                        </div>)
                    })}
                
            </div>
        </div>
        <div className="paymentInput">
            <form onSubmit={(e) => handlePaymentOnSubmit(e)}>
                <input placeholder="Paying with: " onChange={(e) => handleInputPaymentOnChange(e)} /> 

            </form>
            {state.change}
        </div>
        {/* <div>{JSON.stringify(state.ticketSelectedProduct)}</div> */}
        {/* <div>{JSON.stringify(globalTicket)}</div> */}
        

    
    </>)
}