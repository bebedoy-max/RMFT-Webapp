export async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: hanya admin.");
}

export function toEmail(username: string) {
  const v = username.trim().toLowerCase();
  return v.includes("@") ? v : `${v}@app.local`;
}
