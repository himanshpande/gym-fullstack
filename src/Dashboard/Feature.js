"use client"

import { useState, useEffect } from "react"
import {
  Dumbbell,
  Trophy,
  Heart,
  Shield,
  Play,
  CheckCircle,
  Activity,
  Target,
  ArrowLeft,
  Timer,
  Flame,
  RotateCcw,
  TrendingUp,
  Pause,
  SkipForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
} from "lucide-react"
import React, { useState } from 'react';
import WorkoutModal from './WorkoutModal'; // Assuming this is your existing modal component

const Feature = ({ workout, onStartWorkout }) => {
  const [showModal, setShowModal] = useState(false);

  const handleStartWorkoutClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleStartNow = async () => {
    try {
      // Log the workout immediately
      const workoutData = {
        workoutId: workout.id,
        name: workout.name,
        category: workout.category,
        duration: workout.duration,
        completedAt: new Date().toISOString(),
        exercises: workout.exercises || []
      };

      const response = await fetch('/api/workout/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        // Close modal and start workout
        setShowModal(false);
        if (onStartWorkout) {
          onStartWorkout(workout);
        }
        // Optional: Show success message
        console.log('Workout logged successfully');
      } else {
        console.error('Failed to log workout');
      }
    } catch (error) {
      console.error('Error logging workout:', error);
    }
  };

  const handleScheduleForLater = async (scheduledDate, scheduledTime) => {
    try {
      const scheduleData = {
        workoutId: workout.id,
        name: workout.name,
        category: workout.category,
        duration: workout.duration,
        scheduledDate: scheduledDate,
        scheduledTime: scheduledTime,
        scheduledDateTime: new Date(`${scheduledDate}T${scheduledTime}`).toISOString(),
        exercises: workout.exercises || []
      };

      const response = await fetch('/api/workout/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        setShowModal(false);
        // Optional: Show success message
        console.log('Workout scheduled successfully');
      } else {
        console.error('Failed to schedule workout');
      }
    } catch (error) {
      console.error('Error scheduling workout:', error);
    }
  };

  return (
    <div className="feature-container">
      {/* Your existing Feature component JSX */}
      <div className="workout-card">
        <h3>{workout.name}</h3>
        <p>Category: {workout.category}</p>
        <p>Duration: {workout.duration} minutes</p>
        
        <button 
          className="start-workout-btn"
          onClick={handleStartWorkoutClick}
        >
          Start Workout
        </button>
      </div>

      {/* Modal Component */}
      {showModal && (
        <WorkoutModal
          workout={workout}
          onClose={handleModalClose}
          onStartNow={handleStartNow}
          onScheduleForLater={handleScheduleForLater}
        />
      )}
    </div>
  );
};

export default Feature;

