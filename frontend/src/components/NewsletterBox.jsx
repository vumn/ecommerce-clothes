// import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = () => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
      <p className='text-gray-400 mt-3'>This is a dummy text</p>
      <p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmitHandler}>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button className='bg-black text-white text-xs px-10 py-4' type='submit'>SUBSCRIBE</button>
        </form>
      </p>
    </div>
  )
}

export default NewsletterBox 