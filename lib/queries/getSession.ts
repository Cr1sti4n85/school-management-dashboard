import { auth } from "@clerk/nextjs/server";

export const getSessionRole = async (): Promise<string | undefined> => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return role;
};
