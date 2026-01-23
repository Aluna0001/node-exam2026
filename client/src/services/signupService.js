import { fetchRequestJson } from "../utils/fetch.js";
import { setAccount } from "../stores/auth.js";

export async function signup(username, email, password) {
  const response = await fetchRequestJson(
    "/auth/signup",
    { username, email, password },
    "POST",
  );

  if (!response.ok) {
    const error = await response.json();
    return { error: error.error || "Signup failed" };
  }

  const data = await response.json();

  setAccount(data.user);

  return { success: true, user: data.user };
}