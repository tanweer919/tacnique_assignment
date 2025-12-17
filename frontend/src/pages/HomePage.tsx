import React from "react";
import { fetchQuizzes } from "../api";

const HomeScreen = () => {
  const [quizzes, setQuizzes] = React.useState<{id: Number; title: string; description: string;}[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchQuizzes();
        setQuizzes(response);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
            Welcome to the Quiz App
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Test your knowledge with our engaging quizzes
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading quizzes...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-800 font-semibold">
                    Error loading quizzes
                  </p>
                  <p className="text-red-700 text-sm mt-1">{(error as any).message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && quizzes.length === 0 && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No quizzes available
              </h3>
              <p className="text-gray-600">Check back later for new quizzes!</p>
            </div>
          </div>
        )}

        {/* Quizzes Grid */}
        {!loading && !error && quizzes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id.toString()}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      Quiz
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {quiz.description}
                  </p>

                  <a
                    href={`/quiz/${quiz.id}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Take Quiz
                    <svg
                      className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
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
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
