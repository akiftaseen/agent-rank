import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";

export const Route = createFileRoute("/app/intents")({
  component: function IntentsLayout() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    if (pathname !== "/app/intents") return <Outlet />;
    return <Outlet />;
  },
});
