import supabase, { supabaseUrl } from "./supabase";

// Function to get all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*"); // Select all cabins

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// Function to create or edit a cabin
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // Check if image path is valid

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  ); // Generate unique image name
  const imagePath = hasImagePath
    ? newCabin.image // Use existing image path
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // Create new image path

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // Insert new cabin

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); // Update existing cabin

  const { data, error } = await query.select().single(); // Get the created/updated cabin

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data; // Return if image path is valid

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id); // Delete cabin if image upload fails
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

// Function to delete a cabin by ID
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // Delete cabin

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
