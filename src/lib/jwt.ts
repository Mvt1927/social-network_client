import jwt from "jsonwebtoken";


export function isValidToken(token: string): jwt.JwtPayload | boolean {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") {
      return false;
    }
    return decoded;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false;
  }
}

export function getExp(token: string): number | null {
  const decoded = isValidToken(token);
  if (decoded && typeof decoded === "object") {
    return decoded.exp || null;
  }
  return null;
}

export function isTokenExpired(token: string): boolean {
  const exp = getExp(token);
  if (!exp) {
    return true;
  }
  return Date.now() >= exp * 1000;
}
