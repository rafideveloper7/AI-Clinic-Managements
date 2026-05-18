import api from "@/services/api";

export async function getDoctors() {
  const { data } = await api.get("/users/doctors");
  return data;
}

export async function getAdminPatients() {
  const { data } = await api.get("/users/patients");
  return data;
}

export async function getReceptionists() {
  const { data } = await api.get("/users/receptionists");
  return data;
}

export async function createDoctorAccount(payload) {
  const { data } = await api.post("/users/doctors", payload);
  return data;
}

export async function updateDoctorAccount(id, payload) {
  const { data } = await api.put(`/users/doctors/${id}`, payload);
  return data;
}

export async function deleteDoctorAccount(id) {
  const { data } = await api.delete(`/users/doctors/${id}`);
  return data;
}

export async function createReceptionistAccount(payload) {
  const { data } = await api.post("/users/receptionists", payload);
  return data;
}

export async function updateReceptionistAccount(id, payload) {
  const { data } = await api.put(`/users/receptionists/${id}`, payload);
  return data;
}

export async function deleteReceptionistAccount(id) {
  const { data } = await api.delete(`/users/receptionists/${id}`);
  return data;
}

export async function createPatientAccount(payload) {
  const { data } = await api.post("/users/patients", payload);
  return data;
}

export async function updateUserPlan(id, plan) {
  const { data } = await api.put(`/users/${id}/plan`, { plan });
  return data;
}
