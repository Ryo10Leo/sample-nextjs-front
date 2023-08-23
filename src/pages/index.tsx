import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../components/Link";
import ProTip from "../components/ProTip";
import Copyright from "../components/Copyright";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();
  console.log(session);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/about",
      },
    };
  }

  return { props: {} };
};
