import React from "react";
import "../../App.css";
import { Trophy, Star, TrendingUp, Award } from 'lucide-react';

const PALETTE = {
  green1: '#338e77', // primary
  green2: '#6db77a',
  green3: '#a3d68c',
  green4: '#eaf3c2',
  teal1: '#13bcbc',
  teal2: '#4be0db',
  teal3: '#b2f1e5',
  yellow1: '#f9fa77',
  yellow2: '#b8e986',
  yellow3: '#8dd96a',
};

const user = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=338e77&color=fff",
  points: 120,
  level: 'Eco Explorer',
  progress: 0.65, // 65% to next level
  badges: [
    { id: 1, name: 'First Swap', icon: <Trophy size={24} color="#6db77a" />, desc: 'Completed first swap!' },
    { id: 2, name: '10 Listings', icon: <Star size={24} color="#b8e986" />, desc: 'Listed 10 items!' },
    { id: 3, name: 'Eco Hero', icon: <Award size={24} color="#13bcbc" />, desc: 'Saved 10kg CO2!' },
  ],
};
const leaderboard = [
  { id: 1, name: 'Alex Lee', points: 200, avatar: 'https://ui-avatars.com/api/?name=Alex+Lee&background=6db77a&color=fff' },
  { id: 2, name: 'Priya Patel', points: 180, avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=13bcbc&color=fff' },
  { id: 3, name: 'Jane Doe', points: 120, avatar: user.avatar },
];

const listings = [
  { id: 1, name: "Professional Blazer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format" },
  { id: 2, name: "Blue Jeans", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&auto=format" },
  { id: 3, name: "Green Top", img: "https://via.placeholder.com/100x120?text=Green+Top" },
  { id: 4, name: "Yellow Skirt", img: "https://via.placeholder.com/100x120?text=Yellow+Skirt" },
];

const purchases = [
  { id: 1, name: "Black Jacket", img: "https://via.placeholder.com/100x120?text=Black+Jacket" },
  { id: 2, name: "White Shirt", img: "https://via.placeholder.com/100x120?text=White+Shirt" },
  { id: 3, name: "Purple Scarf", img: "https://via.placeholder.com/100x120?text=Purple+Scarf" },
  { id: 4, name: "Orange Shorts", img: "https://via.placeholder.com/100x120?text=Orange+Shorts" },
];

export default function UserDashboard() {
  return (
    <div style={{ background: "var(--bg-main)", minHeight: "100vh", color: "var(--text-primary)", fontFamily: "'Montserrat', 'Segoe UI', sans-serif", padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        :root {
          --primary1: ${PALETTE.green1};
          --primary2: ${PALETTE.green2};
          --primary3: ${PALETTE.green3};
          --primary4: ${PALETTE.green4};
          --accent1: ${PALETTE.teal1};
          --accent2: ${PALETTE.teal2};
          --accent3: ${PALETTE.teal3};
          --accent4: ${PALETTE.yellow1};
          --accent5: ${PALETTE.yellow2};
          --accent6: ${PALETTE.yellow3};
          --primary-gradient: linear-gradient(90deg, var(--primary1), var(--primary2), var(--primary3));
          --accent-gradient: linear-gradient(90deg, var(--accent4), var(--accent5), var(--accent6));
          --bg-main: var(--primary4);
          --bg-card: #fff;
          --border-primary: var(--primary3);
          --text-primary: #222;
          --text-secondary: var(--primary1);
          --radius-large: 18px;
          --radius-medium: 12px;
          --radius-small: 6px;
          --shadow-large: 0 8px 32px rgba(51,142,119,0.12);
        }
        .dashboard-header {
          background: var(--primary-gradient);
          color: #fff;
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          padding: 1.5rem 2rem 0.5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .profile-section {
          background: var(--bg-card);
          margin: 1rem 2rem;
          border-radius: var(--radius-large);
          padding: 2rem;
          display: flex;
          gap: 32px;
          align-items: center;
          box-shadow: var(--shadow-large);
        }
        .profile-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid var(--primary2);
          object-fit: cover;
        }
        .profile-stats strong {
          color: var(--primary1);
        }
        .dashboard-btn {
          background: var(--primary-gradient);
          color: #fff;
          border: none;
          border-radius: var(--radius-medium);
          padding: 0.7rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
          margin-bottom: 8px;
          box-shadow: var(--shadow-large);
          transition: background 0.3s;
        }
        .dashboard-btn:hover {
          background: var(--accent-gradient);
          color: #222;
        }
        .section-title {
          color: var(--primary1);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .item-card {
          background: var(--bg-card);
          border-radius: var(--radius-medium);
          padding: 16px;
          width: 140px;
          text-align: center;
          box-shadow: var(--shadow-large);
          border: 1.5px solid var(--border-primary);
        }
        .item-card img {
          width: 100px;
          height: 120px;
          border-radius: var(--radius-small);
          object-fit: cover;
          margin-bottom: 8px;
        }
        .item-card .item-name {
          color: var(--primary1);
          font-weight: 500;
        }
        .hero-banner {
          display: flex;
          align-items: center;
          gap: 32px;
          background: var(--primary-gradient);
          color: #fff;
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          padding: 2.5rem 2rem 2rem 2rem;
          margin: 2rem 2rem 1.5rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .hero-avatar {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 4px solid #fff;
          object-fit: cover;
          box-shadow: 0 4px 24px rgba(51,142,119,0.18);
        }
        .hero-info {
          flex: 1;
        }
        .hero-name {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          letter-spacing: -1px;
        }
        .hero-level {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--accent1);
          margin-bottom: 0.5rem;
        }
        .progress-ring {
          width: 80px;
          height: 80px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .progress-ring svg {
          transform: rotate(-90deg);
        }
        .progress-ring-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary1);
        }
        .stats-row {
          display: flex;
          gap: 32px;
          margin: 0 2rem 1.5rem 2rem;
          justify-content: space-between;
        }
        .stat-card {
          flex: 1;
          background: var(--bg-card);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          padding: 1.2rem 1rem;
          text-align: center;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--primary1);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .stat-card .stat-label {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          margin-top: 0.2rem;
        }
        .badge-carousel {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          margin: 0 2rem 2rem 2rem;
          padding-bottom: 8px;
        }
        .badge-card {
          min-width: 120px;
          background: var(--bg-card);
          border-radius: var(--radius-medium);
          box-shadow: var(--shadow-large);
          padding: 1rem 0.7rem;
          text-align: center;
          color: var(--primary1);
          font-weight: 600;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .badge-card .badge-icon {
          margin-bottom: 0.5rem;
        }
        .leaderboard-widget {
          background: var(--bg-card);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          margin: 0 2rem 2rem 2rem;
          padding: 1.2rem 1rem;
          max-width: 340px;
        }
        .leaderboard-title {
          font-weight: 700;
          color: var(--primary1);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        .leaderboard-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .leaderboard-user {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }
        .leaderboard-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--primary2);
        }
        .leaderboard-points {
          margin-left: auto;
          color: var(--primary1);
          font-weight: 700;
        }
      `}</style>
      {/* Header */}
      <div className="dashboard-header">
        <h2 style={{ fontWeight: 400, fontSize: 24 ,textAlign:"center"}}>User Dashboard</h2>
 
      </div>
      {/* Hero Banner */}
      <div className="hero-banner">
        <img src={user.avatar} alt="avatar" className="hero-avatar" />
        <div className="hero-info">
          <div className="hero-name">Welcome, {user.name}!</div>
          <div className="hero-level">Level: {user.level}</div>
          <div style={{ color: '#fff', fontWeight: 500 }}>{user.email}</div>
        </div>
        <div className="progress-ring">
          <svg width="80" height="80">
            <circle cx="40" cy="40" r="34" stroke="#eaf3c2" strokeWidth="8" fill="none" />
            <circle cx="40" cy="40" r="34" stroke="#338e77" strokeWidth="8" fill="none" strokeDasharray={2 * Math.PI * 34} strokeDashoffset={(1 - user.progress) * 2 * Math.PI * 34} style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.68,-0.55,.27,1.55)' }} />
          </svg>
          <div className="progress-ring-text">{Math.round(user.progress * 100)}%</div>
        </div>
      </div>
      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <TrendingUp size={28} color="#338e77" />
          {user.points} <span className="stat-label">Points</span>
        </div>
        <div className="stat-card">
          <Trophy size={28} color="#6db77a" />
          8 <span className="stat-label">Swaps</span>
        </div>
        <div className="stat-card">
          <Star size={28} color="#b8e986" />
          5 <span className="stat-label">Listed</span>
        </div>
        <div className="stat-card">
          <Award size={28} color="#13bcbc" />
          3 <span className="stat-label">Badges</span>
        </div>
      </div>
      {/* Badge Carousel */}
      <div className="badge-carousel">
        {user.badges.map(badge => (
          <div key={badge.id} className="badge-card">
            <div className="badge-icon">{badge.icon}</div>
            <div>{badge.name}</div>
            <div style={{ fontWeight: 400, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{badge.desc}</div>
          </div>
        ))}
      </div>
      {/* Leaderboard Widget */}
      <div className="leaderboard-widget">
        <div className="leaderboard-title">Top Swappers This Month</div>
        <div className="leaderboard-list">
          {leaderboard.map(user => (
            <div key={user.id} className="leaderboard-user">
              <img src={user.avatar} alt={user.name} className="leaderboard-avatar" />
              <span>{user.name}</span>
              <span className="leaderboard-points">{user.points} pts</span>
            </div>
          ))}
        </div>
      </div>
      {/* Listings */}
      <div style={{ margin: "2rem 2rem 0 2rem" }}>
        <h4 className="section-title">My Listings</h4>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {listings.map(item => (
            <div key={item.id} className="item-card">
              <img src={item.img} alt={item.name} />
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Purchases */}
      <div style={{ margin: "2rem 2rem 2rem 2rem" }}>
        <h4 className="section-title">My Purchases</h4>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {purchases.map(item => (
            <div key={item.id} className="item-card">
              <img src={item.img} alt={item.name} />
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
