import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/issues")({
  component: () => <Outlet />,
});
