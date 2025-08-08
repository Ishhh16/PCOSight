from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
import joblib
import shap
from fastapi.middleware.cors import CORSMiddleware
import lime
import lime.lime_tabular

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model, scaler, and selected feature names
model = joblib.load("pcos_model1.pkl")
scaler = joblib.load("scalerF.pkl")
selected_features = joblib.load("selected_featuresF.pkl")


# Define input schema matching selected features
class PCOSInput(BaseModel):
    Age_yrs: float
    Weight_Kg: float
    Hb_g_dl: float
    Cycle_R_I: int
    Cycle_length_days: float
    I_beta_HCG_mIU_mL: float
    AMH_ng_mL: float
    Weight_gain_YN: int
    hair_growth_YN: int
    Skin_darkening_YN: int
    Pimples_YN: int
    Fast_food_YN: int
    Follicle_No_L: float
    Follicle_No_R: float
    Endometrium_mm: float

@app.get("/")
def root():
    return {"message": "🔥 PCOS Prediction API is live!"}

@app.post("/predict")
def predict(data: PCOSInput):
    try:
        input_data = {
            'Age (yrs)': data.Age_yrs,
            'Weight (Kg)': data.Weight_Kg,
            'Hb(g/dl)': data.Hb_g_dl,
            'Cycle(R/I)': data.Cycle_R_I,
            'Cycle length(days)': data.Cycle_length_days,
            'I   beta-HCG(mIU/mL)': data.I_beta_HCG_mIU_mL,
            'AMH(ng/mL)': data.AMH_ng_mL,
            'Weight gain(Y/N)': data.Weight_gain_YN,
            'hair growth(Y/N)': data.hair_growth_YN,
            'Skin darkening (Y/N)': data.Skin_darkening_YN,
            'Pimples(Y/N)': data.Pimples_YN,
            'Fast food (Y/N)': data.Fast_food_YN,
            'Follicle No. (L)': data.Follicle_No_L,
            'Follicle No. (R)': data.Follicle_No_R,
            'Endometrium (mm)': data.Endometrium_mm
        }

        ordered_input = [input_data[feat] for feat in selected_features]
        scaled_input = scaler.transform([ordered_input])

        # Prediction
        prediction = model.predict(scaled_input)[0]

        # Get probability scores
        probs = model.predict_proba(scaled_input)[0]  # ✅ use scaled_input here

        # Pick the probability of the predicted class
        pred_class = int(np.argmax(probs))
        confidence = probs[pred_class]

        # Final result text
        result = "PCOS Detected 🧬" if prediction == 1 else "No PCOS 🙌"

        return {
        "prediction": int(prediction),
        "result": result,
        "confidence": round(float(confidence) * 100, 2)  # percentage
        }

    except KeyError as e:
        raise HTTPException(status_code=422, detail=f"Missing feature: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


X_train = np.load("X_train_scaled.npy")  # ← saved this in colab
lime_explainer = lime.lime_tabular.LimeTabularExplainer(
    X_train,
    feature_names=selected_features,
    class_names=["No PCOS", "PCOS"],
    mode="classification"
)


@app.post("/explain")
def explain(data: PCOSInput):
    try:
        input_data = {
            'Age (yrs)': data.Age_yrs,
            'Weight (Kg)': data.Weight_Kg,
            'Hb(g/dl)': data.Hb_g_dl,
            'Cycle(R/I)': data.Cycle_R_I,
            'Cycle length(days)': data.Cycle_length_days,
            'I   beta-HCG(mIU/mL)': data.I_beta_HCG_mIU_mL,
            'AMH(ng/mL)': data.AMH_ng_mL,
            'Weight gain(Y/N)': data.Weight_gain_YN,
            'hair growth(Y/N)': data.hair_growth_YN,
            'Skin darkening (Y/N)': data.Skin_darkening_YN,
            'Pimples(Y/N)': data.Pimples_YN,
            'Fast food (Y/N)': data.Fast_food_YN,
            'Follicle No. (L)': data.Follicle_No_L,
            'Follicle No. (R)': data.Follicle_No_R,
            'Endometrium (mm)': data.Endometrium_mm
        }

        ordered_input = [input_data[feat] for feat in selected_features]
        scaled_input = scaler.transform([ordered_input])

        # LIME explanation (for the single instance)
        explanation = lime_explainer.explain_instance(
            scaled_input[0],
            model.predict_proba,
            num_features=5
        )

        top_features = []
        for feat, val in explanation.as_list():
            top_features.append({
                "feature": feat,
                "contribution": round(float(val), 4)
            })

        return {"explanation": top_features}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LIME explainability failed: {str(e)}")