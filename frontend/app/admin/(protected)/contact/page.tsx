import type { Metadata } from "next";
import { ContactSubmissionsList } from "@/components/admin/ContactSubmissionsList";

export const metadata: Metadata = {
  title: "Contact Submissions",
};

export default function AdminContactPage() {
  return <ContactSubmissionsList />;
}
