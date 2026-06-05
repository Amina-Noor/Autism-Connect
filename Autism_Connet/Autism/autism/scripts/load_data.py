# load_data.py
import pandas as pd
import warnings
warnings.filterwarnings("ignore")

# ----------------------------- PATH -----------------------------
data_path = r"C:\ai_project\backend\outputs\cleaned_dataset.csv"

# ----------------------------- LOAD DATA -----------------------------
def load_data():
    df = pd.read_csv(data_path)
    print(f"Raw dataset loaded: {df.shape}")
    
    # Fill missing text
    df['clean_text'] = df['clean_text'].fillna('')
    
    # Add 'unhappy' if missing
    if 'unhappy' not in df.columns:
        df['unhappy'] = 0
    
    return df

if __name__ == "__main__":
    df = load_data()
    print(df.head())
