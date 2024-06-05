"use server"

import { revalidatePath } from "next/cache"

export async function playAgainAction() {
  revalidatePath("/")

  return null
}
