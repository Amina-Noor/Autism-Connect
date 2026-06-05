# feature_extraction.py
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from load_and_clean import clean_data

base_path = r"C:\ai_project\backend"
tfidf_path = f"{base_path}/outputs/tfidf_vectorizer.pkl"

def extract_features(max_features=5000):
    df = clean_data()
    texts = df['clean_text']
    
    tfidf = TfidfVectorizer(max_features=max_features, stop_words='english')
    X = tfidf.fit_transform(texts)
    
    # Save vectorizer
    with open(tfidf_path, 'wb') as f:
        pickle.dump(tfidf, f)
    print(f"TF-IDF vectorizer saved. Shape: {X.shape}")
    
    return X, tfidf

if __name__ == "__main__":
    X, tfidf = extract_features()
