import json
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd

from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from sklearn.preprocessing import StandardScaler
from src.pipeline.predict_pipeline import CustomData, PredictPipeline

app = Flask(__name__)
CORS(app)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/predict', methods=['GET', 'POST'])
def predict_datapoint():
    if request.method == 'GET':
        return render_template('predict.html')
    else:
        data = CustomData(
            gender=request.form.get('gender'),
            race_ethnicity=request.form.get('ethnicity'),
            parental_level_of_education=request.form.get('parental_level_of_education'),
            lunch=request.form.get('lunch'),
            test_preparation_course=request.form.get('test_preparation_course'),
            reading_score=float(request.form.get('reading_score')),
            writing_score=float(request.form.get('writing_score'))
        )

        pred_df = data.get_data_as_data_frame()
        predict_pipeline = PredictPipeline()
        results = predict_pipeline.predict(pred_df)
        return render_template('predict.html', results=round(results[0], 2))

@app.route('/data-analytics')
def data_analytics():
    # Load data
    df = pd.read_csv('artifacts/data.csv')
    
    # Calculate stats
    total_students = len(df)
    avg_math = round(df['math_score'].mean(), 2)
    avg_rw = round((df['reading_score'].mean() + df['writing_score'].mean()) / 2, 2)
    stats = {
        'total': total_students,
        'avg_math': avg_math,
        'avg_rw': avg_rw
    }

    # Chart 1: Gender
    gender_counts = df['gender'].value_counts()
    gender_data = {
        'labels': gender_counts.index.tolist(),
        'values': gender_counts.values.tolist()
    }

    # Chart 2: Average Math Score by Ethnicity
    ethnicity_group = df.groupby('race_ethnicity')['math_score'].mean().round(2).sort_values()
    ethnicity_data = {
        'labels': ethnicity_group.index.tolist(),
        'values': ethnicity_group.values.tolist()
    }

    chart_data = {
        'gender': gender_data,
        'ethnicity': ethnicity_data
    }

    return render_template('data_analytics.html', stats=stats, chart_data=json.dumps(chart_data))

@app.route('/model-analytics')
def model_analytics():
    try:
        # Load test data to evaluate the model
        test_df = pd.read_csv('artifacts/test.csv')
        y_true = test_df['math_score']
        X_test = test_df.drop(columns=['math_score'])

        # Predict
        predict_pipeline = PredictPipeline()
        y_pred = predict_pipeline.predict(X_test)

        # Calculate metrics
        r2 = round(r2_score(y_true, y_pred), 4)
        rmse = round(np.sqrt(mean_squared_error(y_true, y_pred)), 4)
        mae = round(mean_absolute_error(y_true, y_pred), 4)

        metrics = {
            'r2': r2,
            'rmse': rmse,
            'mae': mae
        }
        return render_template('model_analytics.html', metrics=metrics)
    except Exception as e:
        return render_template('model_analytics.html', error=str(e))

@app.route('/api/predict', methods=['POST'])
def api_predict():
    try:
        data = request.json
        custom_data = CustomData(
            gender=data.get('gender'),
            race_ethnicity=data.get('ethnicity'),
            parental_level_of_education=data.get('parental_level_of_education'),
            lunch=data.get('lunch'),
            test_preparation_course=data.get('test_preparation_course'),
            reading_score=float(data.get('reading_score', 0)),
            writing_score=float(data.get('writing_score', 0))
        )
        pred_df = custom_data.get_data_as_data_frame()
        predict_pipeline = PredictPipeline()
        results = predict_pipeline.predict(pred_df)
        return jsonify({'prediction': round(results[0], 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/data-analytics', methods=['GET'])
def api_data_analytics():
    try:
        df = pd.read_csv('artifacts/data.csv')
        total_students = len(df)
        avg_math = round(df['math_score'].mean(), 2)
        avg_rw = round((df['reading_score'].mean() + df['writing_score'].mean()) / 2, 2)
        
        gender_counts = df['gender'].value_counts()
        ethnicity_group = df.groupby('race_ethnicity')['math_score'].mean().round(2).sort_values()
        
        return jsonify({
            'stats': {
                'total': total_students,
                'avg_math': avg_math,
                'avg_rw': avg_rw
            },
            'chart_data': {
                'gender': {
                    'labels': gender_counts.index.tolist(),
                    'values': gender_counts.values.tolist()
                },
                'ethnicity': {
                    'labels': ethnicity_group.index.tolist(),
                    'values': ethnicity_group.values.tolist()
                }
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/model-analytics', methods=['GET'])
def api_model_analytics():
    try:
        test_df = pd.read_csv('artifacts/test.csv')
        y_true = test_df['math_score']
        X_test = test_df.drop(columns=['math_score'])
        
        predict_pipeline = PredictPipeline()
        y_pred = predict_pipeline.predict(X_test)
        
        return jsonify({
            'metrics': {
                'r2': round(r2_score(y_true, y_pred), 4),
                'rmse': round(np.sqrt(mean_squared_error(y_true, y_pred)), 4),
                'mae': round(mean_absolute_error(y_true, y_pred), 4)
            }
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)