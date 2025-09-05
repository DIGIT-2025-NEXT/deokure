// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import city7 from '../data/city7';

// export default function ComboBox() {
//   return (
//     // <Autocomplete
//     //   disablePortal
//     // //   options={city7}
//     // options={city7}
//     //   sx={{ width: 300 }}
//     //   renderInput={(params) => <TextField {...params} label="Movie" />}
//     // />
//         <p>a1a</p>
//   );
// }

// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

// export default function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }

"use client";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import city7 from '../data/city7';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      options={city7}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="区名" />}
    />
  );
}
