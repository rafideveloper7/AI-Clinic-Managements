import api from "@/services/api";

export async function getPatients() {
  const { data } = await api.get("/patients");
  return data;
}

export async function createPatient(payload) {
  const { data } = await api.post("/patients", payload);
  return data;
}

export async function updatePatient(id, payload) {
  const { data } = await api.put(`/patients/${id}`, payload);
  return data;
}

export async function deletePatient(id) {
  const { data } = await api.delete(`/patients/${id}`);
  return data;
}
