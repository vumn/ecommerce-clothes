import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full  md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
          <p>This is all about us, a clothing shop</p>
          <p>We build trust</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We care about dummy text</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p>We blah blah blah</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Convenience:</b>
          <p>We blah blah blah about convenience</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-gray-600'>Exceptional Customer Service:</b>
          <p>We blah blah blah about customer services</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
