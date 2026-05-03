const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  client: string;
  services: string[];
  tags: string[];
  year: string;
  videoFile: string;
  thumbnailFile: string;
  is_nda: number;
  is_featured: number;
  status: 'draft' | 'published';
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function thumbnailUrl(id: number): string {
  return `${API_URL}/thumbnail.php?id=${id}`;
}

export function videoUrl(id: number): string {
  return `${API_URL}/video.php?id=${id}`;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/api/videos.php`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchCategories(): Promise<{ id: number; name: string; slug: string }[]> {
  const res = await fetch(`${API_URL}/api/categories.php`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_URL}/api/messages.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error((data as { error?: string }).error ?? 'Failed to send message');
  }
}
