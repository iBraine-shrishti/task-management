import { UsersRound } from "lucide-react";

export default function EmployeeManagement() {
  return (
    <section className="card p-6">
      <UsersRound className="text-ibraine-blue" size={24} />
      <h1 className="mt-4 text-2xl font-extrabold">Employee Management</h1>
      <p className="mt-2 text-sm text-gray-500">
        This is the Super Admin area for managing employees, access, and roles.
      </p>
    </section>
  );
}
