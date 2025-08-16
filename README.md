## 📽️ Demo  
- Watch the demo video here: [AI Stress Detector Demo](Video/AIStressDetector.mp4)

## 🧠 AI Stress Detector

An AI-powered project that detects stress levels from text messages/posts using Machine Learning (TF-IDF + Classification Model) and provides a simple social media-style interface for users to interact with the system.

## 🚀 Features

- 📊 Stress Detection – Classifies text as stressed or non-stressed using a trained ML model.
- 📝 Post Creation – Users can create posts/messages in a social media-like environment.
- 👤 User Profiles – Basic profile system with login/signup.
- 💬 Message Analysis – Messages are analyzed in real-time for stress levels.
- 🌐 Web Interface – Built with HTML, CSS, JavaScript, Node.js, and EJS templates.

## 📂 Project Structure

<img width="764" height="599" alt="image" src="https://github.com/user-attachments/assets/d5a0ad64-faa9-473e-a9f7-40c9fc974205" />

-- some changes have been made recently so you can check the files directly in the repo --

## ⚙️ Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js (Express), Python (Flask for ML model)
- ML Model: Scikit-learn (TF-IDF + Classification)
- Database : SQL

## 📊 Dataset

- Dataset: stress_dataset.xlsx
- Preprocessing: Tokenization, stopword removal, TF-IDF Vectorization
- Model: Trained and saved as stress_model.joblib

## 🖥️ How It Works

- User creates a post/message.
- Text is passed to the Database.
- Model analyzes the text from the Database → save the outputs Stress or No Stress.
- The result is displayed back on the social media-style platform.
