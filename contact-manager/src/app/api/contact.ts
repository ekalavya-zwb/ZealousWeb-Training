import axios from "axios";
import { Contact } from "../_types/contact";

type ContactPayload = Omit<Contact, "id">;

const API_URL = "http://localhost:3001";

export async function getContacts(userId: string) {
  const response = await axios.get(`${API_URL}/contacts?userId=${userId}`);
  return response.data;
}

export async function getContactById(id: string) {
  const response = await axios.get(`${API_URL}/contacts/${id}`);
  return response.data[0];
}

export async function getContactBySlug(slug: string) {
  const response = await axios.get(`${API_URL}/contacts?slug=${slug}`);
  return response.data[0];
}

export async function getContactByEmail(userId: string, email: string) {
  const response = await axios.get(
    `${API_URL}/contacts?userId=${userId}&email=${email}`,
  );
  return response.data[0];
}

export async function createContact(contactData: ContactPayload) {
  const response = await axios.post(`${API_URL}/contacts`, contactData);
  return response.data;
}

export async function updateContact(id: string, contactData: ContactPayload) {
  const response = await axios.put(`${API_URL}/contacts/${id}`, contactData);
  return response.data;
}

export async function deleteContact(id: string) {
  const response = await axios.delete(`${API_URL}/contacts/${id}`);
  return response.data;
}
