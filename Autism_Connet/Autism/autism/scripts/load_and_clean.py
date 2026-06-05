# load_and_clean.py
import pandas as pd
from load_data import load_data

def clean_data():
    df = load_data()
    
    # Example: drop duplicates
    df = df.drop_duplicates(subset='clean_text', keep='first')
    
    # Example: drop irrelevant columns
    drop_cols = ['link_id','parent_id'] if 'link_id' in df.columns else []
    df = df.drop(columns=drop_cols)
    
    print(f"Cleaned dataset shape: {df.shape}")
    return df

if __name__ == "__main__":
    df = clean_data()
    print(df.head())
