import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function TagList() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Markdownとして表示" clickable />
      <Chip label="フィードバック" clickable />
      <Chip label="バンドルサイズ" clickable color="primary" />
      <Chip label="ソース" clickable />
      <Chip label="ワイアリア" clickable />
      <Chip label="フィグマ" clickable color="secondary" />
      <Chip label="スケッチ" clickable style={{ background: '#ffd700', color: '#333' }} />
    </Stack>
  );
}
