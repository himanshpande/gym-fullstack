import React from 'react';
import './ReviewsSection.css';

const reviews = [
  {
    name: 'Aarav Mehta',
    review: 'Joining this gym was the best decision I made this year! The trainers are super helpful and the environment is top-notch.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    name: 'Simran Kaur',
    review: 'Great ambiance, latest equipment, and very motivating coaches. I’ve seen great results in just 2 months!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
  },
  {
    name: 'Rohan Patel',
    review: 'Love the flexible timings and personal attention. Perfect for beginners and pros alike!',
    image: 'https://randomuser.me/api/portraits/men/58.jpg',
    rating: 5,
  },
];

function ReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <h2 className="reviews-title">What Our Members Say</h2>
      <p className="reviews-subtitle">Real feedback from real people.</p>
      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div className="review-card" key={i}>
            <img src={r.image} alt={r.name} className="review-img" />
            <h3>{r.name}</h3>
            <div className="stars">
              {'★'.repeat(r.rating)}
              {'☆'.repeat(5 - r.rating)}
            </div>
            <p className="review-text">"{r.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReviewsSection;
