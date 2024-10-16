import supabase, { supabaseUrl } from "./supabase";

// Function to sign up a new user
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

// Function to log in a user
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

// Function to get the current logged-in user
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null; // If no session, return null

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

// Function to log out the current user
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// Function to update current user's details
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password }; // Update password if provided
  if (fullName) updateData = { data: { fullName } }; // Update fullName if provided

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data; // Return data if no avatar is provided

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // Create unique avatar file name

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message); // Handle storage error

  // 3. Update avatar in the user profile
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`, // Set avatar URL
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}