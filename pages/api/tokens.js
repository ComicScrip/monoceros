import { getToken } from "next-auth/jwt";
import { getTokensFromCredentials } from "../../lib/monocerosAPI";

export default async function handleGetTokens(req, res) {
  const { credentials } = await getToken({ req });
  if (!credentials) return res.status(401).send("unauthorized");
  res.send(await getTokensFromCredentials(credentials));
}
