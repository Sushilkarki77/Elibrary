import React from 'react';
import { QuizQuestion } from '../interfaces/interfaces';

type QuestionComponentProps = {
    question: QuizQuestion
}

const QuizItem: React.FC<QuestionComponentProps> = ({ question }) => {
    return (<>
        <div className="quizBody space-y-4 border p-4 border-gray-300">

            <div className="text-md font-medium text-gray-800 border-b border-gray-300  pb-4">
                Q. {question.question}
            </div>

            <div className="space-y-3 ">
                {
                    question.options.map(x => {
                        return <>
                            <label className="flex cursor-pointer space-x-2 border rounded-sm p-2 bord border-gray-300 hover:bg-gray-50" key={x}>
                                <input type="radio" name="option" value="Paris" className="accent-blue-600 w-max outline-none focus:outline-none focus:ring-0" />
                                <span>{x}</span>
                            </label>
                        </>
                    })
                }
            </div>

        </div>
    </>);
}

export default QuizItem;