import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

const DataAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/data-analytics');
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading analytics...</div>;
  if (error) return <div className="container" style={{ color: '#ef4444' }}>Error: {error}</div>;
  if (!data) return null;

  const { stats, chart_data } = data;
  
  // Format for Recharts
  const pieData = chart_data.gender.labels.map((label, idx) => ({
    name: label,
    value: chart_data.gender.values[idx]
  }));

  const barData = chart_data.ethnicity.labels.map((label, idx) => ({
    name: label,
    math_score: chart_data.ethnicity.values[idx]
  }));

  return (
    <div className="container animate-fade-in">
      <h1>Data Analytics</h1>
      
      <div className="grid-cols-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)' }}>Total Students</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stats.total}</div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)' }}>Average Math Score</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{stats.avg_math}</div>
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)' }}>Average Reading/Writing</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{stats.avg_rw}</div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Gender Distribution</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Avg Math Score by Ethnicity</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" domain={['auto', 'auto']} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="math_score" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalytics;
