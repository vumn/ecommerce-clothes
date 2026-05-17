import  { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
// import Product from '../pages/Product';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        // console.log("Du lieu ban dau", products)
        // Đảm bảo products có tồn tại và là mảng trước khi filter
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller);
            // console.log("du lieu sau", bestProduct);
            setBestSeller(bestProduct.slice(0, 5));
        }
    }, [])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={"SELLERS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            This is a line of text
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item, index) => (
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
      </div>
    
    </div>
  )
}

export default BestSeller

