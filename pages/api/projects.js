import http from "./httpService";

export async function getAllProjects() {
  const response = await http.get(process.env.FIREBASE_ENDPOINT);
  return response;
}
