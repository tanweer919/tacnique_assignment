import React from "react";
import { useParams } from "react-router-dom";
import { fetchQuizDetails, submitQuizAnswers } from "../api";

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
  questions: {
    id: number;
    question_text: string;
    question_type: "TEXT" | "MCQ" | "TF";
    choices: { id: number; choice_text: string }[];
  }[];
}

interface Answers {
  [questionId: number]: string | number;
}

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = React.useState<Quiz | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [result, setResult] = React.useState<{
    correct_answers: number;
    total_questions: number;
    percentage: number;
  } | null>(null);

  React.useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetchQuizDetails(id);
        setQuiz(response);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId: number, value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz) return;

    try {
      setSubmitting(true);
      const response = await submitQuizAnswers(id, answers);
      setResult(response);
      setSubmitted(true);
    } catch (err: any) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getProgress = () => {
    if (!quiz) return 0;
    const answered = Object.keys(answers).length;
    return Math.round((answered / quiz.questions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading quiz...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <svg
                  className="h-6 w-6 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3">
                  <p className="text-red-800 font-semibold">
                    Error loading quiz
                  </p>
                  <p className="text-red-700 text-sm mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Not Found */}
        {!loading && !error && !quiz && (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <svg
                className="mx-auto h-20 w-20 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Quiz not found
              </h3>
              <p className="text-gray-600">
                The quiz you're looking for doesn't exist.
              </p>
              <a
                href="/"
                className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}

        {/* Submitted Result */}
        {submitted && result && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto">
              <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quiz Completed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for completing the quiz.
              </p>

              <div className="bg-indigo-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-indigo-600 font-medium mb-2">
                  Your Score
                </p>
                <p className="text-5xl font-bold text-indigo-600 mb-2">
                  {Math.round(result.percentage)}%
                </p>
                <p className="text-gray-600">
                  {result.correct_answers} out of {result.total_questions}{" "}
                  correct
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href="/"
                  className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!loading && !error && quiz && !submitted && (
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {quiz.title}
                  </h1>
                  <p className="text-gray-600">{quiz.description}</p>
                </div>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </a>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>
                    {Object.keys(answers).length} of {quiz.questions.length}{" "}
                    answered
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${getProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              {quiz.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent hover:border-indigo-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {question.question_text}
                      </h2>

                      {/* MCQ Options */}
                      {question.question_type === "MCQ" && (
                        <div className="space-y-3">
                          {question.choices.map((choice) => (
                            <label
                              key={choice.id}
                              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                answers[question.id] === choice.id
                                  ? "border-indigo-600 bg-indigo-50"
                                  : "border-gray-200 hover:border-indigo-200 hover:bg-gray-50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={choice.id}
                                checked={
                                  answers[question.id] === choice.choice_text
                                }
                                onChange={() =>
                                  handleAnswerChange(
                                    question.id,
                                    choice.choice_text,
                                  )
                                }
                                className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                              />
                              <span className="ml-3 text-gray-700">
                                {choice.choice_text}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {/* True/False Options */}
                      {question.question_type === "TF" && (
                        <div className="flex gap-4">
                          <label
                            className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              answers[question.id] === "true"
                                ? "border-green-600 bg-green-50"
                                : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value="true"
                              checked={answers[question.id] === "true"}
                              onChange={() =>
                                handleAnswerChange(question.id, "true")
                              }
                              className="sr-only"
                            />
                            <svg
                              className={`h-6 w-6 mr-2 ${
                                answers[question.id] === "true"
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span
                              className={`font-medium ${
                                answers[question.id] === "true"
                                  ? "text-green-600"
                                  : "text-gray-700"
                              }`}
                            >
                              True
                            </span>
                          </label>
                          <label
                            className={`flex-1 flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              answers[question.id] === "false"
                                ? "border-red-600 bg-red-50"
                                : "border-gray-200 hover:border-red-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value="false"
                              checked={answers[question.id] === "false"}
                              onChange={() =>
                                handleAnswerChange(question.id, "false")
                              }
                              className="sr-only"
                            />
                            <svg
                              className={`h-6 w-6 mr-2 ${
                                answers[question.id] === "false"
                                  ? "text-red-600"
                                  : "text-gray-400"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            <span
                              className={`font-medium ${
                                answers[question.id] === "false"
                                  ? "text-red-600"
                                  : "text-gray-700"
                              }`}
                            >
                              False
                            </span>
                          </label>
                        </div>
                      )}

                      {/* Text Answer */}
                      {question.question_type === "TEXT" && (
                        <textarea
                          placeholder="Type your answer here..."
                          value={(answers[question.id] as string) || ""}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:ring-0 focus:outline-none resize-none transition-colors"
                          rows={4}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={
                  submitting ||
                  Object.keys(answers).length !== quiz.questions.length
                }
                className={`inline-flex items-center px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                  Object.keys(answers).length === quiz.questions.length
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Quiz
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
