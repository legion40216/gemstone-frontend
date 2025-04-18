import React from 'react'
import Cart from './nav-actions/cart'
import NavMobile from './nav-actions/nav-mobile'

export default function NavActions({
  categories,
  zodiacs,
}) {
  return (
    <div className="flex items-center gap-2">
      <NavMobile 
      categories={categories}
      zodiacs={zodiacs}
      />
      <Cart />
    </div>
  )
}