import React, { useState, useEffect } from 'react';
import logo from '../assets/logo_inverted.png';
import './TeamWheel.css';

const TeamWheel = ({ members }) => {
  const [activeMember, setActiveMember] = useState(null);

  // Calculate positions for the wheel
  const radius = 300; // Distance from center
  const totalMembers = members.length;
  const angleStep = (2 * Math.PI) / totalMembers;

  return (
    <div className="team-wheel-wrapper">
      {/* Desktop Wheel View */}
      <div className="team-wheel-container">
        <div className="wheel-orbit"></div>
        <div className="wheel-center glass">
          <img src={logo.src} alt="Frog8 Logo" className="wheel-center-img" />
        </div>

        {members.map((member, index) => {
          // Start from top (-PI/2)
          const angle = index * angleStep - Math.PI / 2;
          const x = Math.round(radius * Math.cos(angle));
          const y = Math.round(radius * Math.sin(angle));

          return (
            <div
              key={index}
              className={`wheel-card-position`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                zIndex: activeMember === index ? 50 : 20
              }}
              onMouseEnter={() => setActiveMember(index)}
              onMouseLeave={() => setActiveMember(null)}
            >
              <div className="glass wheel-card">
                <div className="wheel-card-image">
                  {member.image ? (
                    <img src={member.image} alt={member.name} loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-green-400">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="wheel-card-content">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Grid View */}
      <div className="team-grid-mobile grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {members.map((member, index) => (
          <div key={index} className="glass leader-card">
            <div className="leader-image-wrapper">
              {member.image ? (
                <img src={member.image} alt={member.name} className="leader-image" loading="lazy" />
              ) : (
                <div className="leader-image-placeholder">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <h3 className="leader-name">{member.name}</h3>
            <p className="leader-role">{member.role}</p>
            <p className="leader-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamWheel;

