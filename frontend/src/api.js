import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/quizzes/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
};

const fetchQuizDetails = async (quizId) => {
  try {
    const response = await axios.get(`${BASE_URL}/quiz/${quizId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz ${quizId} details:`, error);
    throw error;
  }
};

const submitQuizAnswers = async (quizId, answers) => {
  try {
    const response = await axios.post(`${BASE_URL}/quiz/submit/`, {
      quiz_id: quizId,
      answers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error submitting answers for quiz ${quizId}:`, error);
    throw error;
  }
};

export { fetchQuizzes, fetchQuizDetails, submitQuizAnswers };
