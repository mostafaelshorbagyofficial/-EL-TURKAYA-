import { NextResponse } from "next/server";

interface SponsorshipPayload {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  industry?: string;
  partnershipType?: string;
  message?: string;
  websiteHoneypot?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SponsorshipPayload;

    // Silent accept for spam honeypot traps
    if (body.websiteHoneypot && body.websiteHoneypot.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const companyName = body.companyName?.trim() || "";
    const contactPerson = body.contactPerson?.trim() || "";
    const email = body.email?.trim() || "";
    const phone = body.phone?.trim() || "";
    const message = body.message?.trim() || "";

    if (!companyName || !contactPerson || !email || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "All required fields must be completed." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 4000) {
      return NextResponse.json(
        {
          ok: false,
          error: "Message should be between 10 and 4000 characters.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        receivedAt: new Date().toISOString(),
        referenceId: `TRK-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
