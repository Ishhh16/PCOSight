# PCOSight 🌸  
PCOSight is a web app that predicts the likelihood of **Polycystic Ovary Syndrome (PCOS)** based on medical and lifestyle data, while also explaining which factors influence the prediction.  

## 🚀 Tech Stack  
- **Frontend:** React + Vite + TypeScript  
- **Backend:** FastAPI (Python)  
- **ML Explainability:** LIME (Local Interpretable Model-Agnostic Explanations)  
- **Charting:** Chart.js for visualization  

## 🧠 How It Works  
1. **Frontend:** A React + Vite interface collects user input through an interactive form and displays predictions in a clean, responsive UI.  
2. **Backend:** A FastAPI server processes the data, runs the ML model, and returns predictions with explanation scores.  
3. **Model Explanation:** LIME identifies the top 5 contributing factors, showing whether each increases or decreases the PCOS likelihood.  

## 📊 Features  
- PCOS prediction using a trained ML model  
- Feature importance chart with positive/negative impact coloring  
- Clean UI with responsive design  
- Interactive tooltips explaining each feature contribution  

## 🛠️ Installation & Setup  

### Frontend  
```bash
cd frontendPcos
npm install
npm run dev
