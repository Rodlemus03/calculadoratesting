import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';

const Calculator = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [currentOperation, setCurrentOperation] = useState(null);
    const [previousValue, setPreviousValue] = useState(null);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const { key } = event;

            if (!isNaN(key)) {
                pressNum(key);
            } else if (['+', '-', '*', '/'].includes(key)) {
                setOperation(key);
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault(); 
                calculateEqual();
            } else if (key === 'Escape' || key.toUpperCase() === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                setCurrentInput(currentInput.slice(0, -1));
            } else if (key === '.') {
                pressDecimal();
            } else if (key.toUpperCase() === 'N') {
                toggleSign();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentInput]);

    const pressNum = (num) => {
        if (currentInput.length < 9) {
            setCurrentInput((prevInput) => (prevInput === '0' ? num : prevInput + num));
        }
    };

    const pressDecimal = () => {
        if (!currentInput.includes('.')) {
            setCurrentInput(currentInput + '.');
        }
    };

    const updateDisplay = (value) => {
        if (value.toString().length > 9 || value < 0) {
            setCurrentInput('ERROR');
        } else {
            setCurrentInput(value.toString());
        }
    };

    const setOperation = (operation) => {
        if (currentInput === 'ERROR') return;

        if (currentInput !== '' && previousValue === null) {
            setPreviousValue(parseFloat(currentInput));
            setCurrentInput('');
        } else if (currentInput !== '' && previousValue !== null) {
            const result = calculateResult();
            if (result !== 'ERROR') {
                setPreviousValue(result);
            } else {
                setPreviousValue(null);
            }
            setCurrentInput('');
        }

        setCurrentOperation(operation);
    };

    const calculateResult = () => {
        if (currentOperation && currentInput !== '' && currentInput !== 'ERROR') {
            let result;
            const currentValue = parseFloat(currentInput);

            switch (currentOperation) {
                case '+':
                    result = previousValue + currentValue;
                    break;
                case '-':
                    result = previousValue - currentValue;
                    break;
                case '*':
                    result = previousValue * currentValue;
                    break;
                case '/':
                    result = previousValue / currentValue;
                    break;
                default:
                    return;
            }

            if (!Number.isFinite(result) || result < 0 || result > 999999999) {
                updateDisplay('ERROR');
                return 'ERROR';
            } else {
                updateDisplay(result.toString().slice(0, 9));
                return result;
            }
        }
    };

    const clearDisplay = () => {
        setCurrentInput('');
        setPreviousValue(null);
        setCurrentOperation(null);
        updateDisplay(0);
    };

    const reset = () => {
        setPreviousValue(null);
        setCurrentOperation(null);
        setCurrentInput('');
    };

    const calculateEqual = () => {
        if (currentOperation === '/' && currentInput === '0') {
            updateDisplay('ERROR');
            reset();
        } else {
            calculateResult();
            setCurrentOperation(null);
        }
    };

    const toggleSign = () => {
        if (currentInput.length < 9) {
            if (currentInput.charAt(0) === '-') {
                setCurrentInput(currentInput.substring(1));
            } else {
                setCurrentInput('-' + currentInput);
            }
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.calculator}>
                <div id="display" className={styles.display}>{currentInput || '0'}</div>
                <div className={styles.buttons}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(num => (
                        <button
                            key={num}
                            className={styles.btn}
                            onClick={() => pressNum(num.toString())}
                        >
                            {num}
                        </button>
                    ))}
                    <button className={styles.btn} onClick={() => setOperation('+')}>+</button>
                    <button className={styles.btn} onClick={() => setOperation('-')}>-</button>
                    <button className={styles.btn} onClick={() => setOperation('*')}>*</button>
                    <button className={styles.btn} onClick={() => setOperation('/')}>/</button>
                    <button className={styles.btn} onClick={calculateEqual}>=</button>
                    <button className={styles.btn} onClick={clearDisplay}>C</button>
                    <button className={styles.btn} onClick={toggleSign}>+/-</button>
                    <button className={styles.btn} onClick={pressDecimal}>.</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
