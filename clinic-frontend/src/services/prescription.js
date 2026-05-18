import api from "@/services/api";

export async function getPrescriptions() {
  const { data } = await api.get("/prescriptions");
  return data;
}

export async function createPrescription(payload) {
  const { data } = await api.post("/prescriptions", payload);
  return data;
}

export async function getAiSuggestion(payload) {
  const { data } = await api.post("/ai/check", payload);
  return data;
}

export async function getAiHistory() {
  const { data } = await api.get("/ai/history");
  return data;
}
