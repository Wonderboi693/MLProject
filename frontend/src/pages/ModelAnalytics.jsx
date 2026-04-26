import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ModelAnalytics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get('/model-analytics');
        setMetrics(response.data.metrics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Evaluating model on test dataset...</div>;
  if (error) return <div className="container" style={{ color: '#ef4444' }}>Error: {error}</div>;
  if (!metrics) return null;

  return (
    <div className="container animate-fade-in">
      <h1 style={{ textAlign: 'center' }}>Model Performance Analytics</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
        Evaluation of the current CatBoost pipeline on the unseen test dataset.
      </p>

      <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          
          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>R² Score</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              {metrics.r2.toFixed(4)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Variance explained</div>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>RMSE</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
              {metrics.rmse.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Root Mean Squared Error</div>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>MAE</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>
              {metrics.mae.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Mean Absolute Error</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModelAnalytics;
