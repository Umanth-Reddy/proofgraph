import { notFound } from "next/navigation";
import { RoleHome } from "../../../components/role-home";
import { isRole } from "../../../lib/config";

export default async function RoleHomePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  if (!isRole(role)) notFound();
  return <RoleHome role={role} />;
}
