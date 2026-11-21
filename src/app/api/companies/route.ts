import { NextRequest } from "next/server";
import { d1Client } from "@/backend/db/d1Client";
import { apiSuccess, apiError } from "@/backend/utils/apiResponse";
import { COMPANIES_SERVED } from "@/data/companiesServed";

export async function GET() {
  try {
    const dbCompanies = await d1Client.getClientCompanies();
    const companies = dbCompanies && dbCompanies.length > 0 ? dbCompanies : COMPANIES_SERVED.map((c) => ({
      id: c.id,
      name: c.name,
      industry: c.industry,
      location: c.location,
      logo_text: c.logoText,
      accent_color: c.accentColor,
      is_active: true,
    }));
    return apiSuccess({ count: companies.length, companies });
  } catch (err: any) {
    return apiError(err.message || "Failed to fetch client companies.", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, industry, location, logo_text, accent_color, is_active = true } = body;

    if (!name) {
      return apiError("Company name is required", 400);
    }

    const company = await d1Client.createClientCompany({
      name,
      industry: industry || "Corporate",
      location: location || "Bengaluru Campus",
      logo_text: logo_text || name.split(" ")[0].toUpperCase(),
      accent_color: accent_color || "#0288d1",
      is_active: Boolean(is_active),
    });

    return apiSuccess({ company }, 201);
  } catch (err: any) {
    return apiError(err.message || "Failed to add client company.", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return apiError("Company id is required", 400);
    }

    const success = await d1Client.deleteClientCompany(id);
    return apiSuccess({ success });
  } catch (err: any) {
    return apiError(err.message || "Failed to remove client company.", 500);
  }
}
