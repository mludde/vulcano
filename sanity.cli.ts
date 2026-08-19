import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "vulcano-immobiliare",
  deployment: {
    appId: "m6s1w3xfmcy0c13vy0oj8560",
  },
});
