"use client";

import { changeUserRole } from "@/actions";
import type { User } from "@/interfaces";

interface Props {
  users: User[];
}

export const UsersTable = ({ users }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-white/10">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
            >
              Nombre completo
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-[11px] font-medium tracking-[0.16em] text-white/40 uppercase"
            >
              Rol
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-white/10 transition-colors hover:bg-white/5"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                {user.email}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                <select
                  value={user.role}
                  onChange={(e) => changeUserRole(user.id, e.target.value)}
                  className="field max-w-40"
                >
                  <option value="admin" className="bg-void text-white">
                    Admin
                  </option>
                  <option value="user" className="bg-void text-white">
                    Cliente
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
