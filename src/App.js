import React, { useState, useEffect } from 'react';
import { Heart, Star, Gift, Sparkles, Moon, Crown, Cake, Party, Music } from 'lucide-react';


const useBackgroundMusic = (audioPath) => {
  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/audio/${audioPath}`);
    audio.loop = true;
    audio.play().catch(e => console.log("Audio autoplay prevented:", e));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioPath]);
};



// Floating Icon Component used in multiple pages
const FloatingIcon = ({ Icon, style }) => {
  const [position, setPosition] = useState(style);

  useEffect(() => {
    const duration = 15 + Math.random() * 10;
    const animation = setInterval(() => {
      setPosition(prev => ({
        ...prev,
        transform: `translate(${Math.sin(Date.now() / 1000) * 20}px, ${Math.cos(Date.now() / 1000) * 20}px) rotate(${Math.sin(Date.now() / 1000) * 30}deg)`
      }));
    }, 50);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="absolute text-white/20" style={position}>
      <Icon size={24} />
    </div>
  );
};

const CountdownPage = ({ onStartCelebration }) => {
  
  useBackgroundMusic('WildestDream.mp3');  // This will play music throughout

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Background floating icons configuration
  const floatingIcons = [
    { Icon: Heart, style: { top: '10%', left: '10%' } },
    { Icon: Star, style: { top: '20%', right: '20%' } },
    { Icon: Gift, style: { bottom: '15%', left: '25%' } },
    { Icon: Sparkles, style: { top: '40%', right: '15%' } },
    { Icon: Heart, style: { bottom: '30%', right: '30%' } },
    { Icon: Star, style: { top: '60%', left: '15%' } },
    { Icon: Sparkles, style: { bottom: '20%', right: '10%' } },
    { Icon: Gift, style: { top: '30%', left: '30%' } },
  ];

  useEffect(() => {
    const targetDate = new Date('2024-11-22T00:00:00+05:30');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
        setIsTimeUp(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsTimeUp(true);
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(255,192,203,0.8) 0%, transparent 40%),
          radial-gradient(circle at top right, rgba(255,182,193,0.8) 0%, transparent 40%),
          radial-gradient(circle at bottom left, rgba(255,105,180,0.9) 0%, transparent 40%),
          radial-gradient(circle at bottom right, rgba(219,112,147,0.8) 0%, transparent 40%),
          linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #FFB6C1 100%)
        `
      }}
    >
      {floatingIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}

      <div className="text-center z-10 px-4">
        <h1 className="text-5xl font-bold mb-8 text-white drop-shadow-lg">Tick-Tock to 18 O'Clock </h1>
        
        <div className="flex justify-center space-x-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white/20 backdrop-blur-sm p-4 rounded-lg w-24 shadow-lg">
              <div className="text-5xl font-extrabold text-white">{value}</div>
              <div className="text-sm uppercase text-white/80">{unit}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            onClick={onStartCelebration}
            className="bg-white/90 text-pink-600 px-8 py-4 rounded-full font-bold 
                     hover:bg-white transition flex items-center justify-center 
                     space-x-2 shadow-lg transform hover:scale-105"
          >
            <Sparkles className="mr-2" /> 
            {isTimeUp ? "Start Celebration" : "Sneek Peek !?"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TooEarly = ({ onBack }) => {
  const floatingIcons = [
    { Icon: Heart, style: { top: '10%', left: '10%', opacity: '0.2' } },
    { Icon: Star, style: { top: '20%', right: '20%', opacity: '0.15' } },
    { Icon: Moon, style: { bottom: '15%', left: '25%', opacity: '0.2' } },
    { Icon: Crown, style: { top: '40%', right: '15%', opacity: '0.15' } },
    { Icon: Star, style: { bottom: '30%', right: '30%', opacity: '0.2' } },
    { Icon: Heart, style: { top: '60%', left: '15%', opacity: '0.15' } },
    { Icon: Moon, style: { bottom: '20%', right: '10%', opacity: '0.2' } },
    { Icon: Crown, style: { top: '30%', left: '30%', opacity: '0.15' } },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #2c3e50, #3498db, #2980b9, #34495e)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite'
      }}
    >
      {floatingIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}

      <div className="text-center z-10 px-4 animate-fade-in">
        <h1 className="text-6xl font-bold mb-8 text-white drop-shadow-lg">
          Oops! Too Early
        </h1>
        
        <div className="max-w-2xl mx-auto text-xl mb-12 bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
          <p className="text-white/90 mb-4">
          📸 Caught ya in 4K 📸✨
          </p>
          <p className="text-white/80">
          🥸What did ya expect pre-party booze!? No sneek peak here... 
          </p>
          <p className="text-white/70">Have Hot Chocolate Milk in meantime ☕😋 
          </p>
          <p className="text-white/60">
          Back to where ya came from Miss!!😜
          </p>
        </div>

        <button 
          onClick={onBack}
          className="bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full 
                     font-bold hover:bg-white/30 transition flex items-center justify-center 
                     space-x-2 shadow-lg transform hover:scale-105 mx-auto"
        >
          <span>Back to Countdown</span>
        </button>
      </div>
    </div>
  );
};


