import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuizQuestion } from '../interfaces/interfaces';
import QuizItem from './QuizItem';
import Overlay from './UI/Overlay';

type QuizNavigateState = QuizQuestion[];

const QuizComponent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as QuizNavigateState | undefined;
    const [questions, setQuiz] = useState<QuizQuestion[] | null>(null)
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [currentQuestionAnswered, setCurrentQuestionAnswered] = useState(false);
    const [quizResult, setQuizResult] = useState<number | null>(null)



    useEffect(() => {
        if (!state || !state) {
            navigate('/dashboard');
            return;
        }
        setQuiz(state)
    }, [navigate, questions, state])


    if (!questions) {
        return (<></>)
    }

    const handleNextClick = () => {
        if (activeQuestion < questions?.length - 1) {
            setActiveQuestion(activeQuestion + 1);
            setCurrentQuestionAnswered(false);
        } else if (activeQuestion == questions?.length - 1) {
            setQuizResult(correctCount);
        }
    }

    const handleResultClouseAction = () => {
        setQuizResult(null);
        navigate('/dashboard');
    }



    const handleOnOptionSelect = (status: boolean, value: boolean) => {
        setCorrectCount(value == true ? correctCount + 1 : correctCount);
        setCurrentQuestionAnswered(status);
    }

    return (
        <>{questions && <div className="">
            <div className="flex gap-4 text-sm font-semibold text-gray-700 mb-2">
                <div>
                    Question <span className="text-blue-600">{activeQuestion + 1}</span> /  <span className="text-blue-600">{questions?.length}</span>
                </div>

                <div>
                    Correct answers: {correctCount}
                </div>
            </div>

            <QuizItem question={questions[activeQuestion]} onOptionSelect={(status, value) => handleOnOptionSelect(status, value)} />

            {quizResult && <Overlay isOpen={true} onClose={() => handleResultClouseAction()}  >
                <div className='text-center flex flex-col'>
                    <div>
                        Correct Answers: {quizResult}
                    </div>
                    <div>
                        Total Questions: {questions.length}
                    </div>
                </div>
            </Overlay>}


            <> {
                currentQuestionAnswered &&
                <div className="flex gap-2 mt-3 border border-gray-300 p-2">
                    <button onClick={() => handleNextClick()} className="px-2 py-1 text-xs border-2  border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-200">
                        Next
                    </button>
                </div>
            }
            </>
        </div>
        }
        </>
    )
}

export default QuizComponent;