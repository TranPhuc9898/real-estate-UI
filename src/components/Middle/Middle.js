import React from 'react'
import AboutArea from '../AboutArea'
import Search from '../Search'
import FindCity from '../FindCity'
import Products from '../../Products/components/Products'
// import Products from '../../Products/pages/UserProducts'
import Aux from '../../hoc/Auxx'

const middle = () => {
    return (
        <Aux>
            <Search />
            <Products/>
            <AboutArea/>
            <FindCity/>
            
        </Aux>
    )
}

export default middle;