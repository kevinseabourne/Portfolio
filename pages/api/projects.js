import http from "./httpService";

export async function getAllProjects() {
  try {
    const response = await http.get(process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT);
    return response;
  } catch (ex) {}
}
