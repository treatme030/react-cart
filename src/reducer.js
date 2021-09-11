const reducer = (state, action) => {
    if(action.type === 'CLEAR_CART'){
        return { ...state, cart: [] }
    }
    if(action.type === 'REMOVE'){
        const item = state.cart.filter((item) => item.id !== action.payload)
        return { ...state, cart: item }
    }
    // if(action.type === 'INCREASE'){
    //     const tempCart = state.cart.map((cartItem) => {
    //         if(cartItem.id === action.payload){
    //            return { ...cartItem, amount: cartItem.amount + 1 }//cartItem.amount + 1
    //         }
    //         return cartItem
    //     })
    //     return { ...state, cart: tempCart }
    // }
    // if(action.type === 'DECREASE'){
    //     const tempCart = state.cart.map((cartItem) => {
    //         if(cartItem.id === action.payload){
    //            return { ...cartItem, amount: cartItem.amount - 1 }//cartItem.amount - 1
    //         }
    //         return cartItem
    //     })
    //     .filter((cartItem) => cartItem.amount !== 0)//0이하로 내려가지 않게하기, 1이상만 나타내기
    //     return { ...state, cart: tempCart }
    // }
    if(action.type === 'GET_TOTALS'){
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem 
            //아이템 가격
            const itemTotal = price * amount
            //총 가격
            cartTotal.total += itemTotal
            //총 수량  
            cartTotal.amount += amount

            return cartTotal
        }, {
            total: 0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return { ...state, total, amount }
    }
    if(action.type === 'LOADING'){
        return { ...state, loading: true }
    }
    if(action.type === 'DISPLAY_ITEMS'){
        return { ...state, cart: action.payload, loading: false }
    }
    if(action.type === 'TOGGLE_AMOUNT'){//수량 증가, 감소 함께 작성
        let tempCart = state.cart.map((cartItem) => {
            if(cartItem.id === action.payload.id){
                if(action.payload.type === 'inc'){
                    return { ...cartItem, amount: cartItem.amount + 1 }
                }
                if(action.payload.type === 'dec'){
                    return { ...cartItem, amount: cartItem.amount - 1 }
                }
            }
            return cartItem
        }).filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }
    throw new Error('no matching action type')
}

export default reducer;