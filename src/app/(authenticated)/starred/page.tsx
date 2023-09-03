"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const StarredPage = (): JSX.Element => (
  <Container>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="body1" gutterBottom>
        Starred Page
      </Typography>
    </Box>
  </Container>
);
export default StarredPage;
