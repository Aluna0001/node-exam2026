import { fetchRequestJson } from "../utils/fetch.js";
import { setAccount } from "../stores/auth.js";

export async function updateProfile(
  currentPassword,
  newPassword,
  birthdate,
  showZodiac,
) {
  const response = await fetchRequestJson(
    "/profile/update",
    {
      currentPassword,
      newPassword,
      birthdate,
      showZodiac,
    },
    "PUT",
  );

  if (!response.ok) {
    const error = await response.json();
    return { error: error.error || "Failed to update profile" };
  }

  const data = await response.json();

  const userWithZodiac = {
    ...data.user,
    zodiacSign: data.zodiacSign,
  };

  setAccount(userWithZodiac);

  return { success: true, user: userWithZodiac };
}

export async function deleteAccount() {
  const response = await fetchRequestJson("/profile/delete", {}, "DELETE");

  if (!response.ok) {
    const error = await response.json();
    return { error: error.error || "Failed to delete account" };
  }

  setAccount(null);

  return { success: true };
}
