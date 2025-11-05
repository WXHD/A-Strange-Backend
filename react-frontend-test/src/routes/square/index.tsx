import { createFileRoute } from '@tanstack/react-router'

import SquarePage from '@pages/square'

export const Route = createFileRoute('/square/')({
  component: SquarePage,
});