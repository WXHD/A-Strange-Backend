import { createFileRoute } from '@tanstack/react-router'

import UserManagePage from '@pages/users'

export const Route = createFileRoute('/square/users')({
  component: UserManagePage,
});