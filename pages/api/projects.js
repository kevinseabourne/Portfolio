import http from "./httpService";

export async function getAllProjects() {
  const response = await http.get(process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT);
  return response;
}
