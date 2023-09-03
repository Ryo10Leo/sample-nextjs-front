"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TasksPage = (): JSX.Element => (
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
        Tasks Page
      </Typography>
    </Box>
  </Container>
);

export default TasksPage;
