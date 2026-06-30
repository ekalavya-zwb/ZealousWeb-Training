"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "../lib/session";
import { prisma } from "../lib/prisma";
import { contactSchema } from "../lib/zodSchemas";
import { ContactActionState } from "../_types/contactActionState";

export async function createContactAction(
  previousState: ContactActionState,
  contactData: FormData,
): Promise<ContactActionState> {
  const user = await getSession();

  if (!user) {
    return { error: "User must be logged in to create a contact" };
  }

  const rawData = {
    name: contactData.get("name"),
    email: contactData.get("email"),
  };

  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
  }

  const { name, email } = validationResult.data;

  const existingContact = await prisma.contact.findFirst({
    where: {
      userId: user.id,
      email: email,
    },
  });

  if (existingContact) {
    return { error: "A contact with this email already exists" };
  }

  const payload = {
    name,
    email,
    userId: user.id,
  };

  try {
    await prisma.contact.create({
      data: payload,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    return { error: "Error creating contact" };
  }

  revalidatePath("/contacts");
  return { success: "Contact created successfully" };
}

export async function editContactAction(
  previousState: ContactActionState,
  contactData: FormData,
): Promise<ContactActionState> {
  const user = await getSession();

  if (!user) {
    return { error: "User must be logged in to edit a contact" };
  }

  const id = contactData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Invalid contact ID" };
  }

  const rawData = {
    name: contactData.get("name"),
    email: contactData.get("email"),
  };

  const validationResult = contactSchema.safeParse(rawData);

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
  }

  const { name, email } = validationResult.data;

  const existingContact = await prisma.contact.findFirst({
    where: {
      userId: user.id,
      email: email,
    },
  });

  if (existingContact && existingContact.id !== id) {
    return { error: "A contact with this email already exists" };
  }

  const payload = {
    name,
    email,
  };

  try {
    const updateResult = await prisma.contact.updateMany({
      where: { id, userId: user.id },
      data: payload,
    });

    if (updateResult.count === 0) {
      return {
        error: "Contact not found or you do not have permission to edit it",
      };
    }
  } catch (error) {
    console.error("Error editing contact:", error);
    return { error: "Error editing contact" };
  }

  revalidatePath("/contacts");
  return { success: "Contact updated successfully" };
}

export async function deleteContactAction(contactData: FormData) {
  const user = await getSession();

  if (!user) {
    throw new Error("User must be logged in to delete a contact");
  }

  const id = contactData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Invalid contact ID" };
  }

  try {
    const deleteResult = await prisma.contact.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    if (deleteResult.count === 0) {
      throw new Error(
        "Contact not found or you do not have permission to delete it",
      );
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Error deleting contact");
  }

  revalidatePath("/contacts");
}
