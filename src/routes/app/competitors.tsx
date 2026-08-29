import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/competitors")({
  component: () => <Outlet />,
});
