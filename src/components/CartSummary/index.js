// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalprice = 0
      cartList.forEach(each => {
        totalprice += each.quantity * each.price
      })
      const count = cartList.length
      return (
        <div className="summarycard">
          <h1 className="amount">Order Total:{totalprice}</h1>
          <p className="cartitems">{count} items in cart</p>
          <button className="summarybutton" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
