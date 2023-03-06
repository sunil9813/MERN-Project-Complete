import React from "react"
import { ProductCard } from "../common/ProductCard"

export const Product = () => {
  return (
    <>
      <div className='new_arrivals'>
        <div className='container'>
          <div className='title_head'>
            <h1>
              New Arrivals. <span>REY backpacks & bags</span>
            </h1>
          </div>

          <ProductCard />
        </div>
      </div>
    </>
  )
}
