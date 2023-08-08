/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import './style.css';

interface ResultModalProps {
  accuracy: number
  restart: () => void
}

export const ResultModal: React.FC<ResultModalProps> = ({ accuracy, restart }) => {
  return (
    <div className="result-modal__wrapper">
      <div className="result-modal">
        <div>Game Over</div>
        <div>
          Accuracy:
          &nbsp;
          {accuracy.toFixed(2)}
          %
        </div>
        <button onClick={() => restart()} type="button">Restart</button>
      </div>
    </div>
  );
};

export default ResultModal;
