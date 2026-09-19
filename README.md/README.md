# 🛡️ AI Suraksha Kavach

### AI-Powered Multi-Layer Digital Threat Detection Platform

<p align="center">

**Protect. Detect. Stay Safe.**

</p>

---

## 🌐 Live Website

### 👉 [🚀 Visit AI Suraksha Kavach](https://ai-suraksha-kavach.vercel.app)

> **Click the link above to directly open the live website.**

---

## 📌 About the Project

**AI Suraksha Kavach** is an AI-assisted cybersecurity platform designed to help users identify suspicious and potentially harmful digital content.

The platform provides multiple security scanners that analyze different types of digital content and generate a **risk score, threat status, detected findings, and security recommendations**.

The goal of the project is to provide users with a simple and accessible way to check potentially suspicious content before interacting with it.

---

## ✨ Key Features

### 🔗 URL Scanner

Analyzes URLs for suspicious indicators such as:

* Suspicious keywords
* Unsecured HTTP connections
* IP-based URLs
* Excessive subdomains
* Suspicious URL parameters
* Password, OTP, PIN and CVV-related indicators
* Unusually long URLs

The scanner generates a security risk score based on the detected indicators.

---

### 💬 Message Scanner

Analyzes messages for common social-engineering and phishing indicators, including:

* Urgent requests
* Password requests
* OTP requests
* PIN/CVV requests
* Banking-related requests
* Suspicious links
* Prize/reward scams
* Account suspension messages
* Requests for sensitive information

---

### 📧 Email Scanner

The email scanner analyzes email content and detects potentially suspicious patterns such as:

* Account verification requests
* Banking-related threats
* Urgent actions
* Suspicious links
* Credential requests
* OTP and PIN requests
* Prize and reward scams
* Account suspension warnings

---

### 🖼️ Image Scanner with OCR

Users can upload images containing text.

The system uses **OCR (Optical Character Recognition)** to extract readable text from the image and analyze it for suspicious security indicators.

Supported formats include:

* JPG
* JPEG
* PNG
* WEBP

---

### 🎥 Video Scanner

The video scanner analyzes selected video frames and extracts visible text using OCR.

The extracted text is then analyzed for suspicious indicators.

**Processing flow:**

```text
Video Upload
     ↓
Frame Extraction
     ↓
OCR
     ↓
Text Analysis
     ↓
Risk Assessment
     ↓
Security Result
```

---

### 📱 QR Scanner

The QR scanner can decode QR codes from uploaded images and analyze the decoded content.

It can identify whether the QR code contains:

* A URL
* Text
* Potentially suspicious content

---

### 📊 Risk Assessment

The platform provides a risk score from **0–100**.

The result is categorized into:

| Risk Score | Status     |
| ---------- | ---------- |
| 0–39       | 🟢 Safe    |
| 40–69      | 🟡 Warning |
| 70–100     | 🔴 Danger  |

The system also provides:

* Risk score
* Threat status
* Detection findings
* Explanation
* Security recommendations

---

### 🗂️ Scan History

The application stores scan results in **Supabase**.

Users can view previous scans, including:

* Scanner type
* Risk score
* Status
* Findings
* Recommendations
* Scan timestamp

Users can also delete individual scan records or clear their scan history.

---

## 🧠 How It Works

```text
                 AI SURAKSHA KAVACH
                         │
        ┌────────────────┼────────────────┐
        │                │                │
       URL            MESSAGE           EMAIL
        │                │                │
        └────────────────┼────────────────┘
                         │
                    IMAGE / QR
                         │
                       VIDEO
                         │
                         ▼
                  CONTENT ANALYSIS
                         │
                         ▼
                 THREAT DETECTION
                         │
                         ▼
                   RISK ENGINE
                         │
             ┌───────────┼───────────┐
             │           │           │
           SAFE        WARNING      DANGER
             │           │           │
             └───────────┼───────────┘
                         │
                         ▼
                 SECURITY ADVICE
                         │
                         ▼
                  SCAN HISTORY
```

---

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* React Router
* JavaScript
* CSS
* Lucide React

### Backend

* Python
* FastAPI
* Uvicorn
* Pydantic
* OpenCV
* Tesseract OCR
* Pillow

### Database

* Supabase
* PostgreSQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm
* Python

---

## 📁 Project Structure

```text
safeguard-ai/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── utils/
│   │   ├── main.py
│   │   └── config.py
│   │
│   ├── uploads/
│   └── requirements.txt
│
├── ai_models/
│   ├── url_model/
│   ├── text_model/
│   └── media_model/
│
├── database/
│   └── schema.sql
│
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

```bash
cd safeguard-ai
```

---

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

---

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn app.main:app --reload
```

---

## 🔐 Environment Variables

Create a `.env` file inside the appropriate project directory.

### Frontend

```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

### Backend

```env
APP_NAME=AI Suraksha Kavach
APP_VERSION=1.0.0
DEBUG=true
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE_MB=20
```

> ⚠️ **Never upload private API keys, service-role keys, passwords, or other secrets to GitHub.**

---

## 🗄️ Database

The project uses **Supabase/PostgreSQL** to store scan history.

The database stores information such as:

```text
Scanner Type
Input Data
Risk Score
Status
Title
Description
Findings
Recommendations
Created Time
```

---

## 🎯 Project Objectives

The main objectives of AI Suraksha Kavach are:

* To provide accessible digital threat detection.
* To identify common phishing and social-engineering patterns.
* To analyze multiple types of digital content.
* To provide understandable risk scores.
* To provide actionable security recommendations.
* To maintain a history of previous security scans.
* To create a simple and user-friendly cybersecurity experience.

---

## 🚀 Future Enhancements

Possible future improvements include:

* Advanced AI/ML-based phishing detection
* Speech and audio analysis in videos
* Deepfake detection
* Advanced malicious URL reputation checking
* Real-time threat intelligence
* Malware detection
* Browser extension integration
* Mobile application
* User authentication
* Security alerts and notifications
* More advanced image and video analysis

---

## 👨‍💻 Developer

### Tirtha Banerjee, Srijeeta joy, Saptaparna Mitra, Avirup Chattopadhyay

**B.Tech — Institute of Engineering & Management (IEM), Kolkata**

AI Suraksha Kavach was developed as a cybersecurity-focused project combining modern web development, backend APIs, OCR, automated threat analysis, and cloud database technologies.

---

## ⭐ Support the Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">

### 🛡️ AI Suraksha Kavach

**Stay Alert. Stay Secure. Stay Protected.**

</p>
