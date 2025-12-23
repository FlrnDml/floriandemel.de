import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  text: string;
  children: ReactNode;
}

/**
 *
**/
const Card: React.FC<CardProps> = ({ title, text = '', children }) => {
  return (
    <div className={`card`}>
      <h3 className="card-title">{title}</h3>
      <p>{text}</p>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
