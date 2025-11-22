import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
