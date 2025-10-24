
import React from 'react';

interface DiceProps {
  values: [number, number];
}

const Die: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-3xl font-bold text-gray-900 shadow-lg">
    {value}
  </div>
);

const Dice: React.FC<DiceProps> = ({ values }) => {
  return (
    <div className="flex gap-4">
      <Die value={values[0]} />
      <Die value={values[1]} />
    </div>
  );
};

export default Dice;
