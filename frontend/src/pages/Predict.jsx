import React, { useState } from 'react';
import api from '../services/api';

const Predict = () => {
  const [formData, setFormData] = useState({
    gender: 'male',
    ethnicity: 'group A',
    parental_level_of_education: "bachelor's degree",
    lunch: 'standard',
    test_preparation_course: 'none',
    reading_score: '',
    writing_score: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/predict', formData);
      setPrediction(response.data.prediction);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to make prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <h1 style={{ textAlign: 'center' }}>Predict Math Score</h1>
      
      <div className="glass-panel" style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input-field" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Race / Ethnicity</label>
              <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="input-field" required>
                <option value="group A">Group A</option>
                <option value="group B">Group B</option>
                <option value="group C">Group C</option>
                <option value="group D">Group D</option>
                <option value="group E">Group E</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Parental Level of Education</label>
            <select name="parental_level_of_education" value={formData.parental_level_of_education} onChange={handleChange} className="input-field" required>
              <option value="some high school">Some High School</option>
              <option value="high school">High School</option>
              <option value="some college">Some College</option>
              <option value="associate's degree">Associate's Degree</option>
              <option value="bachelor's degree">Bachelor's Degree</option>
              <option value="master's degree">Master's Degree</option>
            </select>
          </div>

          <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Lunch</label>
              <select name="lunch" value={formData.lunch} onChange={handleChange} className="input-field" required>
                <option value="standard">Standard</option>
                <option value="free/reduced">Free / Reduced</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Test Preparation Course</label>
              <select name="test_preparation_course" value={formData.test_preparation_course} onChange={handleChange} className="input-field" required>
                <option value="none">None</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid-cols-2" style={{ gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Reading Score (0-100)</label>
              <input type="number" name="reading_score" value={formData.reading_score} onChange={handleChange} className="input-field" min="0" max="100" required placeholder="e.g. 75" />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Writing Score (0-100)</label>
              <input type="number" name="writing_score" value={formData.writing_score} onChange={handleChange} className="input-field" min="0" max="100" required placeholder="e.g. 80" />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? 'Predicting...' : 'Predict Math Score'}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {error}
          </div>
        )}

        {prediction !== null && (
          <div style={{ marginTop: '2rem', padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Predicted Math Score</h3>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>{prediction}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
