import React from "react";
import { Users, ShoppingBag, ListChecks, Award } from 'lucide-react';

// Color palette from the image
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

const users = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane@email.com",
    avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=13bcbc&color=fff",
    details: "Active | 120 pts | 8 swaps",
  },
  {
    id: 2,
    name: "John Smith",
    email: "john@email.com",
    avatar: "https://ui-avatars.com/api/?name=John+Smith&background=4be0db&color=fff",
    details: "Active | 80 pts | 5 swaps",
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya@email.com",
    avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=b2f1e5&color=222",
    details: "Inactive | 40 pts | 2 swaps",
  },
  {
    id: 4,
    name: "Alex Lee",
    email: "alex@email.com",
    avatar: "https://ui-avatars.com/api/?name=Alex+Lee&background=fff0f4&color=13bcbc",
    details: "Active | 200 pts | 12 swaps",
  },
];

const adminStats = [
  { id: 1, label: 'Users', value: 124, icon: <Users size={28} color="#338e77" /> },
  { id: 2, label: 'Listings', value: 58, icon: <ListChecks size={28} color="#6db77a" /> },
  { id: 3, label: 'Orders', value: 32, icon: <ShoppingBag size={28} color="#b8e986" /> },
  { id: 4, label: 'Badges Awarded', value: 17, icon: <Award size={28} color="#13bcbc" /> },
];

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'Montserrat', 'Segoe UI', sans-serif" }}>
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
        .admin-hero {
          background: var(--primary-gradient);
          color: #fff;
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          padding: 2.5rem 2rem 2rem 2rem;
          text-align: center;
          margin: 2rem 2rem 1.5rem 2rem;
          font-family: 'Montserrat', 'Segoe UI', sans-serif;
        }
        .admin-hero-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
        }
        .admin-hero-desc {
          font-size: 1.1rem;
          color: var(--accent1);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        .admin-stats-row {
          display: flex;
          gap: 32px;
          margin: 0 2rem 1.5rem 2rem;
          justify-content: space-between;
        }
        .admin-stat-card {
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
        .admin-stat-card .stat-label {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          margin-top: 0.2rem;
        }
        .admin-tabs {
          display: flex;
          gap: 24px;
          justify-content: center;
          margin: 1.5rem 0;
        }
        .admin-tab-btn {
          background: var(--primary-gradient);
          color: #fff;
          border: none;
          border-radius: var(--radius-medium);
          padding: 0.8rem 2.2rem;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          box-shadow: var(--shadow-large);
          transition: background 0.3s;
        }
        .admin-tab-btn:hover, .admin-tab-btn.active {
          background: var(--accent-gradient);
          color: #222;
        }
        .admin-card {
          max-width: 900px;
          margin: 0 auto;
          background: var(--bg-card);
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          padding: 2rem 2rem 1rem 2rem;
          border: 2px solid var(--border-primary);
        }
        .admin-section-title {
          color: var(--primary1);
          font-weight: 600;
          font-size: 20px;
          margin-bottom: 24px;
          text-align: left;
        }
        .user-row {
          display: flex;
          align-items: center;
          background: var(--bg-main);
          border-radius: var(--radius-medium);
          padding: 18px;
          border: 1.5px solid var(--border-primary);
          box-shadow: var(--shadow-large);
          margin-bottom: 20px;
        }
        .user-avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          border: 2.5px solid var(--primary1);
          object-fit: cover;
          margin-right: 28px;
        }
        .user-details {
          flex: 1;
        }
        .user-details .user-name {
          font-weight: 600;
          font-size: 18px;
          color: var(--primary1);
        }
        .user-details .user-email {
          color: var(--accent1);
          font-size: 15px;
        }
        .user-details .user-meta {
          color: var(--text-primary);
          font-size: 15px;
          margin-top: 4px;
        }
        .user-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .user-action-btn {
          background: var(--accent5);
          color: #222;
          border: none;
          border-radius: var(--radius-medium);
          padding: 0.5rem 1.2rem;
          font-weight: 500;
          font-size: 15px;
          cursor: pointer;
          box-shadow: var(--shadow-large);
          transition: background 0.3s;
        }
        .user-action-btn:hover {
          background: var(--accent2);
          color: #fff;
        }
        .admin-gamify {
          background: var(--accent-gradient);
          color: #222;
          border-radius: var(--radius-large);
          box-shadow: var(--shadow-large);
          margin: 2rem 2rem 2rem 2rem;
          padding: 1.2rem 1rem;
          font-weight: 600;
          text-align: center;
          font-size: 1.1rem;
        }
      `}</style>
      {/* Hero Banner */}
      <div className="admin-hero">
        <div className="admin-hero-title">Admin Panel</div>
        <div className="admin-hero-desc">Manage users, listings, and orders. Award badges for top contributors!</div>
      </div>
      {/* Stats Row */}
      <div className="admin-stats-row">
        {adminStats.map(stat => (
          <div key={stat.id} className="admin-stat-card">
            {stat.icon}
            {stat.value} <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div className="admin-tabs">
        <button className="admin-tab-btn active">Manage User</button>
        <button className="admin-tab-btn">Manage Orders</button>
        <button className="admin-tab-btn">Manage Listings</button>
      </div>
      {/* Gamified Admin Action */}
      <div className="admin-gamify">
        Resolve 5 reports this week to earn the <Award size={20} color="#338e77" style={{ verticalAlign: 'middle' }} /> <b>Super Admin</b> badge!
      </div>
      {/* Manage Users Section */}
      <div className="admin-card">
        <h3 className="admin-section-title">Manage Users</h3>
        <div>
          {users.map(user => (
            <div key={user.id} className="user-row">
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
                <div className="user-meta">{user.details}</div>
              </div>
              <div className="user-actions">
                <button className="user-action-btn">Actions 1</button>
                <button className="user-action-btn">Action 2</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
