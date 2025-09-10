'use client';

import React from 'react';
import { TextField, Autocomplete } from '@mui/material';
import city7 from '../../data/city7';
import { City } from '../../data/types';

interface CitySelectorProps {
  value?: City | null;
  onChange?: (city: City | null) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function CitySelector({
  value = null,
  onChange,
  label = '区名',
  placeholder = '区を選択してください',
  fullWidth = false,
  disabled = false,
}: CitySelectorProps) {
  return (
    <Autocomplete
      disablePortal
      options={city7}
      value={value}
      onChange={(_, newValue) => onChange?.(newValue)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{ 
        width: fullWidth ? '100%' : 300,
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          variant="outlined"
        />
      )}
    />
  );
}

