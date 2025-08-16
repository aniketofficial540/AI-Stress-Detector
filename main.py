from flask import Flask
import mysql.connector
import joblib 
import re

try:
    model = joblib.load('Datasets/stress_model.joblib')
    vectorizer = joblib.load('Datasets/tfidf_vectorizer.joblib')
    print("Scikit-learn model and vectorizer loaded successfully!")
except FileNotFoundError:
    print("Error: Model or vectorizer file not found. Make sure 'stress_model.joblib' and 'tfidf_vectorizer.joblib' are in the correct directory.")
    exit()

app = Flask(__name__)

db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '', #use your own password
    'database': 'ai_stress'
}

def clean_text(text):
    
    if not isinstance(text, str):
        return ""
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text.lower())
    return text.strip()

def predict_stress(text):

    text_vectorized = vectorizer.transform([text])

    prediction = model.predict(text_vectorized)
    
    return "Stress" if prediction[0] == 1 else "No Stress"


@app.route('/home', methods=['GET'])
def update_stress_status():

    conn = None  
    cursor = None 
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        cursor.execute("SELECT id, caption FROM posts WHERE is_stress IS NULL OR is_stress = ''")
        posts = cursor.fetchall()

        if not posts:
            return "No new posts to process. All caught up! ✅"

        processed_count = 0
        for post_id, caption in posts:
            clean_caption = clean_text(caption)
            
            if not clean_caption:
                continue

            label = predict_stress(clean_caption)

            cursor.execute("UPDATE posts SET is_stress = %s WHERE id = %s", (label, post_id))
            conn.commit()
            processed_count += 1

        return f"{processed_count} post(s) processed and updated successfully."

    except mysql.connector.Error as err:
        return f"Database Error: {err}"
    except Exception as e:
        return f"An unexpected error occurred: {str(e)}"

    finally:
        if cursor:
            cursor.close()
        if conn and conn.is_connected():
            conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)