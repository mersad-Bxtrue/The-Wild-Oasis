import supabase from "./supabase";

// Function to get settings
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    throw new Error("Settings could not be loaded");
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting) // Update settings with new values
    .eq("id", 1)
    .single(); // Target the settings row with ID=1

  if (error) {
    throw new Error("Settings could not be updated");
  }
  return data;
}
