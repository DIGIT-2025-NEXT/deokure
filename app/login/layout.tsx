"use client";

import { Container, Box, TextField, Button, Typography, Card, CardContent, Snackbar, AppBar, Toolbar } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            ログイン
          </Typography>
          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="名前"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              入室する
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 成功メッセージ */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={`ようこそ、${name}さん！`}
      />
    </Container>
  );
}
