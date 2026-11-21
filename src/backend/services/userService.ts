import { d1Client } from "@/backend/db/d1Client";

export interface UserCreateData {
  name: string;
  phone: string;
  password?: string;
  role?: "owner" | "driver";
  assigned_vehicle?: string;
  duty_status?: "Available" | "On Duty" | "Off Duty";
}

export const userService = {
  async getAllUsers() {
    const users = await d1Client.getUsers();
    return users.map((u) => ({
      id: u.id,
      name: u.name,
      phone: u.phone,
      email: u.email,
      role: u.role,
      assigned_vehicle: u.assigned_vehicle,
      duty_status: u.duty_status || "Available",
      created_at: u.created_at,
    }));
  },

  async updateDutyStatus(id: string, dutyStatus: "Available" | "On Duty" | "Off Duty") {
    if (!id || !dutyStatus) throw new Error("User ID and duty_status are required.");
    return d1Client.updateUserDutyStatus(id, dutyStatus);
  },

  async updateUser(id: string, updates: Partial<UserCreateData>) {
    if (!id) throw new Error("User ID is required.");
    return d1Client.updateUser(id, updates);
  },

  async createUser(data: UserCreateData) {
    if (!data.name || !data.phone || !data.password) {
      throw new Error("Missing required fields: name, phone, and password.");
    }
    return d1Client.createUser({
      name: data.name,
      phone: data.phone,
      password: data.password,
      role: data.role || "driver",
      assigned_vehicle: data.assigned_vehicle || "KA 08 UB 2026",
      duty_status: data.duty_status || "Available",
    });
  },

  async deleteUser(id: string) {
    return d1Client.deleteUser(id);
  },
};
