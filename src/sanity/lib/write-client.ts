import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Server-side only: needs a token with write access (Editor role).
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});
