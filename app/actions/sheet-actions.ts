"use server";

import { saveToSheet as saveToSheetHelper } from "@/lib/sheets";

export async function saveOrderToSheet(formData: FormData) {
  const orderData = JSON.parse(formData.get("orderData") as string);
  return saveToSheetHelper({ orderData });
}
