"use client";

import { Container, Box, TextField, Button, Typography, Card, CardContent, Snackbar } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ← 追加

export default function LoginPage() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter(); // ← 追加

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setOpen(true);

      // メッセージを少し表示してから遷移したい場合
      setTimeout(() => {
        router.push("/"); // トップページに遷移
      }, 500); // 0.5秒後に遷移
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

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={`ようこそ、${name}さん！`}
      />
    </Container>
  );
}
