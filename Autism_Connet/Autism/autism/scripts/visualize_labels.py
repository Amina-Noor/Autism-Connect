import pandas as pd
import matplotlib.pyplot as plt
import re  # For text cleaning

# 1️⃣ Load dataset
data_path = r"C:\Users\I&I LT\OneDrive\Desktop\kainat\V Semester 2025\ai\Project\data\DataSet.csv"
df = pd.read_csv(data_path)

# 2️⃣ Select label columns
label_cols = df.columns[9:]
print("Label columns:", label_cols)

# 3️⃣ Count total examples per label
label_counts = df[label_cols].sum()
print("Label counts:\n", label_counts)

# 4️⃣ Sort labels by count
label_counts = label_counts.sort_values(ascending=False)

# 5️⃣ Plot bar chart
plt.figure(figsize=(12,6))
label_counts.plot(kind='bar', color='skyblue')
plt.title("Label Distribution in Dataset")
plt.xlabel("Emotion Labels")
plt.ylabel("Number of Examples")
plt.xticks(rotation=45)
plt.tight_layout()

# 6️⃣ Save the chart
plt.savefig(r"C:\Users\I&I LT\OneDrive\Desktop\kainat\V Semester 2025\ai\Project\outputs\label_distribution.png")
plt.show()

# 7️⃣ Text Preprocessing
def clean_text(text):
    text = text.lower()  # lowercase
    text = re.sub(r'[^a-zA-Z\s]', '', text)  # remove punctuation & numbers
    text = re.sub(r'\s+', ' ', text).strip()  # remove extra spaces
    return text

df['clean_text'] = df['text'].apply(clean_text)
print(df[['text', 'clean_text']].head())  # optional: check first 5 rows

# 8️⃣ Save a copy of the dataset with cleaned text
df.to_csv(r"C:\Users\I&I LT\OneDrive\Desktop\kainat\V Semester 2025\ai\Project\outputs\cleaned_dataset.csv", index=False)
print("Dataset saved as cleaned_dataset.csv with cleaned text")
