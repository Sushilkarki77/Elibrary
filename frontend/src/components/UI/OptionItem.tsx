import React, { useState } from 'react';



const OptionItem: React.FC<{ option: string, optionSelected: boolean, correctOption: string, onOptionSelect: (isCorrectSelected: boolean) => void }> = ({ option, optionSelected, correctOption, onOptionSelect }) => {

    const [isIncorrect, setIsInCorrect] = useState<boolean>(false)

    const onSelect = () => {
        setIsInCorrect(!checkIsCorrect())
        onOptionSelect(checkIsCorrect())
    }

    const checkIsCorrect = () => option === correctOption ? true : false;

    return (<>
        <label onClick={() => onSelect()} className={`flex border-gray-300 hover:bg-gray-50 ${optionSelected && 'pointer-events-none'} ${isIncorrect && 'border-red-500 text-red-500'} ${optionSelected && checkIsCorrect() && 'border-blue-500 text-blue-500 p-2'} cursor-pointer space-x-2 border rounded-sm p-2 bord `} >
            <input type="radio" name="option" value="Paris" className="accent-blue-600 w-max outline-none hidden focus:outline-none focus:ring-0" />
            <span>{option} </span>
            {optionSelected && checkIsCorrect() &&
                <>
                    {<span>✅</span>}
                </>
            }
            {
                isIncorrect && <span>❌</span>
            }
        </label>
    </>);
}

export default OptionItem;

