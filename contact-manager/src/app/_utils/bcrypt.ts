import bcrypt from "bcryptjs";

export async function createHash(password: string) {
  const saltRounds = await bcrypt.genSalt(10);
  return bcrypt.hash(password, saltRounds);
}
