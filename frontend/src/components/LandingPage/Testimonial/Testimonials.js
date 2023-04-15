import React from "react";
import Testimonial from "./Testimonials";
import TestimonialImg from "../../../images/Landing/testimonial.png"

const testimonials = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer placerat nulla at massa dapibus.",
    author: "John Doe",
    position: "CEO, Acme Corporation",
    rating: 4,
    image: TestimonialImg,
  },
  {
    quote:
      "Praesent euismod elementum lectus vitae eleifend. Maecenas at mauris sit amet augue laoreet auctor.",
    author: "Jane Doe",
    position: "Marketing Manager, XYZ Inc.",
    rating: 5,
    image: TestimonialImg,
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      {testimonials.map((testimonial, index) => (
        <Testimonial
          key={index}
          quote={testimonial.quote}
          author={testimonial.author}
          position={testimonial.position}
          rating={testimonial.rating}
          image={testimonial.image}
        />
      ))}
    </div>
  );
};

export default Testimonials;
