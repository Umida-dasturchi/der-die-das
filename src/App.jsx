import React,{ useState } from "react";
import { quizData } from "./config";

export default function App() {
  const QUESTIONS_PER_PAGE = 25;
  const totalPages = Math.ceil(quizData.length / QUESTIONS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const startIdx = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = quizData.slice(
    startIdx,
    startIdx + QUESTIONS_PER_PAGE
  );

  const handleAnswer = (index, value) => {
    setAnswers({ ...answers, [startIdx + index]: value });
  };

  const handleSubmit = () => {
    let correct = 0;
    currentQuestions.forEach((q, idx) => {
      const globalIndex = startIdx + idx;
      if (answers[globalIndex] === q.article) correct++;
    });
    setResults({
      ...results,
      [currentPage]: `${correct} out of ${currentQuestions.length}`,
    });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6 text-orangeBrand">
        der / die / das quiz mit Umida
      </h1>

      <div className="grid gap-4">
        {currentQuestions.map((q, idx) => (
          <div
            key={idx}
            className="bg-darkBrand border border-purpleBrand rounded-2xl p-4"
          >
            <p className="font-semibold text-lg mb-3 text-pinkBrand">
              {startIdx + idx + 1}. {q.word}
            </p>
            <div className="flex gap-6">
              {["der", "die", "das"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    className="w-4 h-4 text-tealBrand focus:ring-pinkBrand"
                    name={`q-${startIdx + idx}`}
                    checked={answers[startIdx + idx] === option}
                    onChange={() => handleAnswer(idx, option)}
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          className="px-4 py-2 rounded-xl bg-purpleBrand hover:bg-pinkBrand disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>

        <button
          className="px-6 py-2 rounded-xl bg-orangeBrand text-darkBrand font-bold hover:bg-tealBrand"
          onClick={handleSubmit}
        >
          Submit Page {currentPage}
        </button>

        <button
          className="px-4 py-2 rounded-xl bg-purpleBrand hover:bg-pinkBrand disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>

      {results[currentPage] && (
        <div className="mt-6 p-4 bg-tealBrand/20 border border-tealBrand rounded-xl">
          <p className="font-semibold text-orangeBrand">
            Result for page {currentPage}: {results[currentPage]}
          </p>
        </div>
      )}
    </div>
  );
}