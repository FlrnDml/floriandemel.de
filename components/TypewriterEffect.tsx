import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenPhrases = 2000,
  className = ''
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (phrases.length === 0) return;
    
    let timer: NodeJS.Timeout;
    
    if (isWaiting) {
      timer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenPhrases);
      return () => clearTimeout(timer);
    }
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        timer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (text === currentPhrase) {
        setIsWaiting(true);
      } else {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, isWaiting, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);
  
  return (
    <div className={`typewriter ${className}`}>
      <span>{text}</span>
      <span className="cursor"></span>
    </div>
  );
};

export default TypewriterEffect;
