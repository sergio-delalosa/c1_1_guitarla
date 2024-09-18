import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Guitar from './components/Guitar.jsx'
import {db} from './data/db'

function App() {

  
  const initialCart = ()=>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data, setData] = useState(db)
  const [cart, setCart]= useState(initialCart)

  const MIN_ITEMS = 1
  const MAX_ITEMS = 5


  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item) {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id);
    if (itemExists >= 0) { 
      if(cart[itemExists].quantity >= MAX_ITEMS) return

      const updatedCart=[...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1;
      setCart([...cart, item])
    }

  }

  function removeFromCart(id) {
    setCart(prevCart=> prevCart.filter(guitar=>guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart= cart.map(guitar=> {
      if (guitar.id === id && guitar.quantity < MAX_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      } else {
        return guitar
      }
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart= cart.map(guitar=> {
      if (guitar.id === id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      } else {
        return guitar
      }
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }



  return (
    <>
     <Header 
      cart={cart}
      removeFromCart={removeFromCart}  
      increaseQuantity={increaseQuantity}   
      decreaseQuantity={decreaseQuantity} 
      clearCart={clearCart}
      />    

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=> (
                <Guitar 
                  key={guitar.id}
                  guitar={guitar}                        
                  addToCart={addToCart}
                />
              )
            )}           
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
