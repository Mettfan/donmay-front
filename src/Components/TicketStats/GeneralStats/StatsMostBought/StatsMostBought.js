import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../../../../features/analytics/analyticSlice';
import './StatsMostdan.css'
function StatsMostdan(props){
    let dispatch = useDispatch()
    let analytic = useSelector(state => state?.analytics?.analytic)
    
    useEffect(() => {
        dispatch(getAnalytics({analytic: 'mostdan'}))
    }, [])
    let tickets = props?.tickets || []
    let [mostSoldProducts, setMostSoldProducts] = useState([])
    function sortProductsByQuantity(products){
        let pairSold = products?.map(product => {
            return [product['Producto'], product['quantity'] ]
        });
        pairSold?.sort((a, b) => Number(a[1]) - Number(b[1]) )
        console.log(pairSold);
        // sortedProducts.sort((a, b) => Number(a[1]) + Number(b[1]))
        // return sortedProducts
        return pairSold
    }
    
    return <>
        <div className={'statsMostdanbackGround'} >
            {'Top: ' + props?.top}
            {/* {tickets?.map((ticket) => {
            
                ticket.sort((a, b) => ticket?.Productos)


            } )} */}
            {sortProductsByQuantity(analytic.products)?.reverse()?.map(product => {
                return (<>
                    <div className='pairContainer'>
                        <div className='productTopName' >{product[0]}</div>
                        <div className='productTopQuantity'>{product[1]}</div>

                    </div>

                </>)
            })?.slice(0, props?.top)}

        </div>
    </>
}

export default StatsMostdan