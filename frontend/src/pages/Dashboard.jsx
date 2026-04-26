import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container animate-fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Student Performance Predictor</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: '1.6' }}>
        Leverage machine learning to predict student math scores based on their background and test preparation. Explore data insights and model performance in real-time.
      </p>

      <div className="grid-cols-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Link to="/predict" className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-5px)' } }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '50%', color: 'var(--primary)' }}>
            <Activity size={32} />
          </div>
          <h3>Make a Prediction</h3>
          <p style={{ color: 'var(--text-muted)' }}>Input student details to get an instant math score prediction.</p>
        </Link>

        <Link to="/data-analytics" className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '1rem', borderRadius: '50%', color: 'var(--secondary)' }}>
            <BarChart2 size={32} />
          </div>
          <h3>Data Analytics</h3>
          <p style={{ color: 'var(--text-muted)' }}>Visualize demographic distributions and performance trends.</p>
        </Link>

        <Link to="/model-analytics" className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', gridColumn: '1 / -1' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '50%', color: '#10b981' }}>
            <TrendingUp size={32} />
          </div>
          <h3>Model Analytics</h3>
          <p style={{ color: 'var(--text-muted)' }}>Review the machine learning model's accuracy, RMSE, and MAE metrics.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
