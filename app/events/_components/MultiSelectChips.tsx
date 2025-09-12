import React from 'react';

interface Props {
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

const areas = ['小倉北区', '小倉南区', '戸畑区', '門司区', '若松区', '八幡東区', '八幡西区', 'その他'];

const MultiSelectChips: React.FC<Props> = ({ selectedAreas, setSelectedAreas }) => {
  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {areas.map(area => (
        <button
          key={area}
          onClick={() => toggleArea(area)}
          style={{
            padding: '0.3rem 0.7rem',
            borderRadius: '16px',
            border: selectedAreas.includes(area) ? '1px solid #1976d2' : '1px solid #ccc',
            backgroundColor: selectedAreas.includes(area) ? '#1976d2' : '#f0f0f0',
            color: selectedAreas.includes(area) ? '#fff' : '#333',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          {area}
        </button>
      ))}
    </div>
  );
};

export default MultiSelectChips;
