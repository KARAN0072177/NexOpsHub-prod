import { ProtectedGuard } from "@/components/auth/ProtectedGuard";

export default function DashboardPage() {
  return (
    <ProtectedGuard>
      Dashboard
    </ProtectedGuard>
  );
}