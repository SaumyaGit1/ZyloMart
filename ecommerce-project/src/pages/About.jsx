import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore vitae quam dicta omnis animi totam perferendis nesciunt laudantium aliquid explicabo?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas quisquam incidunt sint. Modi assumenda molestiae laborum iusto molestias earum, voluptatibus rerum similique repudiandae iure dolorum in esse nisi quidem debitis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat earum culpa ex accusantium tenetur ad explicabo voluptatum reprehenderit sit est.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ullam ratione nesciunt quaerat similique nam iusto nulla est possimus quasi?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 flex flex-col gap-5 md:px-16 py-8 am:py-20">
          <b>Quality Assurence:</b>
          <p className="text-gray-600">We prioritize delivering products and services that meet the highest quality standards. Each aspect is meticulously checked to ensure reliability and excellence.</p>
        </div>
        <div className="border px-10 flex flex-col gap-5 md:px-16 py-8 am:py-20">
          <b>Convenience:</b>
          <p className="text-gray-600"> Our solutions are designed to make your life easier and more efficient. From quick processes to user-friendly interfaces, we focus on saving you time and effort.</p>
        </div>
        <div className="border px-10 flex flex-col gap-5 md:px-16 py-8 am:py-20">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600"> We are committed to addressing your needs with care and urgency. Our team goes the extra mile to provide a seamless and satisfying customer experience.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
