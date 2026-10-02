require("dotenv").config();

if (!process.env.GENAI_API_KEY?.trim()) {
  throw new Error(
    "GENAI_API_KEY is missing. Add a valid Gemini API key to server/.env.",
  );
}

const app = require("./src/app");
const connectDB = require("./src/config/Database");
const { invokeGeminiAi } = require("./src/services/ai.services");

const port = process.env.PORT || process.env.port || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (error) {
    process.exitCode = 1;
  }
};

startServer();
