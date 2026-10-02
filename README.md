# genAI-fullstack-job-preparation

# GenAI Full-Stack Interview Preparation System 🚀

A powerful MERN-stack application that leverages Generative AI to bridge the gap between candidates and their target job roles. The system takes multi-dimensional inputs and uses high-tier LLMs to generate structured interview insights and automated resume tailoring.

---

## 🛠️ Core Workflow

The application follows a specialized data pipeline to ensure high-quality, structured results:

1.  **Multi-Source Inputs**: Users provide three critical pieces of data:
    - **Job Description**: The target role requirements.
    - **Self Description**: A personal summary of strengths and goals.
    - **Resume Upload**: Direct PDF upload for deep parsing.
2.  **Structured AI Analysis**: The backend integrates with **Google Gemini AI** to process these inputs. It enforces a strict **Zod Schema** to ensure the AI output is perfectly structured for the database and frontend.
3.  **PDF Generation Engine**: The AI generates a customized resume in **HTML format**, which is then dynamically converted into a professional **PDF document** using the **Puppeteer library**.

---

## ✨ Key Features

- **Match Score & Skill Gap Analysis**: Uses AI to identify exactly where your profile lacks alignment with the Job Description.
- **Structured Interview Reports**: Generates technical and behavioral questions based on your unique profile.
- **Dynamic Day Study Plan**: Provides a daily task list to help you prepare for the specific role.
- **AI Resume Tailoring**: Automatically creates a PDF resume that highlights your most relevant skills for the job.

---

## 💻 Tech Stack

- **Frontend**: React.js, Vite, SCSS (Premium Dark Theme), Axios, React Router.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Google Gemini SDK.
- **Validation**: **Zod** (used for AI response enforcement and API validation).
- **Automation**: **Puppeteer** (HTML to PDF conversion).
- **Processing**: **pdf-parse** & **Multer** (Resume data extraction).

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Steps

1.  **Backend Setup**:

    ```bash
    cd server
    npm install
    ```

    Create a `.env` file:

    ```env
    PORT=3000
    MONGODB_URI=your mongoDb connection link
    JWT_SECRET=your_secret
    GENAI_API_KEY=your_gemini_key
    ```

2.  **Frontend Setup**:

    ```bash
    cd frontend
    npm install
    ```

3.  **Run the App**:
    - Backend: `npm run start` (inside server)
    - Frontend: `npm run dev` (inside frontend)

---

Developed by [Your Name]
