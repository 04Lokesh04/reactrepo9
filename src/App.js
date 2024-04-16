import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const existing = cartList.find(each => each.id === product.id)

    if (existing) {
      const updatedcart = cartList.map(each =>
        each.id === product.id ? {...each, quantity: each.quantity + 1} : each,
      )
      this.setState({cartList: updatedcart})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const identifyproduct = cartList.find(each => each.id === id)
    console.log(identifyproduct.quantity)
    if (identifyproduct) {
      const updatedcart = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      this.setState({cartList: updatedcart})
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const specificproduct = cartList.find(each => (each.id = id))

    if (specificproduct.quantity === 1) {
      const filteredlist = cartList.filter(each => each.id !== id)
      this.setState({cartList: filteredlist})
    } else {
      const updatedcart = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })
      this.setState({cartList: updatedcart})
    }
  }
  removeAllCartItems = () => {
    console.log('called')
    this.setState({cartList: []})
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredlist = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredlist})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
