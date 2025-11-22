import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  categories?: string[];
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, categories = [], className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {children}
      </div>
      {categories.length > 0 && (
        <div className="card-categories">
          {categories.map((category, index) => (
            <span key={index} className="badge">{category}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