const GymFeatures = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [workoutActive, setWorkoutActive] = useState(false)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Voice and Sound Functions
  const speak = (text) => {
    if (!voiceEnabled) return

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }

  const playSound = (type) => {
    if (!soundEnabled) return

    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      switch (type) {
        case "start":
          oscillator.frequency.value = 800
          gainNode.gain.value = 0.3
          break
        case "rest":
          oscillator.frequency.value = 400
          gainNode.gain.value = 0.2
          break
        case "complete":
          oscillator.frequency.value = 1000
          gainNode.gain.value = 0.4
          break
        case "countdown":
          oscillator.frequency.value = 600
          gainNode.gain.value = 0.1
          break
        default:
          oscillator.frequency.value = 500
          gainNode.gain.value = 0.2
      }

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log("Audio not supported")
    }
  }

  useEffect(() => {
    if (workoutActive && !isPaused && timeLeft > 0) {
      if (timeLeft <= 3 && timeLeft > 0) {
        speak(timeLeft.toString())
        playSound("countdown")
      }

      if (timeLeft === 10) {
        speak("10 seconds remaining")
      } else if (timeLeft === 30 && !isResting) {
        speak("30 seconds remaining")
      }
    }
  }, [timeLeft, workoutActive, isPaused, isResting, voiceEnabled, soundEnabled])

  useEffect(() => {
    let interval
    if (workoutActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [workoutActive, isPaused, timeLeft])

  const handleTimerComplete = () => {
    playSound("complete")

    if (isResting) {
      setIsResting(false)
      if (currentSet < getCurrentExercise().sets) {
        setCurrentSet((prev) => prev + 1)
        setTimeLeft(getCurrentExercise().duration)
        speak(`Start ${getCurrentExercise().name} - Set ${currentSet + 1}`)
        playSound("start")
      } else {
        handleNextExercise()
      }
    } else {
      if (currentSet < getCurrentExercise().sets) {
        setIsResting(true)
        setTimeLeft(getCurrentExercise().restTime)
        speak(`Rest for ${getCurrentExercise().restTime} seconds`)
        playSound("rest")
      } else {
        handleNextExercise()
      }
    }
  }
  

  const handleNextExercise = () => {
    if (currentExerciseIndex < getWorkoutExercises().length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1)
      setCurrentSet(1)
      setIsResting(false)
      const nextExercise = getWorkoutExercises()[currentExerciseIndex + 1]
      setTimeLeft(nextExercise.duration)
      speak(`Next exercise: ${nextExercise.name} - Set 1`)
      playSound("start")
    } else {
      setWorkoutComplete(true)
      setWorkoutActive(false)
      speak("Workout complete! Great job!")
      playSound("complete")
      setTimeout(() => {
        stopSpeech()
      }, 3000)
    }
  }

  const getCurrentExercise = () => {
    return getWorkoutExercises()[currentExerciseIndex]
  }

  const getWorkoutExercises = () => {
    return exerciseDetails[selectedWorkout.id] || []
  }

  const startWorkout = () => {
    setWorkoutActive(true)
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setIsResting(false)
    setWorkoutComplete(false)
    const firstExercise = getWorkoutExercises()[0]
    setTimeLeft(firstExercise.duration)
    speak(`Starting workout: ${selectedWorkout.name}. First exercise: ${firstExercise.name} - Set 1`)
    playSound("start")
  }

  const pauseWorkout = () => {
    setIsPaused(!isPaused)
    if (!isPaused) {
      speak("Workout paused")
    } else {
      speak("Workout resumed")
    }
  }

  const skipExercise = () => {
    speak("Skipping exercise")
    handleNextExercise()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const workoutCategories = [
    {
      id: "abs",
      name: "Abs & Core",
      icon: <Target style={{ width: "32px", height: "32px" }} />,
      color: "#ef4444",
      image: "https://plus.unsplash.com/premium_photo-1664299208816-ef56887db111?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
      description: "Strengthen your core with targeted abdominal exercises",
      workoutCount: 12,
      difficulty: "Beginner to Advanced",
    },
    {
      id: "chest",
      name: "Chest & Upper Body",
      icon: <Dumbbell style={{ width: "32px", height: "32px" }} />,
      color: "#3b82f6",
      image: "https://plus.unsplash.com/premium_photo-1663134113477-b73b8193ee62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww",
      description: "Build upper body strength and definition",
      workoutCount: 15,
      difficulty: "Intermediate",
    },
    {
      id: "legs",
      name: "Legs & Glutes",
      icon: <Activity style={{ width: "32px", height: "32px" }} />,
      color: "#10b981",
      image: "https://plus.unsplash.com/premium_photo-1664478159939-5242198cdcb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVncyUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      description: "Powerful lower body workouts for strength and endurance",
      workoutCount: 18,
      difficulty: "All Levels",
    },
    {
      id: "cardio",
      name: "Cardio & HIIT",
      icon: <Heart style={{ width: "32px", height: "32px" }} />,
      color: "#f59e0b",
      image: "https://images.unsplash.com/photo-1723117418780-1b74b25af9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyZGlvJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
      description: "High-intensity workouts for fat burning and endurance",
      workoutCount: 20,
      difficulty: "Beginner to Advanced",
    },
    {
      id: "back",
      name: "Back & Shoulders",
      icon: <Shield style={{ width: "32px", height: "32px" }} />,
      color: "#8b5cf6",
      image: "https://plus.unsplash.com/premium_photo-1683120903102-ca698a2abc20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFjayUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      description: "Strengthen your back and improve posture",
      workoutCount: 14,
      difficulty: "Intermediate",
    },
    {
      id: "yoga",
      name: "Yoga & Flexibility",
      icon: <RotateCcw style={{ width: "32px", height: "32px" }} />,
      color: "#ec4899",
      image: "https://plus.unsplash.com/premium_photo-1674059546748-786d2fef3d79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      description: "Improve flexibility and mental well-being",
      workoutCount: 25,
      difficulty: "All Levels",
    },
  ]

  const workoutPlans = {
    abs: [
      {
        id: "abs-beginner",
        name: "Beginner Abs Blast",
        duration: "15 mins",
        difficulty: "Beginner",
        exercises: 4,
        calories: 120,
        description: "Perfect introduction to core training",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "abs-intermediate",
        name: "Core Crusher",
        duration: "25 mins",
        difficulty: "Intermediate",
        exercises: 3,
        calories: 200,
        description: "Intense core workout for definition",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        id: "abs-advanced",
        name: "Six-Pack Shredder",
        duration: "35 mins",
        difficulty: "Advanced",
        exercises: 5,
        calories: 280,
        description: "Ultimate abs challenge for experts",
        image: "/placeholder.svg?height=300&width=400",
      },
    ],
    chest: [
      {
        id: "chest-power",
        name: "Chest Power Builder",
        duration: "30 mins",
        difficulty: "Intermediate",
        exercises: 4,
        calories: 250,
        description: "Build impressive chest strength",
        image: "https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlc3QlMjB3b3Jrb3V0fGVufDB8fDB8fHww",
      },
      {
        id: "chest-definition",
        name: "Chest Definition",
        duration: "25 mins",
        difficulty: "Beginner",
        exercises: 4,
        calories: 180,
        description: "Sculpt and define your chest",
        image: "https://media.istockphoto.com/id/180200014/photo/a-man-lifting-weights-on-a-bench-press.webp?a=1&b=1&s=612x612&w=0&k=20&c=UdPRVKvyzkm0jm_433_2X9gmUBw4LoKiYkBF0UepMaA=",
      },
    ],
    legs: [
      {
        id: "legs-strength",
        name: "Leg Strength Builder",
        duration: "40 mins",
        difficulty: "Intermediate",
        exercises: 4,
        calories: 320,
        description: "Build powerful leg muscles",
        image: "https://plus.unsplash.com/premium_photo-1667516443590-45ff387fdf7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVncyUyMGd5bSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "glutes-booty",
        name: "Glute Activation",
        duration: "20 mins",
        difficulty: "Beginner",
        exercises: 3,
        calories: 150,
        description: "Activate and strengthen glutes",
        image: "https://images.unsplash.com/photo-1585834830884-392089dfd9f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2x1dGVzJTIwZ3ltJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
    cardio: [
      {
        id: "hiit-fat-burn",
        name: "HIIT Fat Burner",
        duration: "20 mins",
        difficulty: "Advanced",
        exercises: 3,
        calories: 300,
        description: "High-intensity fat burning session",
        image: "https://plus.unsplash.com/premium_photo-1663127702688-7d2ecf838ca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcmRpbyUyMGd5bSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: "cardio-endurance",
        name: "Cardio Endurance",
        duration: "30 mins",
        difficulty: "Intermediate",
        exercises: 2,
        calories: 250,
        description: "Build cardiovascular endurance",
        image: "https://media.istockphoto.com/id/1356510492/photo/determined-athletic-woman-running-on-treadmill-while-practicing-in-a-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=wmpoNHGGIaNnt62nKxOIRQ8ROeyE5OiBANY-c-8hIpw=",
      },
    ],
    back: [
      {
        id: "back-strength",
        name: "Back Strengthener",
        duration: "30 mins",
        difficulty: "Intermediate",
        exercises: 3,
        calories: 220,
        description: "Strengthen your entire back",
        image: "https://plus.unsplash.com/premium_photo-1726711280313-2216553ee8aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFjayUyMGd5bSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      },
    ],
    yoga: [
      {
        id: "yoga-flexibility",
        name: "Flexibility Flow",
        duration: "45 mins",
        difficulty: "Beginner",
        exercises: 3,
        calories: 120,
        description: "Improve flexibility and reduce stress",
        image: "https://images.unsplash.com/photo-1651525764807-792769578760?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8eW9nYSUyMGd5bSUyMHdvcmtvdXR8ZW58MHx8MHx8fDA%3D",
      },
    ],
  }

  const exerciseDetails = {
    // ABS WORKOUTS
    "abs-beginner": [
      {
        id: 1,
        name: "Basic Crunches",
        sets: 3,
        reps: "15 reps",
        duration: 45,
        restTime: 30,
        description: "Classic abdominal exercise targeting upper abs",
        image: "https://media.istockphoto.com/id/1356510492/photo/determined-athletic-woman-running-on-treadmill-while-practicing-in-a-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=wmpoNHGGIaNnt62nKxOIRQ8ROeyE5OiBANY-c-8hIpw=",
       
        instructions: [
          "Lie on your back with knees bent",
          "Place hands behind head",
          "Lift shoulders off ground",
          "Squeeze abs at the top",
          "Lower slowly and repeat",
        ],
        tips: "Focus on controlled movement, not speed",
        muscles: ["Upper Abs", "Core"],
        difficulty: "Beginner",
      },
      {
        id: 2,
        name: "Plank Hold",
        sets: 3,
        reps: "30 seconds",
        duration: 30,
        restTime: 60,
        description: "Isometric core exercise for overall stability",
        image: "https://media.istockphoto.com/id/579128718/photo/fitness-woman-doing-abs-crunches.webp?a=1&b=1&s=612x612&w=0&k=20&c=WRUEQgjQl9doxwRB3Kn0go3vH7K6OjY3kXig7-7J_Ro=",
       
        instructions: [
          "Start in push-up position",
          "Lower to forearms",
          "Keep body straight",
          "Hold position",
          "Breathe steadily",
        ],
        tips: "Keep hips level, dont let them sag",
        muscles: ["Core", "Shoulders", "Back"],
        difficulty: "Beginner",
      },
      {
        id: 3,
        name: "Leg Raises",
        sets: 3,
        reps: "12 reps",
        duration: 40,
        restTime: 45,
        description: "Target lower abs with controlled leg movement",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Lie flat on back",
          "Keep legs straight",
          "Lift legs to 90 degrees",
          "Lower slowly",
          "Dont let feet touch ground",
        ],
        tips: "Control the descent for maximum effectiveness",
        muscles: ["Lower Abs", "Hip Flexors"],
        difficulty: "Beginner",
      },
      {
        id: 4,
        name: "Mountain Climbers",
        sets: 3,
        reps: "20 reps",
        duration: 50,
        restTime: 40,
        description: "Dynamic cardio exercise for core and conditioning",
        image: "/placeholder.svg?height=400&width=600",
        
        instructions: [
          "Start in plank position",
          "Bring one knee to chest",
          "Switch legs quickly",
          "Keep core tight",
          "Maintain steady rhythm",
        ],
        tips: "Keep hips stable and core engaged",
        muscles: ["Core", "Cardio", "Shoulders"],
        difficulty: "Beginner",
      },
    ],
    "abs-intermediate": [
      {
        id: 1,
        name: "Russian Twists",
        sets: 4,
        reps: "20 reps",
        duration: 60,
        restTime: 45,
        description: "Rotational core exercise for obliques",
        image: "/placeholder.svg?height=400&width=600",
  
        
        instructions: [
          "Sit with knees bent",
          "Lean back slightly",
          "Rotate torso side to side",
          "Keep core engaged",
          "Touch ground on each side",
        ],
        tips: "Keep feet off ground for added difficulty",
        muscles: ["Obliques", "Core"],
        difficulty: "Intermediate",
      },
      {
        id: 2,
        name: "Dead Bug",
        sets: 3,
        reps: "10 each side",
        duration: 55,
        restTime: 50,
        description: "Core stability exercise with limb movement",
        image: "/placeholder.svg?height=400&width=600",
     
        
        instructions: [
          "Lie on back, arms up",
          "Knees bent at 90 degrees",
          "Lower opposite arm and leg",
          "Return to start",
          "Alternate sides",
        ],
        tips: "Keep lower back pressed to floor",
        muscles: ["Deep Core", "Stability"],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        name: "Bicycle Crunches",
        sets: 4,
        reps: "15 each side",
        duration: 70,
        restTime: 40,
        description: "Dynamic exercise targeting obliques and rectus abdominis",
        image: "/placeholder.svg?height=400&width=600",
     
        
        instructions: [
          "Lie on back, hands behind head",
          "Bring knee to opposite elbow",
          "Extend other leg",
          "Switch sides in cycling motion",
          "Keep core tight",
        ],
        tips: "Focus on the twist, not speed",
        muscles: ["Obliques", "Upper Abs", "Lower Abs"],
        difficulty: "Intermediate",
      },
    ],
    "abs-advanced": [
      {
        id: 1,
        name: "Dragon Flag",
        sets: 4,
        reps: "8 reps",
        duration: 90,
        restTime: 60,
        description: "Advanced core exercise for maximum strength",
        image: "/placeholder.svg?height=400&width=600",
       
        
        instructions: [
          "Lie on bench, grip behind head",
          "Lift entire body up",
          "Keep body straight",
          "Lower slowly with control",
          "Only shoulders touch bench",
        ],
        tips: "Master easier progressions first",
        muscles: ["Full Core", "Lats", "Shoulders"],
        difficulty: "Advanced",
      },
      {
        id: 2,
        name: "Hanging Leg Raises",
        sets: 4,
        reps: "12 reps",
        duration: 75,
        restTime: 45,
        description: "Hanging exercise for lower abs and grip strength",
        image: "/placeholder.svg?height=400&width=600",
       
        
        instructions: [
          "Hang from pull-up bar",
          "Keep legs straight",
          "Lift legs to 90 degrees",
          "Control the descent",
          "Avoid swinging",
        ],
        tips: "Use straps if grip fails before abs",
        muscles: ["Lower Abs", "Hip Flexors", "Forearms"],
        difficulty: "Advanced",
      },
      {
        id: 3,
        name: "V-Ups",
        sets: 4,
        reps: "15 reps",
        duration: 65,
        restTime: 50,
        description: "Full range abdominal exercise",
        image: "/placeholder.svg?height=400&width=600",
      
        
        instructions: [
          "Lie flat on back",
          "Arms overhead",
          "Simultaneously lift legs and torso",
          "Touch toes at top",
          "Lower with control",
        ],
        tips: "Keep movements smooth and controlled",
        muscles: ["Full Abs", "Hip Flexors"],
        difficulty: "Advanced",
      },
      {
        id: 4,
        name: "Hollow Body Hold",
        sets: 3,
        reps: "45 seconds",
        duration: 45,
        restTime: 60,
        description: "Isometric exercise for core strength",
        image: "/placeholder.svg?height=400&width=600",
  
        
        instructions: [
          "Lie on back",
          "Press lower back to floor",
          "Lift shoulders and legs",
          "Create hollow shape",
          "Hold position",
        ],
        tips: "Keep lower back pressed down",
        muscles: ["Deep Core", "Hip Flexors"],
        difficulty: "Advanced",
      },
      {
        id: 5,
        name: "Turkish Get-Up",
        sets: 3,
        reps: "5 each side",
        duration: 120,
        restTime: 90,
        description: "Complex movement for total body strength",
        image: "/placeholder.svg?height=400&width=600",
 
        
        instructions: [
          "Start lying with weight overhead",
          "Roll to elbow, then hand",
          "Bridge up to kneeling",
          "Stand up completely",
          "Reverse the movement",
        ],
        tips: "Master bodyweight version first",
        muscles: ["Full Body", "Core", "Shoulders"],
        difficulty: "Advanced",
      },
    ],
    // CHEST WORKOUTS
    "chest-power": [
      {
        id: 1,
        name: "Push-Ups",
        sets: 4,
        reps: "15 reps",
        duration: 60,
        restTime: 45,
        description: "Classic bodyweight chest exercise",
        image: "/placeholder.svg?height=400&width=600",
    
        
        instructions: [
          "Start in plank position",
          "Lower chest to ground",
          "Push back up",
          "Keep body straight",
          "Control the movement",
        ],
        tips: "Modify on knees if needed",
        muscles: ["Chest", "Triceps", "Shoulders"],
        difficulty: "Intermediate",
      },
      {
        id: 2,
        name: "Diamond Push-Ups",
        sets: 3,
        reps: "10 reps",
        duration: 50,
        restTime: 60,
        description: "Tricep-focused push-up variation",
        image: "/placeholder.svg?height=400&width=600",
      
        
        instructions: [
          "Form diamond with hands",
          "Place under chest",
          "Lower down slowly",
          "Push back up",
          "Keep elbows close",
        ],
        tips: "Focus on tricep engagement",
        muscles: ["Triceps", "Inner Chest"],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        name: "Wide Push-Ups",
        sets: 4,
        reps: "12 reps",
        duration: 55,
        restTime: 50,
        description: "Wide grip for outer chest emphasis",
        image: "/placeholder.svg?height=400&width=600",
     
        
        instructions: [
          "Place hands wider than shoulders",
          "Lower chest down",
          "Feel stretch in chest",
          "Push back up",
          "Squeeze chest at top",
        ],
        tips: "Focus on chest stretch at bottom",
        muscles: ["Outer Chest", "Shoulders"],
        difficulty: "Intermediate",
      },
      {
        id: 4,
        name: "Pike Push-Ups",
        sets: 3,
        reps: "8 reps",
        duration: 45,
        restTime: 60,
        description: "Shoulder-focused push-up variation",
        image: "/placeholder.svg?height=400&width=600",
    
        
        instructions: [
          "Start in downward dog",
          "Lower head toward ground",
          "Push back up",
          "Keep hips high",
          "Focus on shoulders",
        ],
        tips: "Great preparation for handstand push-ups",
        muscles: ["Shoulders", "Upper Chest"],
        difficulty: "Intermediate",
      },
    ],
    "chest-definition": [
      {
        id: 1,
        name: "Incline Push-Ups",
        sets: 3,
        reps: "12 reps",
        duration: 50,
        restTime: 45,
        description: "Easier push-up variation for beginners",
        image: "/placeholder.svg?height=400&width=600",

        
        instructions: [
          "Place hands on elevated surface",
          "Lower chest to surface",
          "Push back up",
          "Keep body straight",
          "Control the movement",
        ],
        tips: "Higher surface = easier exercise",
        muscles: ["Chest", "Triceps", "Shoulders"],
        difficulty: "Beginner",
      },
      {
        id: 2,
        name: "Wall Push-Ups",
        sets: 3,
        reps: "15 reps",
        duration: 40,
        restTime: 30,
        description: "Beginner-friendly chest exercise",
        image: "/placeholder.svg?height=400&width=600",
       
        
        instructions: [
          "Stand arms length from wall",
          "Place palms on wall",
          "Lean in toward wall",
          "Push back to start",
          "Keep body straight",
        ],
        tips: "Perfect for building initial strength",
        muscles: ["Chest", "Shoulders"],
        difficulty: "Beginner",
      },
      {
        id: 3,
        name: "Chest Squeeze",
        sets: 3,
        reps: "20 reps",
        duration: 45,
        restTime: 40,
        description: "Isometric chest activation exercise",
        image: "/placeholder.svg?height=400&width=600",
     
        
        instructions: [
          "Press palms together at chest",
          "Squeeze as hard as possible",
          "Hold for 2 seconds",
          "Release and repeat",
          "Feel chest muscles working",
        ],
        tips: "Great for muscle activation",
        muscles: ["Inner Chest"],
        difficulty: "Beginner",
      },
      {
        id: 4,
        name: "Arm Circles",
        sets: 2,
        reps: "15 each direction",
        duration: 60,
        restTime: 30,
        description: "Shoulder mobility and warm-up",
        image: "/placeholder.svg?height=400&width=600",
        
        instructions: [
          "Extend arms to sides",
          "Make small circles",
          "Gradually increase size",
          "Reverse direction",
          "Keep arms straight",
        ],
        tips: "Great warm-up exercise",
        muscles: ["Shoulders", "Upper Back"],
        difficulty: "Beginner",
      },
    ],
    // LEGS WORKOUTS
    "legs-strength": [
      {
        id: 1,
        name: "Squats",
        sets: 4,
        reps: "15 reps",
        duration: 60,
        restTime: 45,
        description: "Fundamental lower body exercise",
        image: "/placeholder.svg?height=400&width=600",
       
        instructions: [
          "Stand with feet shoulder-width apart",
          "Lower hips back and down",
          "Keep chest up",
          "Go down until thighs parallel",
          "Drive through heels to stand",
        ],
        tips: "Keep knees tracking over toes",
        muscles: ["Quadriceps", "Glutes", "Hamstrings"],
        difficulty: "Intermediate",
      },
      {
        id: 2,
        name: "Lunges",
        sets: 3,
        reps: "12 each leg",
        duration: 75,
        restTime: 50,
        description: "Unilateral leg strengthening exercise",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Step forward into lunge",
          "Lower back knee toward ground",
          "Keep front knee over ankle",
          "Push back to starting position",
          "Alternate legs",
        ],
        tips: "Keep torso upright throughout",
        muscles: ["Quadriceps", "Glutes", "Calves"],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        name: "Single Leg Deadlifts",
        sets: 3,
        reps: "10 each leg",
        duration: 70,
        restTime: 60,
        description: "Balance and posterior chain exercise",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Stand on one leg",
          "Hinge at hip, reach forward",
          "Lift back leg behind you",
          "Keep back straight",
          "Return to standing",
        ],
        tips: "Focus on balance and control",
        muscles: ["Hamstrings", "Glutes", "Core"],
        difficulty: "Intermediate",
      },
      {
        id: 4,
        name: "Calf Raises",
        sets: 4,
        reps: "20 reps",
        duration: 50,
        restTime: 30,
        description: "Calf strengthening exercise",
        image: "/placeholder.svg?height=400&width=600",
    
        instructions: [
          "Stand with feet hip-width apart",
          "Rise up onto toes",
          "Hold at the top",
          "Lower slowly",
          "Feel stretch at bottom",
        ],
        tips: "Use wall for balance if needed",
        muscles: ["Calves"],
        difficulty: "Intermediate",
      },
    ],
    "glutes-booty": [
      {
        id: 1,
        name: "Glute Bridges",
        sets: 3,
        reps: "15 reps",
        duration: 45,
        restTime: 40,
        description: "Glute activation and strengthening",
        image: "/placeholder.svg?height=400&width=600",
    
        instructions: [
          "Lie on back, knees bent",
          "Lift hips up",
          "Squeeze glutes at top",
          "Hold for 2 seconds",
          "Lower slowly",
        ],
        tips: "Focus on glute squeeze",
        muscles: ["Glutes", "Hamstrings"],
        difficulty: "Beginner",
      },
      {
        id: 2,
        name: "Clamshells",
        sets: 3,
        reps: "12 each side",
        duration: 50,
        restTime: 35,
        description: "Hip abductor strengthening",
        image: "/placeholder.svg?height=400&width=600",


        instructions: [
          "Lie on side, knees bent",
          "Keep feet together",
          "Lift top knee up",
          "Feel glutes working",
          "Lower with control",
        ],
        tips: "Keep hips stacked",
        muscles: ["Glute Medius", "Hip Abductors"],
        difficulty: "Beginner",
      },
      {
        id: 3,
        name: "Fire Hydrants",
        sets: 3,
        reps: "10 each side",
        duration: 55,
        restTime: 45,
        description: "Hip mobility and glute activation",
        image: "/placeholder.svg?height=400&width=600",
    
        instructions: [
          "Start on hands and knees",
          "Lift leg out to side",
          "Keep knee bent",
          "Feel glutes working",
          "Lower with control",
        ],
        tips: "Keep hips level",
        muscles: ["Glutes", "Hip Abductors"],
        difficulty: "Beginner",
      },
    ],
    // CARDIO WORKOUTS
    "hiit-fat-burn": [
      {
        id: 1,
        name: "Burpees",
        sets: 4,
        reps: "10 reps",
        duration: 90,
        restTime: 60,
        description: "Full body high-intensity exercise",
        image: "/placeholder.svg?height=400&width=600",
     
        instructions: [
          "Start standing",
          "Drop to squat, hands down",
          "Jump feet back to plank",
          "Do push-up (optional)",
          "Jump feet forward, jump up",
        ],
        tips: "Modify by stepping instead of jumping",
        muscles: ["Full Body", "Cardio"],
        difficulty: "Advanced",
      },
      {
        id: 2,
        name: "High Knees",
        sets: 4,
        reps: "30 seconds",
        duration: 30,
        restTime: 30,
        description: "Cardio exercise for leg strength",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Run in place",
          "Bring knees to chest",
          "Pump arms",
          "Stay on balls of feet",
          "Maintain quick pace",
        ],
        tips: "Focus on knee height",
        muscles: ["Hip Flexors", "Calves", "Cardio"],
        difficulty: "Advanced",
      },
      {
        id: 3,
        name: "Jump Squats",
        sets: 4,
        reps: "12 reps",
        duration: 60,
        restTime: 45,
        description: "Explosive lower body exercise",
        image: "/placeholder.svg?height=400&width=600",
    
        instructions: [
          "Start in squat position",
          "Jump up explosively",
          "Land softly in squat",
          "Immediately repeat",
          "Use arms for momentum",
        ],
        tips: "Land softly to protect knees",
        muscles: ["Quadriceps", "Glutes", "Calves"],
        difficulty: "Advanced",
      },
    ],
    "cardio-endurance": [
      {
        id: 1,
        name: "Marching in Place",
        sets: 3,
        reps: "60 seconds",
        duration: 60,
        restTime: 30,
        description: "Low-impact cardio exercise",
        image: "/placeholder.svg?height=400&width=600",
   
        
        instructions: [
          "March in place",
          "Lift knees high",
          "Swing arms naturally",
          "Keep steady rhythm",
          "Breathe regularly",
        ],
        tips: "Great warm-up exercise",
        muscles: ["Hip Flexors", "Cardio"],
        difficulty: "Intermediate",
      },
      {
        id: 2,
        name: "Step-Ups",
        sets: 3,
        reps: "15 each leg",
        duration: 75,
        restTime: 45,
        description: "Functional cardio and leg exercise",
        image: "/placeholder.svg?height=400&width=600",
   
        instructions: [
          "Step up onto platform",
          "Bring other foot up",
          "Step down with control",
          "Alternate leading leg",
          "Use arms for balance",
        ],
        tips: "Use sturdy platform or stairs",
        muscles: ["Quadriceps", "Glutes", "Cardio"],
        difficulty: "Intermediate",
      },
    ],
    // BACK WORKOUTS
    "back-strength": [
      {
        id: 1,
        name: "Superman",
        sets: 3,
        reps: "12 reps",
        duration: 50,
        restTime: 45,
        description: "Lower back strengthening exercise",
        image: "/placeholder.svg?height=400&width=600",
  
        instructions: [
          "Lie face down",
          "Extend arms forward",
          "Lift chest and legs",
          "Hold for 2 seconds",
          "Lower with control",
        ],
        tips: "Keep neck neutral",
        muscles: ["Lower Back", "Glutes"],
        difficulty: "Intermediate",
      },
      {
        id: 2,
        name: "Reverse Fly",
        sets: 3,
        reps: "15 reps",
        duration: 55,
        restTime: 40,
        description: "Upper back and rear delt exercise",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Bend forward at hips",
          "Extend arms to sides",
          "Squeeze shoulder blades",
          "Feel upper back working",
          "Lower with control",
        ],
        tips: "Keep slight bend in elbows",
        muscles: ["Rear Delts", "Rhomboids", "Mid Traps"],
        difficulty: "Intermediate",
      },
      {
        id: 3,
        name: "Bird Dog",
        sets: 3,
        reps: "10 each side",
        duration: 60,
        restTime: 50,
        description: "Core stability and back exercise",
        image: "/placeholder.svg?height=400&width=600",
   
        instructions: [
          "Start on hands and knees",
          "Extend opposite arm and leg",
          "Hold for 3 seconds",
          "Keep hips level",
          "Alternate sides",
        ],
        tips: "Focus on stability",
        muscles: ["Core", "Lower Back", "Glutes"],
        difficulty: "Intermediate",
      },
    ],
    // YOGA WORKOUTS
    "yoga-flexibility": [
      {
        id: 1,
        name: "Downward Dog",
        sets: 3,
        reps: "30 seconds",
        duration: 30,
        restTime: 15,
        description: "Classic yoga pose for full body stretch",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Start on hands and knees",
          "Tuck toes under",
          "Lift hips up and back",
          "Straighten legs",
          "Press hands into ground",
        ],
        tips: "Pedal feet to warm up calves",
        muscles: ["Hamstrings", "Calves", "Shoulders"],
        difficulty: "Beginner",
      },
      {
        id: 2,
        name: "Child's Pose",
        sets: 2,
        reps: "45 seconds",
        duration: 45,
        restTime: 15,
        description: "Restorative pose for relaxation",
        image: "/placeholder.svg?height=400&width=600",

        instructions: [
          "Kneel on floor",
          "Sit back on heels",
          "Fold forward",
          "Extend arms forward",
          "Rest forehead on ground",
        ],
        tips: "Great for stress relief",
        muscles: ["Back", "Hips", "Shoulders"],
        difficulty: "Beginner",
      },
      {
        id: 3,
        name: "Cat-Cow Stretch",
        sets: 2,
        reps: "10 reps",
        duration: 60,
        restTime: 30,
        description: "Spinal mobility exercise",
        image: "/placeholder.svg?height=400&width=600",
      
        instructions: [
          "Start on hands and knees",
          "Arch back, look up (cow)",
          "Round back, tuck chin (cat)",
          "Move slowly between poses",
          "Breathe with movement",
        ],
        tips: "Great for spine health",
        muscles: ["Spine", "Core", "Neck"],
        difficulty: "Beginner",
      },
    ],
  }

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)",
      color: "white",
    },
    header: {
      textAlign: "center",
      padding: "80px 16px 40px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    title: {
      fontSize: "3rem",
      fontWeight: 700,
      marginBottom: "16px",
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      opacity: isVisible ? 1 : 0,
      transition: "all 1s ease",
    },
    titleGradient: {
      background: "linear-gradient(to right, #c084fc, #f472b6)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
    },
    subtitle: {
      fontSize: "1.25rem",
      color: "#d1d5db",
      maxWidth: "600px",
      margin: "0 auto",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "none",
      color: "white",
      padding: "12px 20px",
      borderRadius: "50px",
      cursor: "pointer",
      marginBottom: "32px",
      transition: "all 0.3s ease",
    },
    categoriesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
      padding: "40px 0",
    },
    categoryCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "24px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    categoryImage: {
      width: "100%",
      height: "120px",
      objectFit: "cover",
      borderRadius: "12px",
      marginBottom: "16px",
    },
    categoryHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
    },
    categoryIcon: {
      padding: "8px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    categoryTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      margin: 0,
    },
    categoryDescription: {
      color: "#d1d5db",
      marginBottom: "16px",
    },
    categoryStats: {
      display: "flex",
      gap: "16px",
      fontSize: "0.875rem",
      color: "#9ca3af",
    },
    workoutsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
      padding: "40px 0",
    },
    workoutCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    workoutImage: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
    },
    workoutContent: {
      padding: "20px",
    },
    workoutTitle: {
      fontSize: "1.25rem",
      fontWeight: 700,
      marginBottom: "8px",
    },
    workoutDescription: {
      color: "#d1d5db",
      marginBottom: "16px",
    },
    workoutStats: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      fontSize: "0.875rem",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#9ca3af",
    },
    exercisesList: {
      padding: "40px 0",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "32px",
      alignItems: "start",
    },
    exerciseCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "24px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    exerciseHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px",
      flexWrap: "wrap",
      gap: "16px",
    },
    exerciseTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      margin: 0,
      flex: 1,
    },
    exerciseSpecs: {
      display: "flex",
      gap: "16px",
      fontSize: "0.875rem",
      color: "#9ca3af",
      flexWrap: "wrap",
    },

    exerciseDescription: {
      color: "#d1d5db",
      marginBottom: "24px",
      fontSize: "1.1rem",
      lineHeight: "1.6",
    },
    exerciseDetails: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
      alignItems: "start",
    },
    detailSection: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "20px",
      borderRadius: "12px",
      height: "fit-content",
    },
    detailTitle: {
      fontSize: "1.125rem",
      fontWeight: 600,
      marginBottom: "12px",
      color: "#c084fc",
    },
    instructionsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    instructionItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "12px",
      color: "#d1d5db",
      lineHeight: "1.5",
    },
    muscleTag: {
      background: "rgba(196, 132, 252, 0.2)",
      color: "#c084fc",
      padding: "6px 12px",
      borderRadius: "12px",
      fontSize: "0.875rem",
      marginRight: "8px",
      marginBottom: "8px",
      display: "inline-block",
      fontWeight: 500,
    },
    startButton: {
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      color: "white",
      padding: "16px 32px",
      borderRadius: "50px",
      fontWeight: 600,
      border: "none",
      cursor: "pointer",
      fontSize: "1.125rem",
      transition: "all 0.3s ease",
      marginTop: "24px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    workoutScreen: {
      padding: "40px 0",
      textAlign: "center",
    },
    timerDisplay: {
      fontSize: "6rem",
      fontWeight: 700,
      color: isResting ? "#f59e0b" : "#10b981",
      marginBottom: "24px",
      textShadow: "0 0 20px rgba(16, 185, 129, 0.5)",
    },
  
    exerciseInfo: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "24px",
      maxWidth: "600px",
      margin: "0 auto 24px",
    },
    controlButtons: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
    },
    controlButton: {
      background: "rgba(255, 255, 255, 0.1)",
      border: "none",
      color: "white",
      padding: "12px 24px",
      borderRadius: "50px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    progressBar: {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      height: "8px",
      margin: "24px 0",
      overflow: "hidden",
    },
    progressFill: {
      background: "linear-gradient(to right, #9333ea, #ec4899)",
      height: "100%",
      borderRadius: "10px",
      transition: "width 0.3s ease",
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "16px",
      borderRadius: "12px",
      textAlign: "center",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#c084fc",
    },
    statLabel: {
      fontSize: "0.875rem",
      color: "#9ca3af",
      marginTop: "4px",
    },
    completionScreen: {
      textAlign: "center",
      padding: "60px 20px",
    },
    completionTitle: {
      fontSize: "3rem",
      fontWeight: 700,
      marginBottom: "16px",
      color: "#10b981",
    },
    completionMessage: {
      fontSize: "1.25rem",
      color: "#d1d5db",
      marginBottom: "32px",
    },
    exerciseImage: {
      width: "100%",
      maxWidth: "100%",
      height: "250px",
      borderRadius: "12px",
      marginBottom: "16px",
      backgroundColor: "#1f2937",
      objectFit: "cover",
    },
    currentExerciseImage: {
      width: "100%",
      maxWidth: "500px",
      height: "300px",
      objectFit: "cover",
      borderRadius: "16px",
      marginBottom: "24px",
    },
  }

  const renderWorkoutScreen = () => {
    const currentExercise = getCurrentExercise()
    const progress = ((currentExerciseIndex + 1) / getWorkoutExercises().length) * 100

    return (
      <div style={styles.workoutScreen}>
        <button
          style={styles.backButton}
          onClick={() => {
            stopSpeech()
            setWorkoutActive(false)
            setSelectedWorkout(null)
          }}
        >
          <ArrowLeft style={{ width: "20px", height: "20px" }} />
          End Workout
        </button>

        <div style={styles.timerDisplay}>{formatTime(timeLeft)}</div>

        <div style={{ fontSize: "1.5rem", marginBottom: "16px", color: isResting ? "#f59e0b" : "#10b981" }}>
          {isResting ? "REST TIME" : "EXERCISE TIME"}
        </div>

        <img
          src={currentExercise.image || "/placeholder.svg"}
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
              width: `${progress}%`,
            }}
          />
        </div>

        <div style={styles.controlButtons}>
          <button style={styles.controlButton} onClick={pauseWorkout}>
            {isPaused ? (
              <Play style={{ width: "20px", height: "20px" }} />
            ) : (
              <Pause style={{ width: "20px", height: "20px" }} />
            )}
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button style={styles.controlButton} onClick={skipExercise}>
            <SkipForward style={{ width: "20px", height: "20px" }} />
            Skip
          </button>

          <button style={styles.controlButton} onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? (
              <Volume2 style={{ width: "20px", height: "20px" }} />
            ) : (
              <VolumeX style={{ width: "20px", height: "20px" }} />
            )}
            Sound
          </button>

          <button
            style={styles.controlButton}
            onClick={() => {
              setVoiceEnabled(!voiceEnabled)
              if (voiceEnabled) {
                stopSpeech()
              }
            }}
          >
            {voiceEnabled ? (
              <Mic style={{ width: "20px", height: "20px" }} />
            ) : (
              <MicOff style={{ width: "20px", height: "20px" }} />
            )}
            Voice
          </button>
        </div>

        <div style={{ fontSize: "1.125rem", color: "#d1d5db" }}>
          Next:{" "}
          {currentExerciseIndex < getWorkoutExercises().length - 1
            ? getWorkoutExercises()[currentExerciseIndex + 1].name
            : "Workout Complete!"}
        </div>
      </div>
    )
  }

  const renderCompletionScreen = () => (
    <div style={styles.completionScreen}>
      <div style={styles.completionTitle}>🎉 Workout Complete!</div>
      <div style={styles.completionMessage}>Great job completing the {selectedWorkout.name} workout!</div>

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
          setWorkoutComplete(false)
          setSelectedWorkout(null)
        }}
      >
        <Trophy style={{ width: "20px", height: "20px" }} />
        Back to Workouts
      </button>
    </div>
  )

  const renderCategories = () => (
    <div style={styles.categoriesGrid}>
      {workoutCategories.map((category, index) => (
        <div
          key={category.id}
          style={{
            ...styles.categoryCard,
            animationDelay: `${index * 0.1}s`,
          }}
          onClick={() => setSelectedCategory(category)}
        >
          <img src={category.image || "/placeholder.svg"} alt={category.name} style={styles.categoryImage} />
          <div style={styles.categoryHeader}>
            <div
              style={{
                ...styles.categoryIcon,
                backgroundColor: category.color,
              }}
            >
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
  )

  const renderWorkouts = () => (
    <div>
      <button style={styles.backButton} onClick={() => setSelectedCategory(null)}>
        <ArrowLeft style={{ width: "20px", height: "20px" }} />
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
          <div key={workout.id} style={styles.workoutCard} onClick={() => setSelectedWorkout(workout)}>
            <img src={workout.image || "/placeholder.svg"} alt={workout.name} style={styles.workoutImage} />
            <div style={styles.workoutContent}>
              <h3 style={styles.workoutTitle}>{workout.name}</h3>
              <p style={styles.workoutDescription}>{workout.description}</p>
              <div style={styles.workoutStats}>
                <div style={styles.statItem}>
                  <Timer style={{ width: "16px", height: "16px" }} />
                  {workout.duration}
                </div>
                <div style={styles.statItem}>
                  <Target style={{ width: "16px", height: "16px" }} />
                  {workout.exercises} exercises
                </div>
                <div style={styles.statItem}>
                  <TrendingUp style={{ width: "16px", height: "16px" }} />
                  {workout.difficulty}
                </div>
                <div style={styles.statItem}>
                  <Flame style={{ width: "16px", height: "16px" }} />
                  {workout.calories} cal
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderExercises = () => (
    <div>
      <button style={styles.backButton} onClick={() => setSelectedWorkout(null)}>
        <ArrowLeft style={{ width: "20px", height: "20px" }} />
        Back to Workouts
      </button>

      <div style={styles.header}>
        <h2 style={styles.title}>
          {selectedWorkout.name} <span style={styles.titleGradient}>Exercises</span>
        </h2>
        <p style={styles.subtitle}>
          {selectedWorkout.description} • {selectedWorkout.duration} • {selectedWorkout.exercises} exercises
        </p>
        <button style={styles.startButton} onClick={startWorkout}>
          <Play style={{ width: "20px", height: "20px" }} />
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

            <img src={exercise.image || "/placeholder.svg"} alt={exercise.name} style={styles.exerciseImage} />

            

            <p style={styles.exerciseDescription}>{exercise.description}</p>

            <div style={styles.exerciseDetails}>
              <div style={styles.detailSection}>
                <h4 style={styles.detailTitle}>Instructions</h4>
                <ul style={styles.instructionsList}>
                  {exercise.instructions.map((instruction, idx) => (
                    <li key={idx} style={styles.instructionItem}>
                      <CheckCircle style={{ width: "16px", height: "16px", color: "#10b981" }} />
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h4 style={styles.detailTitle}>Tips & Muscles</h4>
                <p style={{ color: "#d1d5db", marginBottom: "12px" }}>
                  <strong>Tip:</strong> {exercise.tips}
                </p>
                <div>
                  <strong style={{ color: "#c084fc" }}>Target Muscles:</strong>
                  <div style={{ marginTop: "8px" }}>
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
  )

  // Add cleanup effects
  useEffect(() => {
    if (!voiceEnabled) {
      stopSpeech()
    }
  }, [voiceEnabled])

  useEffect(() => {
    return () => {
      stopSpeech()
    }
  }, [])

  useEffect(() => {
    if (!workoutActive) {
      stopSpeech()
    }
  }, [workoutActive])

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
  )
}

export default GymFeatures