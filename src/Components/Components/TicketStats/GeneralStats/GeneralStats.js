import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Income from './Income/Income';
import Outcome from './Outcome/Outcome';
import StatsMostdan from './StatsMostdan/StatsMostdan';
import StatsMostSold from './StatsMostSold/StatsMostSold';
import './GeneralStats.css'
import CalculateMargin from './CalculateMargin/CalculateMargin';
import { getTotalInvested } from '../../../features/products/productSlicetest';
function GeneralStats() {
    let dispatch = useDispatch()
    let tickets = useSelector(state => state.products.tickets.response)
    let totalInvest = useSelector( state => state.products.totalInvest)
    let [typeTicket, setTypeTicket] = useState('mostdan')
    let [investType, setInvestType] = useState('Venta')
    let [operator, setOperator] = useState('-')
    function switchTypeTicket(){
        setTypeTicket( typeTicket === 'mostdan' ? 'mostSold' : 'mostdan')
    }
    function switchInvestType(){
        setInvestType( investType === 'Venta' ? 'Compra' : 'Venta')
        setOperator( operator === '-' ? '+' : '-')
    }
    useEffect(() => {
        dispatch(getTotalInvested(investType))
    }, [investType])
    let [top, setTop] = useState(10)
    function handleTopOnChange(e){
        setTop(e.target.value || 10)
    }

    return ( <>
    <div className='generalStatsContainer'>

        <button style={{
            display: 'flex',
            cursor: 'pointer'

        }} onClick={() => switchTypeTicket()}>SWITCH</button>
        <input placeholder='Ingrese Top' type={'number'} onChange={(e) => {handleTopOnChange(e)}}></input>
        <StatsMostSold analytic = {typeTicket} top={top} tickets = {tickets}></StatsMostSold>
        {/* Los siguientes componentes han sido abreviados en el anterior */}
        {/* <StatsMostSold  analytic = 'mostdan' top={10} tickets = {tickets}></StatsMostSold> */}
        {/* <StatsMostdan top={10} tickets = {tickets}></StatsMostdan> */}
        <div className='generalStatsIncomeandOutcome'>
            <Income></Income>
            <Outcome></Outcome>
        </div>
        <button onClick={() => switchInvestType()} >{investType}</button>
        <CalculateMargin totalInvest = {totalInvest} operator = {operator} ></CalculateMargin>
        {operator}
    </div>
    </> );
}

export default GeneralStats;