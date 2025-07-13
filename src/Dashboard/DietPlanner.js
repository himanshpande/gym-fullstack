// diet-planner.js
import React, { useState } from 'react';
import './Diet.css';

const GymDietPlanner = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    dietaryRestrictions: '',
    medicalConditions: '',
    timePreference: ''
  });
  const [dietPlan, setDietPlan] = useState(null);

  const dietPlans = {
    'weight-loss': {
      title: 'Weight Loss Plan',
      description: 'A calorie-controlled plan focusing on lean proteins and high-fiber foods',
      color: 'plan-weight-loss',
      plans: {
        monday: {
          breakfast: 'Greek yogurt with berries and almonds (300 cal)',
          midMorning: 'Green tea + 1 apple (80 cal)',
          lunch: 'Grilled chicken salad with olive oil dressing (400 cal)',
          afternoon: 'Cucumber slices with hummus (120 cal)',
          dinner: 'Baked salmon with steamed broccoli (350 cal)',
          evening: 'Herbal tea (0 cal)'
        },
        tuesday: {
          breakfast: 'Oatmeal with banana and cinnamon (280 cal)',
          midMorning: 'Black coffee + 10 almonds (90 cal)',
          lunch: 'Turkey and avocado wrap (380 cal)',
          afternoon: 'Carrot sticks with hummus (100 cal)',
          dinner: 'Grilled tilapia with quinoa (370 cal)',
          evening: 'Chamomile tea (0 cal)'
        },
        wednesday: {
          breakfast: 'Vegetable omelet with spinach (320 cal)',
          midMorning: 'Green smoothie (120 cal)',
          lunch: 'Lentil soup with whole grain bread (360 cal)',
          afternoon: 'Mixed nuts (150 cal)',
          dinner: 'Grilled chicken breast with sweet potato (340 cal)',
          evening: 'Mint tea (0 cal)'
        },
        thursday: {
          breakfast: 'Chia pudding with berries (290 cal)',
          midMorning: 'Celery sticks with almond butter (110 cal)',
          lunch: 'Quinoa bowl with grilled vegetables (390 cal)',
          afternoon: 'Greek yogurt (100 cal)',
          dinner: 'Baked cod with asparagus (320 cal)',
          evening: 'Ginger tea (0 cal)'
        },
        friday: {
          breakfast: 'Smoothie bowl with protein powder (310 cal)',
          midMorning: 'Herbal tea + 1 orange (85 cal)',
          lunch: 'Chicken caesar salad (420 cal)',
          afternoon: 'Bell pepper strips with hummus (90 cal)',
          dinner: 'Grilled shrimp with zucchini noodles (280 cal)',
          evening: 'Lavender tea (0 cal)'
        },
        saturday: {
          breakfast: 'Whole grain toast with avocado (330 cal)',
          midMorning: 'Protein shake (140 cal)',
          lunch: 'Grilled chicken with brown rice (450 cal)',
          afternoon: 'Apple slices with peanut butter (160 cal)',
          dinner: 'Baked chicken thigh with roasted vegetables (380 cal)',
          evening: 'Peppermint tea (0 cal)'
        }
      }
    },
    'muscle-gain': {
      title: 'Muscle Gain Plan',
      description: 'High-protein, calorie-dense meals to support muscle growth',
      color: 'plan-muscle-gain',
      plans: {
        monday: {
          breakfast: 'Protein pancakes with banana and peanut butter (520 cal)',
          midMorning: 'Protein shake with milk (280 cal)',
          lunch: 'Grilled chicken breast with brown rice and vegetables (650 cal)',
          afternoon: 'Trail mix with dried fruits (220 cal)',
          dinner: 'Lean beef steak with sweet potato (580 cal)',
          evening: 'Casein protein shake (200 cal)'
        },
        tuesday: {
          breakfast: 'Scrambled eggs with whole grain toast (480 cal)',
          midMorning: 'Greek yogurt with granola (250 cal)',
          lunch: 'Tuna sandwich with avocado (620 cal)',
          afternoon: 'Protein bar (240 cal)',
          dinner: 'Grilled salmon with quinoa (590 cal)',
          evening: 'Milk with almonds (180 cal)'
        },
        wednesday: {
          breakfast: 'Oatmeal with protein powder and berries (500 cal)',
          midMorning: 'Banana with peanut butter (200 cal)',
          lunch: 'Chicken burrito bowl (680 cal)',
          afternoon: 'Cottage cheese with nuts (190 cal)',
          dinner: 'Pork tenderloin with mashed potatoes (600 cal)',
          evening: 'Chocolate milk (160 cal)'
        },
        thursday: {
          breakfast: 'Egg and cheese omelet with toast (530 cal)',
          midMorning: 'Protein smoothie (270 cal)',
          lunch: 'Grilled fish with pasta (640 cal)',
          afternoon: 'Mixed nuts and dried fruit (230 cal)',
          dinner: 'Chicken thighs with rice pilaf (620 cal)',
          evening: 'Protein pudding (150 cal)'
        },
        friday: {
          breakfast: 'French toast with syrup (550 cal)',
          midMorning: 'Protein shake (260 cal)',
          lunch: 'Turkey and cheese sandwich with chips (660 cal)',
          afternoon: 'Energy balls (210 cal)',
          dinner: 'Grilled lamb with roasted vegetables (640 cal)',
          evening: 'Whole milk (140 cal)'
        },
        saturday: {
          breakfast: 'Breakfast burrito with eggs and cheese (580 cal)',
          midMorning: 'Chocolate protein shake (290 cal)',
          lunch: 'Chicken pasta with cream sauce (720 cal)',
          afternoon: 'Protein muffin (250 cal)',
          dinner: 'Ribeye steak with baked potato (680 cal)',
          evening: 'Casein shake with berries (190 cal)'
        }
      }
    },
    'maintenance': {
      title: 'Maintenance Plan',
      description: 'Balanced nutrition to maintain current weight and energy levels',
      color: 'plan-maintenance',
      plans: {
        monday: {
          breakfast: 'Whole grain cereal with milk and fruit (380 cal)',
          midMorning: 'Apple with almond butter (150 cal)',
          lunch: 'Grilled chicken sandwich with side salad (520 cal)',
          afternoon: 'Greek yogurt (120 cal)',
          dinner: 'Baked fish with rice and vegetables (450 cal)',
          evening: 'Herbal tea with honey (30 cal)'
        },
        tuesday: {
          breakfast: 'Scrambled eggs with toast and fruit (400 cal)',
          midMorning: 'Banana smoothie (160 cal)',
          lunch: 'Quinoa salad with chickpeas (500 cal)',
          afternoon: 'Handful of mixed nuts (140 cal)',
          dinner: 'Grilled chicken with pasta (480 cal)',
          evening: 'Chamomile tea (0 cal)'
        },
        wednesday: {
          breakfast: 'Oatmeal with berries and nuts (420 cal)',
          midMorning: 'Protein bar (180 cal)',
          lunch: 'Turkey wrap with vegetables (480 cal)',
          afternoon: 'Cottage cheese with fruit (130 cal)',
          dinner: 'Salmon with quinoa and asparagus (460 cal)',
          evening: 'Green tea (0 cal)'
        },
        thursday: {
          breakfast: 'Greek yogurt parfait with granola (390 cal)',
          midMorning: 'Trail mix (170 cal)',
          lunch: 'Chicken caesar salad (490 cal)',
          afternoon: 'Smoothie with spinach and fruit (140 cal)',
          dinner: 'Pork chops with sweet potato (470 cal)',
          evening: 'Mint tea (0 cal)'
        },
        friday: {
          breakfast: 'Avocado toast with egg (410 cal)',
          midMorning: 'Protein shake (150 cal)',
          lunch: 'Fish tacos with black beans (510 cal)',
          afternoon: 'Apple slices with cheese (120 cal)',
          dinner: 'Beef stir-fry with brown rice (480 cal)',
          evening: 'Herbal tea (0 cal)'
        },
        saturday: {
          breakfast: 'Pancakes with fruit (440 cal)',
          midMorning: 'Nuts and dried fruit (160 cal)',
          lunch: 'Chicken and vegetable soup with bread (500 cal)',
          afternoon: 'Yogurt with granola (130 cal)',
          dinner: 'Grilled shrimp with pasta (490 cal)',
          evening: 'Decaf coffee (5 cal)'
        }
      }
    },
    'athletic': {
      title: 'Athletic Performance Plan',
      description: 'High-energy nutrition for intense training and competition',
      color: 'plan-athletic',
      plans: {
        monday: {
          breakfast: 'Large bowl of oatmeal with banana and protein powder (600 cal)',
          midMorning: 'Energy smoothie with dates (320 cal)',
          lunch: 'Chicken breast with quinoa and vegetables (720 cal)',
          afternoon: 'Sports drink and energy bar (280 cal)',
          dinner: 'Salmon with sweet potato and broccoli (650 cal)',
          evening: 'Recovery shake with berries (250 cal)'
        },
        tuesday: {
          breakfast: 'Egg white omelet with whole grain toast (580 cal)',
          midMorning: 'Banana with peanut butter (300 cal)',
          lunch: 'Turkey and avocado wrap with chips (700 cal)',
          afternoon: 'Protein smoothie (270 cal)',
          dinner: 'Lean beef with pasta and vegetables (680 cal)',
          evening: 'Chocolate milk (200 cal)'
        },
        wednesday: {
          breakfast: 'Greek yogurt with granola and berries (620 cal)',
          midMorning: 'Energy balls (310 cal)',
          lunch: 'Grilled fish with brown rice (690 cal)',
          afternoon: 'Sports drink and almonds (260 cal)',
          dinner: 'Chicken thighs with quinoa salad (660 cal)',
          evening: 'Protein pudding (180 cal)'
        },
        thursday: {
          breakfast: 'Protein pancakes with syrup (640 cal)',
          midMorning: 'Fruit smoothie (290 cal)',
          lunch: 'Chicken bowl with rice and beans (740 cal)',
          afternoon: 'Trail mix (250 cal)',
          dinner: 'Grilled lamb with roasted vegetables (670 cal)',
          evening: 'Casein shake (190 cal)'
        },
        friday: {
          breakfast: 'Breakfast burrito with eggs and cheese (660 cal)',
          midMorning: 'Protein bar (280 cal)',
          lunch: 'Tuna salad with crackers (710 cal)',
          afternoon: 'Chocolate milk (240 cal)',
          dinner: 'Pork tenderloin with mashed potatoes (690 cal)',
          evening: 'Recovery drink (220 cal)'
        },
        saturday: {
          breakfast: 'Large smoothie bowl with toppings (680 cal)',
          midMorning: 'Energy drink and nuts (300 cal)',
          lunch: 'Chicken pasta with cream sauce (760 cal)',
          afternoon: 'Protein muffin (270 cal)',
          dinner: 'Ribeye steak with baked potato (720 cal)',
          evening: 'Bedtime protein shake (200 cal)'
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateDietPlan = () => {
    let planType = 'maintenance';
    
    if (formData.goal === 'weight-loss') {
      planType = 'weight-loss';
    } else if (formData.goal === 'muscle-gain') {
      planType = 'muscle-gain';
    } else if (formData.goal === 'athletic-performance') {
      planType = 'athletic';
    }

    setDietPlan(dietPlans[planType]);
    setCurrentStep('plan');
  };

  const resetForm = () => {
    setCurrentStep('form');
    setFormData({
      name: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      activityLevel: '',
      goal: '',
      dietaryRestrictions: '',
      medicalConditions: '',
      timePreference: ''
    });
    setDietPlan(null);
  };

  const isFormValid = () => {
    return formData.name && formData.age && formData.gender && 
           formData.weight && formData.height && formData.activityLevel && 
           formData.goal;
  };

  const formatMealTime = (mealTime) => {
    return mealTime.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  if (currentStep === 'form') {
    return (
      <div className="diet-planner">
        <div className="container">
          <div className="header">
            <h1 className="main-title">🏋️‍♂️ Personalized Diet Planner</h1>
            <p className="subtitle">Get your customized weekly meal plan based on your fitness goals</p>
          </div>

          <div className="form-container">
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <div className="section-header">
                  <span className="icon">👤</span>
                  <h2>Personal Information</h2>
                </div>
                
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="Weight"
                    />
                  </div>
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Height"
                    />
                  </div>
                </div>
              </div>

              {/* Goals and Preferences */}
              <div className="form-section">
                <div className="section-header">
                  <span className="icon">🎯</span>
                  <h2>Goals & Preferences</h2>
                </div>

                <div className="form-group">
                  <label>Primary Goal</label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleInputChange}
                  >
                    <option value="">Select your goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="maintenance">Maintain Current Weight</option>
                    <option value="athletic-performance">Athletic Performance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Activity Level</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="light">Light (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                    <option value="high">High (hard exercise 6-7 days/week)</option>
                    <option value="very-high">Very High (very hard exercise, physical job)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Dietary Restrictions</label>
                  <select
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                  >
                    <option value="">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="dairy-free">Dairy-Free</option>
                    <option value="keto">Keto</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Medical Conditions (Optional)</label>
                  <input
                    type="text"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    placeholder="e.g., diabetes, hypertension"
                  />
                </div>
              </div>
            </div>

            <div className="form-submit">
              <button
                onClick={generateDietPlan}
                disabled={!isFormValid()}
                className="submit-btn"
              >
                Generate My Diet Plan 🎯
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'plan' && dietPlan) {
    return (
      <div className="diet-planner">
        <div className="container">
          <div className="header">
            <h1 className="main-title">🍽️ Your Personalized Diet Plan</h1>
            <p className="subtitle">Hello {formData.name}! Here's your customized weekly meal plan</p>
          </div>

          <div className="plan-container">
            <div className={`plan-header ${dietPlan.color}`}>
              <h2>{dietPlan.title}</h2>
              <p>{dietPlan.description}</p>
            </div>

            <div className="days-container">
              {Object.entries(dietPlan.plans).map(([day, meals]) => (
                <div key={day} className="day-card">
                  <h3 className="day-title">
                    <span className="day-icon">📅</span>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </h3>
                  <div className="meals-grid">
                    {Object.entries(meals).map(([mealTime, mealDescription]) => (
                      <div key={mealTime} className="meal-card">
                        <h4 className="meal-time">
                          <span className="time-icon">🕐</span>
                          {formatMealTime(mealTime)}
                        </h4>
                        <p className="meal-description">{mealDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="notes-section">
              <h3 className="notes-title">
                <span className="notes-icon">✅</span>
                Important Notes
              </h3>
              <ul className="notes-list">
                <li>• Drink at least 8-10 glasses of water daily</li>
                <li>• Adjust portion sizes based on your hunger and energy levels</li>
                <li>• Take rest on Sunday or have a flexible meal day</li>
                <li>• Consult with a nutritionist for personalized adjustments</li>
                <li>• Track your progress and adjust as needed</li>
              </ul>
            </div>

            <div className="plan-actions">
              <button onClick={resetForm} className="reset-btn">
                Create New Plan 🔄
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GymDietPlanner;