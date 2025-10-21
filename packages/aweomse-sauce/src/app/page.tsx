'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="min-h-screen pulsating-orange-bg flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-orange-800 text-center mb-6">
          Calculator
        </h1>
        
        {/* Display */}
        <div className="bg-orange-50 rounded-lg p-4 mb-4 border-2 border-orange-200">
          <div className="text-right text-3xl font-mono text-orange-900 min-h-[2.5rem] flex items-center justify-end">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clear}
            className="col-span-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            Clear
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            ×
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            9
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            -
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            6
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            +
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            3
          </button>
          <button
            onClick={performCalculation}
            className="row-span-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            =
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-orange-100 hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-lg transition-colors duration-200 text-lg"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}






