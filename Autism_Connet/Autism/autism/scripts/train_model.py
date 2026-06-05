import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.multiclass import OneVsRestClassifier

# TensorFlow for ANN
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

# -----------------------------
# Paths
# -----------------------------
base_path = r"C:\ai_project\backend"
data_path = os.path.join(base_path, "outputs", "cleaned_dataset.csv")
tfidf_path = os.path.join(base_path, "outputs", "tfidf_vectorizer.pkl")
best_model_path = os.path.join(base_path, "outputs", "best_model.pkl")

# -----------------------------
# 1️⃣ Load dataset
# -----------------------------
df = pd.read_csv(data_path)
df['clean_text'] = df['clean_text'].fillna('')
label_cols = df.columns[9:]  # adjust if necessary
y = df[label_cols].apply(pd.to_numeric, errors='coerce').fillna(0).astype(int)

# -----------------------------
# 2️⃣ Handle rare labels
# -----------------------------
label_counts = y.sum()
rare_labels = label_counts[label_counts < 500].index
if len(rare_labels) > 0:
    y = y.drop(columns=rare_labels)
    label_cols = y.columns
print("Labels shape after removing rare labels:", y.shape)

# -----------------------------
# 3️⃣ Load TF-IDF vectorizer
# -----------------------------
with open(tfidf_path, 'rb') as f:
    tfidf = pickle.load(f)

X = tfidf.transform(df['clean_text']).toarray()
print("TF-IDF feature matrix shape:", X.shape)

# -----------------------------
# 4️⃣ Train-Test split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# -----------------------------
# 5️⃣ ANN - CPU friendly
# -----------------------------
def train_ann(X_train, y_train, X_test, y_test):
    input_dim = X_train.shape[1]
    output_dim = y_train.shape[1]

    model = Sequential([
        Dense(64, input_dim=input_dim, activation='relu'),  # smaller layer for speed
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(output_dim, activation='sigmoid')  # multi-label
    ])

    model.compile(
        loss='binary_crossentropy',
        optimizer=Adam(learning_rate=0.001),
        metrics=['accuracy']
    )

    # Train with fewer epochs for speed
    model.fit(X_train, y_train, epochs=5, batch_size=32, validation_split=0.1, verbose=0)

    y_pred = model.predict(X_test)
    y_pred_bin = (y_pred > 0.5).astype(int)
    acc = accuracy_score(y_test, y_pred_bin)
    f1 = f1_score(y_test, y_pred_bin, average='micro')
    return model, acc, f1

ann_model, ann_acc, ann_f1 = train_ann(X_train, y_train, X_test, y_test)
print(f"ANN Accuracy: {ann_acc:.4f}, F1-micro: {ann_f1:.4f}")

# -----------------------------
# 6️⃣ Naive Bayes
# -----------------------------
nb = MultinomialNB()
nb.fit(X_train, y_train)
y_pred_nb = nb.predict(X_test)
nb_acc = accuracy_score(y_test, y_pred_nb)
nb_f1 = f1_score(y_test, y_pred_nb, average='micro')
print(f"Naive Bayes Accuracy: {nb_acc:.4f}, F1-micro: {nb_f1:.4f}")

# -----------------------------
# 7️⃣ SVM
# -----------------------------
svm = OneVsRestClassifier(LinearSVC())
svm.fit(X_train, y_train)
y_pred_svm = svm.predict(X_test)
svm_acc = accuracy_score(y_test, y_pred_svm)
svm_f1 = f1_score(y_test, y_pred_svm, average='micro')
print(f"SVM Accuracy: {svm_acc:.4f}, F1-micro: {svm_f1:.4f}")

# -----------------------------
# 8️⃣ Select Best Model
# -----------------------------
models = {
    'ANN': (ann_model, ann_acc, ann_f1),
    'NaiveBayes': (nb, nb_acc, nb_f1),
    'SVM': (svm, svm_acc, svm_f1)
}

best_model_name = max(models, key=lambda k: models[k][2])  # highest F1-micro
best_model = models[best_model_name][0]

print(f"\nBest Model Selected: {best_model_name} with F1-micro {models[best_model_name][2]:.4f}")

# -----------------------------
# 9️⃣ Save Best Model
# -----------------------------
with open(best_model_path, 'wb') as f:
    pickle.dump(best_model, f)
print(f"Best model saved at {best_model_path}")
