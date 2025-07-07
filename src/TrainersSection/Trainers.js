import React from 'react';
import { motion } from 'framer-motion';
import './Trainers.css';

const trainers = [
  {
    name: 'John Smith',
    role: 'Strength & Conditioning Expert',
    image: 'https://tse3.mm.bing.net/th/id/OIP.-GGPCl7vOnwztd2kgccwDgHaLF?rs=1&pid=ImgDetMain&o=7&rm=3',
    bio: '10+ years of experience in strength training and body transformation.',
  },
  {
    name: 'Emily Johnson',
    role: 'Certified Yoga Instructor',
    image: 'https://plus.unsplash.com/premium_photo-1664477052536-ecbc5af4aa00?fm=jpg&q=60&w=3000',
    bio: 'Specializes in Hatha Yoga, mindfulness, and injury recovery sessions.',
  },
  {
    name: 'Mike Lee',
    role: 'Personal Fitness Coach',
    image: 'https://static.vecteezy.com/system/resources/previews/022/460/823/large_2x/muscular-bodybuilder-female-athlete-demonstrates-her-body-in-the-gym-generative-ai-free-photo.jpg',
    bio: 'Expert in personalized workout routines and high-performance coaching.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function TrainersSection() {
  return (
    <section className="trainers-section" id="trainers">
      <h2 className="trainers-title">Meet Our Trainers</h2>
      <p className="trainers-subtitle">Experienced. Certified. Passionate.</p>
      <div className="trainers-grid">
        {trainers.map((trainer, index) => (
          <motion.div
            className="trainer-card"
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <img src={trainer.image} alt={trainer.name} />
            <div className="card-info">
              <h3>{trainer.name}</h3>
              <p>{trainer.role}</p>
            </div>
            <div className="card-overlay">
              <p>{trainer.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TrainersSection;
