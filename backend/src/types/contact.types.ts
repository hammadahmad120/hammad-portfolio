export type ContactSubmissionListItem = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
};

export type PaginatedContactSubmissions = {
  items: ContactSubmissionListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  days: number;
};
