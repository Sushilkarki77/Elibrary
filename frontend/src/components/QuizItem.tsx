import React, { useEffect, useState } from 'react';
import { QuizQuestion } from '../interfaces/interfaces';
import OptionItem from './UI/OptionItem';

type QuestionComponentProps = {
    question: QuizQuestion
    onOptionSelect: (status: boolean, value: boolean) => void
}

const QuizItem: React.FC<QuestionComponentProps> = ({ question, onOptionSelect }) => {

    const [optionSelected, setOptionSelected] = useState(false);

    const handleOnOptionSelect = (isCorrect: boolean) => {
        setOptionSelected(true)
        onOptionSelect(true, isCorrect)
    }

    useEffect(() => {
        setOptionSelected(false);
    }, [question])

    return (<>
        <div className="quizBody space-y-4 border p-4 border-gray-300">

            <div className="text-md font-medium text-gray-800 border-b border-gray-300  pb-4">
                Q. {question.question}
            </div>

            <div className="space-y-3 ">
                {
                    question.options.map((x, index) => (
                        <OptionItem key={x + index} option={x} correctOption={question.answer} optionSelected={optionSelected} onOptionSelect={(isCorrect) => handleOnOptionSelect(isCorrect)} />
                    ))
                }
            </div>

        </div>
    </>);
}

export default QuizItem;

