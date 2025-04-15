import axios from "axios";

const appUrl = import.meta.env.VITE_APP_URL;

export async function getPosts() {
  return await axios.get(`${appUrl}/api/posts/`);
}

export async function getSinglePost(id: string) {
  return await axios.get(`${appUrl}/api/posts/${id}`);
}

export async function createPost(data: FormData) {
  return await axios.post(`${appUrl}/api/posts/`, data);
}

export async function updatePost(
  id: string,
  data: {
    title: string;
    content: string;
    published: boolean;
  }
) {
  return await axios.put(`${appUrl}/api/posts/${id}`, { ...data });
}

export async function deletePost(id: string) {
  return await axios.delete(`${appUrl}/api/posts/${id}`);
}
