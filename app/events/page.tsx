import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import city7 from './data/city7';
import ComboBox from '../_components/combox';

export default function ex() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <header style={{ width: '100%', padding: '1rem 0', background: '#1976d2', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#fff' }}>イベント検索</h1>
      </header>
      <ComboBox />
  <ComboBox />
    </div>
  );
}