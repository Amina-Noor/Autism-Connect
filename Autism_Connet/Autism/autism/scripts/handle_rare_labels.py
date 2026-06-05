# ==============================
# handle_rare_labels.py
# ==============================

import pandas as pd
import os

# -----------------------------
# 1️⃣ Paths
# -----------------------------
base_path = r"C:\ai_project\backend"
data_path = os.path.join(base_path, "outputs", "cleaned_dataset.csv")

# ⚡ Updated output filename to avoid PermissionError
updated_data_path = os.path.join(base_path, "outputs", "cleaned_dataset_updated_v2.csv")

# -----------------------------
# 2️⃣ Load cleaned dataset
# -----------------------------
df = pd.read_csv(data_path)
print("Dataset loaded. Shape:", df.shape)

# -----------------------------
# 3️⃣ Select label columns and ensure numeric
# -----------------------------
label_cols = df.columns[9:]
y = df[label_cols].apply(pd.to_numeric, errors='coerce').fillna(0).astype(int)
print("Original Labels shape:", y.shape)

# -----------------------------
# 4️⃣ Count occurrences of each label
# -----------------------------
label_counts = y.sum()
print("\nNumber of samples per label:")
print(label_counts)

# -----------------------------
# 5️⃣ Drop rare labels (<500 examples)
# -----------------------------
threshold = 500
rare_labels = label_counts[label_counts < threshold].index
if len(rare_labels) > 0:
    print("\nDropping rare labels:", list(rare_labels))
    y = y.drop(columns=rare_labels)
    label_cols = y.columns
print("\nLabels after removing rare labels:", y.shape)

# -----------------------------
# 6️⃣ Save updated dataset
# -----------------------------
df_updated = pd.concat([df['clean_text'], y], axis=1)
df_updated.to_csv(updated_data_path, index=False)
print(f"\nUpdated dataset saved at: {updated_data_path}")