const ShootingStar = ({ delay, duration, startPosition, angle }) => {
  return (
    <div 
      className="absolute w-1.5 h-1.5 bg-white rounded-full"
      style={{
        top: `${startPosition.top}%`,
        left: `${startPosition.left}%`,
        animation: `shooting-star-${angle} ${duration}s linear ${delay}s infinite`,
        boxShadow: '0 0 20px 4px rgba(255, 255, 255, 0.4)',
      }}
    >
      <div 
        className="w-12 h-[1px] origin-left"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
};

const MakeAWishPage = ({ onCompleteWish }) => {
  useBackgroundMusic('Interstellar.mp3');
  const [showStars, setShowStars] = useState(true);

  useEffect(() => {
    const wishTimer = setTimeout(() => {
      onCompleteWish();
    }, 20000);

    return () => clearTimeout(wishTimer);
  }, [onCompleteWish]);

  // Generate shooting stars with varied angles between 45-50 degrees
  const shootingStars = Array.from({ length: 24 }).map((_, i) => ({
    delay: Math.random() * 8,
    duration: 3 + Math.random() * 2,
    startPosition: {
      top: Math.random() * 70,
      left: Math.random() * -30 - 10
    },
    angle: Math.floor(Math.random() * 6) + 45
  }));

  return (
    <div className="min-h-screen relative overflow-hidden perspective-1000">
      {/* Multiple layered gradients for smoother transition */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at bottom center, rgba(25,25,35,1) 0%, rgba(15,15,25,0.98) 20%, rgba(10,10,20,0.97) 40%, rgba(5,5,15,0.95) 60%, rgba(0,0,10,1) 80%)',
        }}
      >
        {/* Additional subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(20,20,40,0.3) 0%, rgba(0,0,10,0.6) 100%)',
          }}
        />
      </div>

      {/* Static stars background */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              boxShadow: '0 0 2px rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
      </div>

      {/* Subtle blue haze overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,10,30,0.1) 100%)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Shooting stars */}
      {shootingStars.map((star, index) => (
        <ShootingStar key={index} {...star} />
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 p-4 text-center">
        <Moon className="mb-6 text-white/70" size={64} />
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Make a Wish
        </h1>
        <p className="max-w-2xl text-2xl mb-8 bg-black/30 backdrop-blur-sm p-6 rounded-xl">
          Close your eyes, take a deep breath, and make a heartfelt wish. 
          Let the magic of this moment fill your heart with hope and dreams.
        </p>
        <div className="animate-pulse text-xl opacity-70">
          Wish is being processed...
        </div>
      </div>

      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          
          ${Array.from({ length: 6 }, (_, i) => {
            const angle = i + 45;
            return `
              @keyframes shooting-star-${angle} {
                0% {
                  transform: translate3d(0, 0, 0) rotate(${angle}deg);
                  opacity: 1;
                }
                20% {
                  opacity: 1;
                }
                100% {
                  transform: translate3d(250vh, ${250 * Math.tan(angle * Math.PI / 180)}px, 400px) rotate(${angle}deg);
                  opacity: 0;
                }
              }
            `;
          }).join('\n')}
          
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.2;
              transform: scale(1);
            }
            50% { 
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
};

const BirthdayPage = () => {
  useBackgroundMusic('Aditi.mp3');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Background floating icons configuration with more variety
  const floatingIcons = [
    { Icon: Heart, style: { top: '10%', left: '10%' } },
    { Icon: Star, style: { top: '20%', right: '20%' } },
    { Icon: Gift, style: { bottom: '15%', left: '25%' } },
    { Icon: Sparkles, style: { top: '40%', right: '15%' } },
    { Icon: Crown, style: { bottom: '30%', right: '30%' } },
    { Icon: Star, style: { top: '60%', left: '15%' } },
    { Icon: Heart, style: { bottom: '20%', right: '10%' } },
    { Icon: Gift, style: { top: '30%', left: '30%' } },
    { Icon: Sparkles, style: { top: '70%', right: '25%' } },
    { Icon: Heart, style: { bottom: '40%', left: '20%' } },
    { Icon: Star, style: { top: '25%', right: '35%' } },
    { Icon: Crown, style: { bottom: '25%', left: '35%' } },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FF69B4, #FFA6C9, #FFB6C1, #FFC0CB, #FF69B4)',
        backgroundSize: '400% 400%',
        animation: 'gradientBG 15s ease infinite'
      }}
    >
      {/* Floating Icons */}
      {floatingIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}

      {/* Content with Fade In */}
      {showContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center p-4 animate-fade-in">
          <div className="mb-8 transform animate-bounce-slow">
            <Cake size={80} className="text-white drop-shadow-lg" />
          </div>

          <h1 className="text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-pink-100 drop-shadow-lg">
            Happy Aditi's Day!
          </h1>
          
          <div className="max-w-2xl mx-auto text-xl mb-12 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <p className="mb-4 font-medium">
            Happy 18th, my favorite human! 🎉 
            </p>
            <p className="font-medium">
            You're officially an adult now well, legally at least, because let's be honest, 
            I'm still going to tease you like a kid. Today's all about celebrating you: the quirks, the sass, the unmatched
            awesomeness. So here's to your first step into adulthood🥂. 🥳❤️ ✨
            </p>
            <p className="font-medium">
              Wishing you a year filled with amazing adventures and beautiful moments! 🌟
            </p>
            <p className="font-medium">
              P.S - Also Happy National Cranberry Relish Day 😂
            </p>
          </div>

        </div>
      )}

      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }

          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          .animate-bounce-gentle {
            animation: bounce-gentle 2s ease-in-out infinite;
          }

          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fadeIn 2s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};



const App = () => {
  const [page, setPage] = React.useState('countdown');

  const handleStartCelebration = () => {
    const targetDate = new Date('2024-11-22T00:00:00+05:30');
    const now = new Date();
    
    if (now >= targetDate) {
      setPage('make-a-wish');
    } else {
      setPage('too-early');
    }
  };

  const handleCompleteWish = () => {
    setPage('birthday');
  };

  const handleBackToCountdown = () => {
    setPage('countdown');
  };

  return (
    <div>
      {page === 'countdown' && (
        <CountdownPage onStartCelebration={handleStartCelebration} />
      )}
      {page === 'too-early' && (
        <TooEarly onBack={handleBackToCountdown} />
      )}
      {page === 'make-a-wish' && (
        <MakeAWishPage onCompleteWish={handleCompleteWish} />
      )}
      {page === 'birthday' && <BirthdayPage />}
    </div>
  );
};

export default App;