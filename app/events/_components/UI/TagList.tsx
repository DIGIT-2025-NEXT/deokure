import React from 'react';
import { Chip, Stack } from '@mui/material';
import { Tag } from '../../data/types';

interface TagListProps {
  tags?: Tag[];
  onTagClick?: (tagId: string) => void;
}

const defaultTags: Tag[] = [
  { id: 'markdown', label: 'Markdownとして表示' },
  { id: 'feedback', label: 'フィードバック' },
  { id: 'bundle-size', label: 'バンドルサイズ', color: 'primary' },
  { id: 'source', label: 'ソース' },
  { id: 'wireframe', label: 'ワイヤーフレーム' },
  { id: 'figma', label: 'Figma', color: 'secondary' },
  { 
    id: 'sketch', 
    label: 'Sketch', 
    customStyle: { 
      backgroundColor: '#ffd700', 
      color: '#333',
    }
  },
];

export default function TagList({ tags = defaultTags, onTagClick }: TagListProps) {
  const handleTagClick = (tagId: string) => {
    console.info(`Tag clicked: ${tagId}`);
    onTagClick?.(tagId);
  };

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      flexWrap="wrap"
      sx={{ gap: 1 }}
    >
      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={tag.label}
          clickable
          color={tag.color}
          style={tag.customStyle}
          onClick={() => handleTagClick(tag.id)}
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
      ))}
    </Stack>
  );
}

