import createClient from "@kyrocms/sdk";

export const kyroClient = createClient({
  apiKey: process.env.KYRO_CMS_API_KEY as string,
});
