"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationApi";

import {
  Container,
  Typography,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Stack,
} from "@mui/material";

export default function Home() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [viewedIds, setViewedIds] = useState<string[]>([]);

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (item: any) => item.Type === filter
        );

  const startIndex =
    (page - 1) * itemsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4 }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Campus Notifications
      </Typography>
      <Button
  component={Link}
  href="/priority"
  variant="contained"
  sx={{ mb: 2 }}
>
  Priority Notifications
</Button>

      <FormControl
        sx={{
          mb: 3,
          minWidth: 200,
        }}
      >
        <Select
          value={filter}
          onChange={(e) => {
            setFilter(
              e.target.value
            );
            setPage(1);
          }}
        >
          <MenuItem value="All">
            All
          </MenuItem>

          <MenuItem value="Placement">
            Placement
          </MenuItem>

          <MenuItem value="Result">
            Result
          </MenuItem>

          <MenuItem value="Event">
            Event
          </MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={2}>
        {paginatedNotifications.map(
          (notification: any) => (
            <Card
              key={
                notification.ID
              }
              onClick={() => {
                if (
                  !viewedIds.includes(
                    notification.ID
                  )
                ) {
                  setViewedIds([
                    ...viewedIds,
                    notification.ID,
                  ]);
                }
              }}
              sx={{
                cursor:
                  "pointer",
                backgroundColor:
                  viewedIds.includes(
                    notification.ID
                  )
                    ? "#f5f5f5"
                    : "#e8f5e9",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  {
                    notification.Type
                  }{" "}
                  {viewedIds.includes(
                    notification.ID
                  )
                    ? "(Viewed)"
                    : "(New)"}
                </Typography>

                <Typography>
                  {
                    notification.Message
                  }
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {
                    notification.Timestamp
                  }
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </Stack>

      <Pagination
        sx={{ mt: 4 }}
        page={page}
        onChange={(
          _,
          value
        ) =>
          setPage(value)
        }
        count={Math.ceil(
          filteredNotifications.length /
            itemsPerPage
        )}
      />
    </Container>
  );
}
import Link from "next/link";
import { Button } from "@mui/material";

