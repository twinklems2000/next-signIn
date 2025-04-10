"use client";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Button, Typography, Container } from "@mui/material";
import { useState } from "react";

export default function Home() {
  type User = {
    name: string;
    email: string;
    picture?: string;
  };

  const [user, setUser] = useState<User | null>(null);

  const handleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    },
  });

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Hello, 😊
      </Typography>
      {!user ? (
        <Button variant="contained" onClick={() => handleLogin()}>
          Sign in with Google
        </Button>
      ) : (
        <>
          {/* {user?.picture && (
            <Image
              src={user?.picture}
              alt="Google User"
              width={200}
              height={200}
            />
          )} */}
          <Typography variant="h6">Welcome, {user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Button
            variant="outlined"
            onClick={handleLogout}
            style={{ marginTop: "20px" }}
          >
            Logout
          </Button>
        </>
      )}
    </Container>
  );
}
