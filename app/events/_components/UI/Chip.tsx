import React from 'react';
import { Chip, Stack } from '@mui/material';

interface ChipComponentProps {
  onChipClick?: (chipId: string) => void;
  onChipDelete?: (chipId: string) => void;
}

export default function ChipComponent({ 
  onChipClick, 
  onChipDelete 
}: ChipComponentProps) {
  const handleClick = (chipId: string) => {
    console.info(`Chip clicked: ${chipId}`);
    onChipClick?.(chipId);
  };

  const handleDelete = (chipId: string) => {
    console.info(`Chip deleted: ${chipId}`);
    onChipDelete?.(chipId);
  };

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip
        label="クリック可能・削除可能"
        onClick={() => handleClick('clickable-deletable-1')}
        onDelete={() => handleDelete('clickable-deletable-1')}
        color="primary"
      />
      <Chip
        label="アウトライン版"
        variant="outlined"
        onClick={() => handleClick('clickable-deletable-2')}
        onDelete={() => handleDelete('clickable-deletable-2')}
        color="secondary"
      />
    </Stack>
  );
}