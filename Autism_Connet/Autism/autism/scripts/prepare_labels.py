import pandas as pd

# Load cleaned dataset
data_path = r"C:\ai_project\backend\outputs\cleaned_dataset.csv"
df = pd.read_csv(data_path)
print("Dataset loaded. Shape:", df.shape)

# Select label columns (exclude 'clean_text')
label_cols = df.columns[9:-1]  # 9th to second last column
y = df[label_cols]

print("Label columns:\n", label_cols)
print("Labels DataFrame shape:", y.shape)
print("First 5 rows of labels:\n", y.head())
