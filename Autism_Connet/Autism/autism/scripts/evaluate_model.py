# evaluate_model.py
import warnings
warnings.filterwarnings("ignore")  # ignore all warnings

import pandas as pd
import pickle
from sklearn.metrics import classification_report, f1_score
import os

# -----------------------------
# Paths
# -----------------------------
base_path = r"C:\ai_project\backend"
data_path = os.path.join(base_path, "outputs", "cleaned_dataset.csv")
tfidf_path = os.path.join(base_path, "outputs", "tfidf_vectorizer.pkl")
model_path = os.path.join(base_path, "outputs", "multi_label_model.pkl")

# -----------------------------
# 1️⃣ Load dataset
# -----------------------------
df = pd.read_csv(data_path)
print("Dataset loaded:", df.shape)

# -----------------------------
# 2️⃣ Handle missing text
# -----------------------------
df['clean_text'] = df['clean_text'].fillna('')

# -----------------------------
# 3️⃣ Load TF-IDF vectorizer
# -----------------------------
with open(tfidf_path, 'rb') as f:
    tfidf = pickle.load(f)
print("TF-IDF vectorizer loaded.")

# -----------------------------
# 4️⃣ Transform text to features
# -----------------------------
X_text = df['clean_text']
X = tfidf.transform(X_text)
print("TF-IDF shape:", X.shape)

# -----------------------------
# 5️⃣ Load trained model
# -----------------------------
with open(model_path, 'rb') as f:
    clf = pickle.load(f)
print("Trained model loaded.")

# -----------------------------
# 6️⃣ Define all labels (including 'unhappy')
# -----------------------------
label_cols = [
    'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring',
    'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval',
    'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'joy',
    'love', 'nervousness', 'optimism', 'realization', 'relief', 'remorse',
    'sadness', 'surprise', 'neutral'
]

# Ensure all columns exist in df
for col in label_cols:
    if col not in df.columns:
        df[col] = 0  # add missing label as zeros

# Convert labels to numeric
y_true = df[label_cols].apply(pd.to_numeric, errors='coerce').fillna(0).astype(int)
print("Labels shape:", y_true.shape)
print("Sample labels:\n", y_true.head())

# -----------------------------
# 7️⃣ Predict using model
# -----------------------------
y_pred = clf.predict(X)

# Adjust y_pred shape if needed
if y_pred.shape[1] != y_true.shape[1]:
    if y_pred.shape[1] < y_true.shape[1]:
        import numpy as np
        # Add missing columns as zeros
        zeros = np.zeros((y_pred.shape[0], y_true.shape[1] - y_pred.shape[1]))
        y_pred = np.hstack([y_pred, zeros])
    else:
        y_pred = y_pred[:, :y_true.shape[1]]

# -----------------------------
# 8️⃣ Evaluate
# -----------------------------
print("\n===== CLASSIFICATION REPORT =====")
report = classification_report(
    y_true,
    y_pred,
    target_names=label_cols,
    zero_division=0
)
print(report)

micro_f1 = f1_score(y_true, y_pred, average='micro')
print(f"Micro-F1 Score: {micro_f1:.4f}")
