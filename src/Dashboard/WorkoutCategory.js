import React, { useState } from 'react';
import { Target, Zap, Heart, Activity, Dumbbell, Flower } from 'lucide-react';
import WorkoutModal from './WorkoutModal';

const WorkoutCategories = ({ userId }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    {
      id: 'abs-core',
      name: 'Abs & Core',
      description: 'Strengthen your core with targeted abdominal exercises',
      workouts: 12,
      level: 'Beginner to Advanced',
      icon: <Target className="w-6 h-6" />,
      color: 'from-red-500 to-orange-500',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'chest-upper',
      name: 'Chest & Upper Body',
      description: 'Build upper body strength and definition',
      workouts: 15,
      level: 'Intermediate',
      icon: <Dumbbell className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'legs-glutes',
      name: 'Legs & Glutes',
      description: 'Powerful lower body workouts for strength and endurance',
      workouts: 18,
      level: 'All Levels',
      icon: <Activity className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'cardio-hiit',
      name: 'Cardio & HIIT',
      description: 'High-intensity workouts for fat burning and endurance',
      workouts: 20,
      level: 'Beginner to Advanced',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'back-shoulders',
      name: 'Back & Shoulders',
      description: 'Strengthen your back and improve posture',
      workouts: 14,
      level: 'Intermediate',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      image: '/api/placeholder/300/200'
    },
    {
      id: 'yoga-flexibility',
      name: 'Yoga & Flexibility',
      description: 'Improve flexibility and mental well-being',
      workouts: 25,
      level: 'All Levels',
      icon: <Flower className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      image: '/api/placeholder/300/200'
    }
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Workout <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Categories</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive collection of targeted workout programs designed for every fitness level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    {category.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">
                        {category.workouts} Workouts
                      </span>
                      <span className="text-sm text-gray-400">
                        {category.level}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">Available</span>
                    </div>
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
            <div className="text-gray-400">Total Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">4.8★</div>
            <div className="text-gray-400">User Rating</div>
          </div>
        </div>
      </div>

      <WorkoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        category={selectedCategory}
        userId={userId}
      />
    </div>
  );
};

export default WorkoutCategories;