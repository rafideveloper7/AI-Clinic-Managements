import api from "@/services/api";

export async function getAppointments() {
  const { data } = await api.get("/appointments");
  return data;
}

export async function getDoctorAppointments() {
  const { data } = await api.get("/appointments/doctor");
  return data;
}

export async function createAppointment(payload) {
  const { data } = await api.post("/appointments", payload);
  return data;
}

export async function updateAppointment(id, payload) {
  const { data } = await api.put(`/appointments/${id}`, payload);
  return data;
}
