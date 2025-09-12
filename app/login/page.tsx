'use client';
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";

export default function TestLogin() {
  return (
    <Button
      variant="contained"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Googleでログイン
    </Button>
  );
}
