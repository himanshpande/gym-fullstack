import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Users, 
  Calendar, 
  Trophy, 
  Heart, 
  Clock, 
  Zap, 
  Shield, 
  Star,
  Play,
  ChevronRight,
  CheckCircle,
  Activity,
  Target,
  ArrowLeft,
  Timer,
  Flame,
  RotateCcw,
  User,
  BookOpen,
  TrendingUp,
  Pause,
  SkipForward,
  Volume2,
  VolumeX
} from 'lucide-react';

const GymFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let interval;
    if (workoutActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [workoutActive, isPaused, timeLeft]);

  const handleTimerComplete = () => {
    if (soundEnabled) {
      // Audio notification would go here
      console.log('Timer complete!');
    }
    
    if (isResting) {
      setIsResting(false);
      if (currentSet < getCurrentExercise().sets) {
        setCurrentSet(prev => prev + 1);
        setTimeLeft(getCurrentExercise().duration);
      } else {
        handleNextExercise();
      }
    } else {
      if (currentSet < getCurrentExercise().sets) {
        setIsResting(true);
        setTimeLeft(getCurrentExercise().restTime);
      } else {
        handleNextExercise();
      }
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < getWorkoutExercises().length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setTimeLeft(getWorkoutExercises()[currentExerciseIndex + 1].duration);
    } else {
      setWorkoutComplete(true);
      setWorkoutActive(false);
    }
  };

  const getCurrentExercise = () => {
    return getWorkoutExercises()[currentExerciseIndex];
  };

  const getWorkoutExercises = () => {
    return exerciseDetails[selectedWorkout.id] || [];
  };

  const startWorkout = () => {
    setWorkoutActive(true);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setIsResting(false);
    setWorkoutComplete(false);
    setTimeLeft(getWorkoutExercises()[0].duration);
  };

  const pauseWorkout = () => {
    setIsPaused(!isPaused);
  };

  const skipExercise = () => {
    handleNextExercise();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const workoutCategories = [
    {
      id: 'abs',
      name: 'Abs & Core',
      icon: <Target style={{ width: '32px', height: '32px' }} />,
      color: '#ef4444',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Strengthen your core with targeted abdominal exercises',
      workoutCount: 12,
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'chest',
      name: 'Chest & Upper Body',
      icon: <Dumbbell style={{ width: '32px', height: '32px' }} />,
      color: '#3b82f6',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
      description: 'Build upper body strength and definition',
      workoutCount: 15,
      difficulty: 'Intermediate'
    },
    {
      id: 'legs',
      name: 'Legs & Glutes',
      icon: <Activity style={{ width: '32px', height: '32px' }} />,
      color: '#10b981',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
      description: 'Powerful lower body workouts for strength and endurance',
      workoutCount: 18,
      difficulty: 'All Levels'
    },
    {
      id: 'cardio',
      name: 'Cardio & HIIT',
      icon: <Heart style={{ width: '32px', height: '32px' }} />,
      color: '#f59e0b',
      image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=400&h=300&fit=crop',
      description: 'High-intensity workouts for fat burning and endurance',
      workoutCount: 20,
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'back',
      name: 'Back & Shoulders',
      icon: <Shield style={{ width: '32px', height: '32px' }} />,
      color: '#8b5cf6',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      description: 'Strengthen your back and improve posture',
      workoutCount: 14,
      difficulty: 'Intermediate'
    },
    {
      id: 'yoga',
      name: 'Yoga & Flexibility',
      icon: <RotateCcw style={{ width: '32px', height: '32px' }} />,
      color: '#ec4899',
      image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=400&h=300&fit=crop',
      description: 'Improve flexibility and mental well-being',
      workoutCount: 25,
      difficulty: 'All Levels'
    }
  ];

  const workoutPlans = {
    abs: [
      {
        id: 'abs-beginner',
        name: 'Beginner Abs Blast',
        duration: '15 mins',
        difficulty: 'Beginner',
        exercises: 8,
        calories: 120,
        description: 'Perfect introduction to core training',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      },
      {
        id: 'abs-intermediate',
        name: 'Core Crusher',
        duration: '25 mins',
        difficulty: 'Intermediate',
        exercises: 12,
        calories: 200,
        description: 'Intense core workout for definition',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
      },
      {
        id: 'abs-advanced',
        name: 'Six-Pack Shredder',
        duration: '35 mins',
        difficulty: 'Advanced',
        exercises: 15,
        calories: 280,
        description: 'Ultimate abs challenge for experts',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
      }
    ],
    chest: [
      {
        id: 'chest-power',
        name: 'Chest Power Builder',
        duration: '30 mins',
        difficulty: 'Intermediate',
        exercises: 10,
        calories: 250,
        description: 'Build impressive chest strength',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
      },
      {
        id: 'chest-definition',
        name: 'Chest Definition',
        duration: '25 mins',
        difficulty: 'Beginner',
        exercises: 8,
        calories: 180,
        description: 'Sculpt and define your chest',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      }
    ],
    legs: [
      {
        id: 'legs-strength',
        name: 'Leg Strength Builder',
        duration: '40 mins',
        difficulty: 'Intermediate',
        exercises: 12,
        calories: 320,
        description: 'Build powerful leg muscles',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
      },
      {
        id: 'glutes-booty',
        name: 'Glute Activation',
        duration: '20 mins',
        difficulty: 'Beginner',
        exercises: 9,
        calories: 150,
        description: 'Activate and strengthen glutes',
        image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=400&h=300&fit=crop'
      }
    ],
    cardio: [
      {
        id: 'hiit-fat-burn',
        name: 'HIIT Fat Burner',
        duration: '20 mins',
        difficulty: 'Advanced',
        exercises: 6,
        calories: 300,
        description: 'High-intensity fat burning session',
        image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=400&h=300&fit=crop'
      },
      {
        id: 'cardio-endurance',
        name: 'Cardio Endurance',
        duration: '30 mins',
        difficulty: 'Intermediate',
        exercises: 8,
        calories: 250,
        description: 'Build cardiovascular endurance',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
      }
    ],
    back: [
      {
        id: 'back-strength',
        name: 'Back Strengthener',
        duration: '30 mins',
        difficulty: 'Intermediate',
        exercises: 10,
        calories: 220,
        description: 'Strengthen your entire back',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
      }
    ],
    yoga: [
      {
        id: 'yoga-flexibility',
        name: 'Flexibility Flow',
        duration: '45 mins',
        difficulty: 'Beginner',
        exercises: 15,
        calories: 120,
        description: 'Improve flexibility and reduce stress',
        image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=400&h=300&fit=crop'
      }
    ]
  };

  const exerciseDetails = {
    'abs-beginner': [
      {
        id: 1,
        name: 'Basic Crunches',
        sets: 3,
        reps: '15 reps',
        duration: 45,
        restTime: 30,
        description: 'Classic abdominal exercise targeting upper abs',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        instructions: [
          'Lie on your back with knees bent',
          'Place hands behind head',
          'Lift shoulders off ground',
          'Squeeze abs at the top',
          'Lower slowly and repeat'
        ],
        tips: 'Focus on controlled movement, not speed',
        muscles: ['Upper Abs', 'Core'],
        difficulty: 'Beginner'
      },
      {
        id: 2,
        name: 'Plank Hold',
        sets: 3,
        reps: '30 seconds',
        duration: 30,
        restTime: 60,
        description: 'Isometric core exercise for overall stability',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        instructions: [
          'Start in push-up position',
          'Lower to forearms',
          'Keep body straight',
          'Hold position',
          'Breathe steadily'
        ],
        tips: 'Keep hips level, dont let them sag',
        muscles: ['Core', 'Shoulders', 'Back'],
        difficulty: 'Beginner'
      },
      {
        id: 3,
        name: 'Leg Raises',
        sets: 3,
        reps: '12 reps',
        duration: 40,
        restTime: 45,
        description: 'Target lower abs with controlled leg movement',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        instructions: [
          'Lie flat on back',
          'Keep legs straight',
          'Lift legs to 90 degrees',
          'Lower slowly',
          'Dont let feet touch ground'
        ],
        tips: 'Control the descent for maximum effectiveness',
        muscles: ['Lower Abs', 'Hip Flexors'],
        difficulty: 'Beginner'
      },
      {
        id: 4,
        name: 'Mountain Climbers',
        sets: 3,
        reps: '20 reps',
        duration: 50,
        restTime: 40,
        description: 'Dynamic cardio exercise for core and conditioning',
        image: 'https://images.unsplash.com/photo-1506629905520-c2bb0c5988e7?w=600&h=400&fit=crop',
        instructions: [
          'Start in plank position',
          'Bring one knee to chest',
          'Switch legs quickly',
          'Keep core tight',
          'Maintain steady rhythm'
        ],
        tips: 'Keep hips stable and core engaged',
        muscles: ['Core', 'Cardio', 'Shoulders'],
        difficulty: 'Beginner'
      }
    ],
    'abs-intermediate': [
      {
        id: 1,
        name: 'Russian Twists',
        sets: 4,
        reps: '20 reps',
        duration: 60,
        restTime: 45,
        description: 'Rotational core exercise for obliques',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        instructions: [
          'Sit with knees bent',
          'Lean back slightly',
          'Rotate torso side to side',
          'Keep core engaged',
          'Touch ground on each side'
        ],
        tips: 'Keep feet off ground for added difficulty',
        muscles: ['Obliques', 'Core'],
        difficulty: 'Intermediate'
      },
      {
        id: 2,
        name: 'Dead Bug',
        sets: 3,
        reps: '10 each side',
        duration: 55,
        restTime: 50,
        description: 'Core stability exercise with limb movement',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        instructions: [
          'Lie on back, arms up',
          'Knees bent at 90 degrees',
          'Lower opposite arm and leg',
          'Return to start',
          'Alternate sides'
        ],
        tips: 'Keep lower back pressed to floor',
        muscles: ['Deep Core', 'Stability'],
        difficulty: 'Intermediate'
      },
      {
        id: 3,
        name: 'Bicycle Crunches',
        sets: 4,
        reps: '15 each side',
        duration: 70,
        restTime: 40,
        description: 'Dynamic exercise targeting obliques and rectus abdominis',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
        instructions: [
          'Lie on back, hands behind head',
          'Bring knee to opposite elbow',
          'Extend other leg',
          'Switch sides in cycling motion',
          'Keep core tight'
        ],
        tips: 'Focus on the twist, not speed',
        muscles: ['Obliques', 'Upper Abs', 'Lower Abs'],
        difficulty: 'Intermediate'
      }
    ]
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      color: 'white'
    },
    header: {
      textAlign: 'center',
      padding: '80px 16px 40px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '16px',
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 1s ease'
    },
    titleGradient: {
      background: 'linear-gradient(to right, #c084fc, #f472b6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      maxWidth: '600px',
      margin: '0 auto'
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '50px',
      cursor: 'pointer',
      marginBottom: '32px',
      transition: 'all 0.3s ease'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px',
      padding: '40px 0'
    },
    categoryCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },
    categoryImage: {
      width: '100%',
      height: '120px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '16px'
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px'
    },
    categoryIcon: {
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    categoryTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      margin: 0
    },
    categoryDescription: {
      color: '#d1d5db',
      marginBottom: '16px'
    },
    categoryStats: {
      display: 'flex',
      gap: '16px',
      fontSize: '0.875rem',
      color: '#9ca3af'
    },
    workoutsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      padding: '40px 0'
    },
    workoutCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    workoutImage: {
      width: '100%',
      height: '180px',
      objectFit: 'cover'
    },
    workoutContent: {
      padding: '20px'
    },
    workoutTitle: {
      fontSize: '1.25rem',
      fontWeight: 700,
      marginBottom: '8px'
    },
    workoutDescription: {
      color: '#d1d5db',
      marginBottom: '16px'
    },
    workoutStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '8px',
      fontSize: '0.875rem'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#9ca3af'
    },
    exercisesList: {
      padding: '40px 0'
    },
    exerciseCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    exerciseHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    exerciseTitle: {
      fontSize: '1.25rem',
      fontWeight: 700
    },
    exerciseSpecs: {
      display: 'flex',
      gap: '16px',
      fontSize: '0.875rem',
      color: '#9ca3af'
    },
    exerciseDescription: {
      color: '#d1d5db',
      marginBottom: '16px'
    },
    exerciseDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    },
    detailSection: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '20px',
      borderRadius: '12px'
    },
    detailTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      marginBottom: '12px',
      color: '#c084fc'
    },
    instructionsList: {
      listStyle: 'none',
      padding: 0
    },
    instructionItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      color: '#d1d5db'
    },
    muscleTag: {
      background: 'rgba(196, 132, 252, 0.2)',
      color: '#c084fc',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      marginRight: '8px',
      marginBottom: '4px',
      display: 'inline-block'
    },
    startButton: {
      background: 'linear-gradient(to right, #9333ea, #ec4899)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '50px',
      fontWeight: 600,
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.125rem',
      transition: 'all 0.3s ease',
      marginTop: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    workoutScreen: {
      padding: '40px 0',
      textAlign: 'center'
    },
    timerDisplay: {
      fontSize: '6rem',
      fontWeight: 700,
      color: isResting ? '#f59e0b' : '#10b981',
      marginBottom: '24px',
      textShadow: '0 0 20px rgba(16, 185, 129, 0.5)'
    },
    currentExerciseImage: {
      width: '100%',
      maxWidth: '500px',
      height: '300px',
      objectFit: 'cover',
      borderRadius: '16px',
      marginBottom: '24px'
    },
    exerciseInfo: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '24px',
      maxWidth: '600px',
      margin: '0 auto 24px'
    },
    controlButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      marginBottom: '24px'
    },
    controlButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    progressBar: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '10px',
      height: '8px',
      margin: '24px 0',
      overflow: 'hidden'
    },
    progressFill: {
      background: 'linear-gradient(to right, #9333ea, #ec4899)',
      height: '100%',
      borderRadius: '10px',
      transition: 'width 0.3s ease'
    },
    workoutStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '16px',
      maxWidth: '600px',
      margin: '0 auto'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '16px',
      borderRadius: '12px',
      textAlign: 'center'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#c084fc'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      marginTop: '4px'
    },
    completionScreen: {
      textAlign: 'center',
      padding: '60px 20px'
    },
    completionTitle: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '16px',
      color: '#10b981'
    },
    completionMessage: {
      fontSize: '1.25rem',
      color: '#d1d5db',
      marginBottom: '32px'
    }
  };

  const renderWorkoutScreen = () => {
    const currentExercise = getCurrentExercise();
    const progress = ((currentExerciseIndex + 1) / getWorkoutExercises().length) * 100;
    
    return (
      <div style={styles.workoutScreen}>
        <button 
          style={styles.backButton}
          onClick={() => {
            setWorkoutActive(false);
            setSelectedWorkout(null);
          }}
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
          End Workout
        </button>

        <div style={styles.timerDisplay}>
          {formatTime(timeLeft)}
        </div>

        <div style={{ fontSize: '1.5rem', marginBottom: '16px', color: isResting ? '#f59e0b' : '#10b981' }}>
          {isResting ? 'REST TIME' : 'EXERCISE TIME'}
        </div>

        <img 
          src={currentExercise.image} 
          alt={currentExercise.name}
          style={styles.currentExerciseImage}
        />

        <div style={styles.exerciseInfo}>
          <h2 style={styles.exerciseTitle}>{currentExercise.name}</h2>
          <p style={styles.exerciseDescription}>{currentExercise.description}</p>
          
          <div style={styles.workoutStats}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{currentSet}</div>
              <div style={styles.statLabel}>Set</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{currentExercise.sets}</div>
              <div style={styles.statLabel}>Total Sets</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{currentExercise.reps}</div>
              <div style={styles.statLabel}>Reps</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{currentExerciseIndex + 1}</div>
              <div style={styles.statLabel}>Exercise</div>
            </div>
          </div>
        </div>

        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${progress}%`
            }}
          />
        </div>

        <div style={styles.controlButtons}>
          <button 
            style={styles.controlButton}
            onClick={pauseWorkout}
          >
            {isPaused ? <Play style={{ width: '20px', height: '20px' }} /> : <Pause style={{ width: '20px', height: '20px' }} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          
          <button 
            style={styles.controlButton}
            onClick={skipExercise}
          >
            <SkipForward style={{ width: '20px', height: '20px' }} />
            Skip
          </button>
          
          <button 
            style={styles.controlButton}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 style={{ width: '20px', height: '20px' }} /> : <VolumeX style={{ width: '20px', height: '20px' }} />}
            Sound
          </button>
        </div>

        <div style={{ fontSize: '1.125rem', color: '#d1d5db' }}>
          Next: {currentExerciseIndex < getWorkoutExercises().length - 1 ? 
            getWorkoutExercises()[currentExerciseIndex + 1].name : 
            'Workout Complete!'
          }
        </div>
      </div>
    );
  };

  const renderCompletionScreen = () => (
    <div style={styles.completionScreen}>
      <div style={styles.completionTitle}>
        🎉 Workout Complete!
      </div>
      <div style={styles.completionMessage}>
        Great job completing the {selectedWorkout.name} workout!
      </div>
      
      <div style={styles.workoutStats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{getWorkoutExercises().length}</div>
          <div style={styles.statLabel}>Exercises</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{selectedWorkout.duration}</div>
          <div style={styles.statLabel}>Duration</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{selectedWorkout.calories}</div>
          <div style={styles.statLabel}>Calories</div>
        </div>
      </div>

      <button 
        style={styles.startButton}
        onClick={() => {
          setWorkoutComplete(false);
          setSelectedWorkout(null);
        }}
      >
        <Trophy style={{ width: '20px', height: '20px' }} />
        Back to Workouts
      </button>
    </div>
  );

  const renderCategories = () => (
    <div style={styles.categoriesGrid}>
      {workoutCategories.map((category, index) => (
        <div
          key={category.id}
          style={{
            ...styles.categoryCard,
            animationDelay: `${index * 0.1}s`
          }}
          onClick={() => setSelectedCategory(category)}
        >
          <img src={category.image} alt={category.name} style={styles.categoryImage} />
          <div style={styles.categoryHeader}>
            <div style={{
              ...styles.categoryIcon,
              backgroundColor: category.color
            }}>
              {category.icon}
            </div>
            <h3 style={styles.categoryTitle}>{category.name}</h3>
          </div>
          <p style={styles.categoryDescription}>{category.description}</p>
          <div style={styles.categoryStats}>
            <span>{category.workoutCount} Workouts</span>
            <span>{category.difficulty}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkouts = () => (
    <div>
      <button 
        style={styles.backButton}
        onClick={() => setSelectedCategory(null)}
      >
        <ArrowLeft style={{ width: '20px', height: '20px' }} />
        Back to Categories
      </button>
      
      <div style={styles.header}>
        <h2 style={styles.title}>
          {selectedCategory.name} <span style={styles.titleGradient}>Workouts</span>
        </h2>
        <p style={styles.subtitle}>
          Choose from our curated selection of {selectedCategory.name.toLowerCase()} workouts
        </p>
      </div>

      <div style={styles.workoutsGrid}>
        {workoutPlans[selectedCategory.id]?.map((workout, index) => (
          <div
            key={workout.id}
            style={styles.workoutCard}
            onClick={() => setSelectedWorkout(workout)}
          >
            <img src={workout.image} alt={workout.name} style={styles.workoutImage} />
            <div style={styles.workoutContent}>
              <h3 style={styles.workoutTitle}>{workout.name}</h3>
              <p style={styles.workoutDescription}>{workout.description}</p>
              <div style={styles.workoutStats}>
                <div style={styles.statItem}>
                  <Timer style={{ width: '16px', height: '16px' }} />
                  {workout.duration}
                </div>
                <div style={styles.statItem}>
                  <Target style={{ width: '16px', height: '16px' }} />
                  {workout.exercises} exercises
                </div>
                <div style={styles.statItem}>
                  <TrendingUp style={{ width: '16px', height: '16px' }} />
                  {workout.difficulty}
                </div>
                <div style={styles.statItem}>
                  <Flame style={{ width: '16px', height: '16px' }} />
                  {workout.calories} cal
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderExercises = () => (
    <div>
      <button 
        style={styles.backButton}
        onClick={() => setSelectedWorkout(null)}
      >
        <ArrowLeft style={{ width: '20px', height: '20px' }} />
        Back to Workouts
      </button>
      
      <div style={styles.header}>
        <h2 style={styles.title}>
          {selectedWorkout.name} <span style={styles.titleGradient}>Exercises</span>
        </h2>
        <p style={styles.subtitle}>
          {selectedWorkout.description} • {selectedWorkout.duration} • {selectedWorkout.exercises} exercises
        </p>
        <button 
          style={styles.startButton}
          onClick={startWorkout}
        >
          <Play style={{ width: '20px', height: '20px' }} />
          Start Workout
        </button>
      </div>

      <div style={styles.exercisesList}>
        {exerciseDetails[selectedWorkout.id]?.map((exercise, index) => (
          <div key={exercise.id} style={styles.exerciseCard}>
            <div style={styles.exerciseHeader}>
              <h3 style={styles.exerciseTitle}>{exercise.name}</h3>
              <div style={styles.exerciseSpecs}>
                <span>{exercise.sets} sets</span>
                <span>{exercise.reps}</span>
                <span>Rest: {exercise.restTime}s</span>
              </div>
            </div>
            <p style={styles.exerciseDescription}>{exercise.description}</p>
            
            <div style={styles.exerciseDetails}>
              <div style={styles.detailSection}>
                <h4 style={styles.detailTitle}>Instructions</h4>
                <ul style={styles.instructionsList}>
                  {exercise.instructions.map((instruction, idx) => (
                    <li key={idx} style={styles.instructionItem}>
                      <CheckCircle style={{ width: '16px', height: '16px', color: '#10b981' }} />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.detailSection}>
                <h4 style={styles.detailTitle}>Tips & Muscles</h4>
                <p style={{ color: '#d1d5db', marginBottom: '12px' }}>
                  <strong>Tip:</strong> {exercise.tips}
                </p>
                <div>
                  <strong style={{ color: '#c084fc' }}>Target Muscles:</strong>
                  <div style={{ marginTop: '8px' }}>
                    {exercise.muscles.map((muscle, idx) => (
                      <span key={idx} style={styles.muscleTag}>
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {workoutComplete && renderCompletionScreen()}
        
        {workoutActive && !workoutComplete && renderWorkoutScreen()}
        
        {!workoutActive && !workoutComplete && !selectedCategory && (
          <>
            <div style={styles.header}>
              <h1 style={styles.title}>
                Workout <span style={styles.titleGradient}>Categories</span>
              </h1>
              <p style={styles.subtitle}>
                Explore our comprehensive collection of targeted workout programs designed for every fitness level
              </p>
            </div>
            {renderCategories()}
          </>
        )}
        
        {!workoutActive && !workoutComplete && selectedCategory && !selectedWorkout && renderWorkouts()}
        
        {!workoutActive && !workoutComplete && selectedWorkout && renderExercises()}
      </div>
    </div>
  );
};

export default GymFeatures;