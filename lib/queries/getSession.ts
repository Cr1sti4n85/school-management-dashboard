import { auth } from "@clerk/nextjs/server";

export const getSessionObj = async (): Promise<{
  userId: string | null;
  role: string;
}> => {
  const { sessionClaims, userId } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return {
    userId,
    role,
  };
};
