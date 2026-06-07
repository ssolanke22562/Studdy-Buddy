const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const { generateQuiz, askDoubt } = require('./src/config/gemini');

const test = async () => {
  console.log("Testing generateQuiz...");
  try {
    const topic = "Mechanics";
    const syllabusContext = [
      {
        unit: "Introduction to Physics",
        topics: [
          { name: "Mechanics", subtopics: [] }
        ]
      }
    ];
    const quiz = await generateQuiz(topic, syllabusContext, 3, "Medium");
    console.log("✅ generateQuiz Success:", JSON.stringify(quiz, null, 2));
  } catch (err) {
    console.error("❌ generateQuiz Failed:", err);
  }

  console.log("\nTesting askDoubt...");
  try {
    const message = "What is mechanics?";
    const syllabusContext = "Mechanics in Physics";
    const reply = await askDoubt(message, syllabusContext, []);
    console.log("✅ askDoubt Success:", reply);
  } catch (err) {
    console.error("❌ askDoubt Failed:", err);
  }
};

test();
