# train_compare_models.py
import warnings
warnings.filterwarnings("ignore")  # ignore all warnings

import os
import pickle
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.metrics import f1_score
from scipy.sparse import csr_matrix

import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout

# ----------------------------- PATHS -----------------------------
base_path = r"C:\ai_project\backend"
data_path = os.path.join(base_path, "outputs", "cleaned_dataset.csv")
tfidf_path = os.path.join(base_path, "outputs", "tfidf_vectorizer.pkl")
ann_model_path = os.path.join(base_path, "outputs", "ann_model.keras")
lr_model_path = os.path.join(base_path, "outputs", "lr_model.pkl")
nb_model_path = os.path.join(base_path, "outputs", "nb_model.pkl")
svm_model_path = os.path.join(base_path, "outputs", "svm_model.pkl")

# ----------------------------- LOAD DATA -----------------------------
df = pd.read_csv(data_path)
print(f"Dataset loaded: {df.shape}")

# Fill missing text
df['clean_text'] = df['clean_text'].fillna('')

# ----------------------------- LABELS -----------------------------
label_cols = [
    'admiration','amusement','anger','annoyance','approval','caring',
    'confusion','curiosity','desire','disappointment','disapproval',
    'disgust','embarrassment','excitement','fear','gratitude','joy',
    'love','nervousness','optimism','realization','relief','remorse',
    'sadness','surprise','neutral','unhappy'
]

# If 'unhappy' not in CSV, add it as zeros
if 'unhappy' not in df.columns:
    df['unhappy'] = 0

# ----------------------------- LOAD TF-IDF -----------------------------
with open(tfidf_path, 'rb') as f:
    tfidf = pickle.load(f)

X = tfidf.transform(df['clean_text'])
print(f"TF-IDF shape: {X.shape}")

# ----------------------------- TARGET -----------------------------
y = df[label_cols].apply(pd.to_numeric, errors='coerce').fillna(0).astype(int)

# ----------------------------- SPLIT -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ----------------------------- TRAIN ANN -----------------------------
print("\nTraining ANN...")
ann = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.2),
    Dense(64, activation='relu'),
    Dense(y_train.shape[1], activation='sigmoid')  # multilabel
])
ann.compile(loss='binary_crossentropy', optimizer='adam')
ann.fit(X_train.toarray(), y_train.values, epochs=5, batch_size=256,
        validation_split=0.1, verbose=1)

# Predict
y_pred_ann = (ann.predict(X_test.toarray()) > 0.5).astype(int)
ann_f1 = f1_score(y_test, y_pred_ann, average='micro')
print(f"ANN Micro-F1: {ann_f1:.4f}")

ann.save(ann_model_path)
print("ANN model saved.")

# ----------------------------- TRAIN LOGISTIC REGRESSION -----------------------------
print("\nTraining Logistic Regression...")
lr = OneVsRestClassifier(LogisticRegression(solver='liblinear'))
lr.fit(X_train, y_train)
y_pred_lr = lr.predict(X_test)
lr_f1 = f1_score(y_test, y_pred_lr, average='micro')
print(f"Logistic Regression Micro-F1: {lr_f1:.4f}")

with open(lr_model_path, 'wb') as f:
    pickle.dump(lr, f)

# ----------------------------- TRAIN NAIVE BAYES -----------------------------
print("\nTraining Naive Bayes...")
nb = OneVsRestClassifier(MultinomialNB())
nb.fit(X_train, y_train)
y_pred_nb = nb.predict(X_test)
nb_f1 = f1_score(y_test, y_pred_nb, average='micro')
print(f"Naive Bayes Micro-F1: {nb_f1:.4f}")

with open(nb_model_path, 'wb') as f:
    pickle.dump(nb, f)

# ----------------------------- TRAIN SVM -----------------------------
print("\nTraining SVM...")
svm = OneVsRestClassifier(LinearSVC())
svm.fit(X_train, y_train)
y_pred_svm = svm.predict(X_test)
svm_f1 = f1_score(y_test, y_pred_svm, average='micro')
print(f"SVM Micro-F1: {svm_f1:.4f}")

with open(svm_model_path, 'wb') as f:
    pickle.dump(svm, f)

# ----------------------------- FINAL RESULTS -----------------------------
print("\n====== FINAL RESULTS ======")
print(f"ANN  Micro-F1: {ann_f1:.4f}")
print(f"LR   Micro-F1: {lr_f1:.4f}")
print(f"NB   Micro-F1: {nb_f1:.4f}")
print(f"SVM  Micro-F1: {svm_f1:.4f}")
print("===========================")
