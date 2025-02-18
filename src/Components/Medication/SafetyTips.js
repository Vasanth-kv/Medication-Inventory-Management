import React from 'react';

const SafetyTips = () => {
  const tips = [
    'Always read the label before taking any medication.',
    'Never share your prescription medication with others.',
    'Store medicines in a cool, dry place.',
    'Keep out of reach of children.',
    // Add more tips as needed
  ];

  return (
    <div>
      <h1>Safety Tips</h1>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default SafetyTips;
