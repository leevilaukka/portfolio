import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xbwio4d9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});