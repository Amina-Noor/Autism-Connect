import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
import pickle

# 1️⃣ Load cleaned dataset
data_path = r"C:\ai_project\backend\outputs\cleaned_dataset.csv"
df = pd.read_csv(data_path)
print("Dataset loaded. Shape:", df.shape)

# 2️⃣ Select label columns
label_cols = df.columns[9:-1]  # exclude 'clean_text'
y = df[label_cols]

# 3️⃣ Extract TF-IDF features from 'clean_text'
tfidf = TfidfVectorizer(max_features=5000, stop_words='english')
X = tfidf.fit_transform(df['clean_text'].fillna(''))  # fill NaN with empty string
print("TF-IDF feature matrix shape:", X.shape)

# 4️⃣ Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Training set shape:", X_train.shape, y_train.shape)
print("Test set shape:", X_test.shape, y_test.shape)

# 5️⃣ Save TF-IDF vectorizer
with open(r"C:\ai_project\backend\outputs\tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(tfidf, f)
print("TF-IDF vectorizer saved!")
