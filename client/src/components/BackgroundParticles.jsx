import React, { useEffect, useState } from 'react';

const BackgroundParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        animationDuration: Math.random() * 10 + 5,
        animationDelay: Math.random() * 5,
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="background-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;
