"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, FileText, MapPin, Phone, Send } from "lucide-react";
import sponsorshipData from "@/data/sponsorship.json";
import companyData from "@/data/company.json";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { RevealInView } from "@/components/ui/MotionPrimitives";

interface FormState {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  partnershipType: string;
  message: string;
  websiteHoneypot: string;
}

const INITIAL_FORM: FormState = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  industry: "banking-fintech",
  partnershipType: "main-season",
  message: "",
  websiteHoneypot: "",
};

export function SponsorshipSection() {
  const { locale } = useLanguage();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/sponsorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(
          data.error ||
            (locale === "ar"
              ? "يرجى التحقق من البيانات المدخلة والمحاولة مجدداً."
              : "Please check your details and try again.")
        );
      } else {
        setSubmitted(true);
        setForm(INITIAL_FORM);
      }
    } catch {
      setErrorMsg(
        locale === "ar"
          ? "حدث خطأ في الاتصال. يمكنك التواصل مباشرة عبر أرقام ProMedia."
          : "Network error. Please reach out directly via ProMedia phone lines."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="sponsorship"
      aria-labelledby="sponsorship-heading"
      className="bg-[#FAF7F2] py-16 text-[#090C16] sm:py-20 lg:py-24"
    >
      <div className="editorial-container">
        {/* Header */}
        <RevealInView className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#B85400] sm:text-sm">
            {sponsorshipData.eyebrow[locale]}
          </p>
          <h2
            id="sponsorship-heading"
            className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-[#090C16] sm:text-3xl lg:text-4xl"
          >
            {sponsorshipData.headline[locale]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#3B4459] sm:text-lg">
            {sponsorshipData.subheadline[locale]}
          </p>
        </RevealInView>

        {/* Why Partner with TURKEYA */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sponsorshipData.whyPartner.map((item, idx) => (
            <RevealInView key={item.id} delay={idx * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-5">
                <span className="tabular-nums text-xs font-bold text-[#2F3B8E]">
                  0{idx + 1}
                </span>
                <h3 className="mt-3 text-base font-bold text-[#090C16]">
                  {item.title[locale]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3B4459]">
                  {item.description[locale]}
                </p>
              </article>
            </RevealInView>
          ))}
        </div>

        {/* 7 Sponsorship Tiers & Brand Integration Formats */}
        <RevealInView className="mt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-xl font-extrabold text-[#090C16] sm:text-2xl">
              {locale === "ar"
                ? "باقات الرعاية وفرص التكامل الإعلاني"
                : "Sponsorship Tiers & Brand Integration Formats"}
            </h3>
            <p className="text-xs font-medium text-[#5A647A]">
              {sponsorshipData.pricingPolicy[locale]}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sponsorshipData.tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex flex-col rounded-2xl border border-[#090C16]/10 bg-[#FFFFFF] p-5 transition-colors hover:border-[#2F3B8E]/40"
              >
                <h4 className="text-base font-bold text-[#2F3B8E]">
                  {tier.title[locale]}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#3B4459]">
                  {tier.summary[locale]}
                </p>
              </div>
            ))}
          </div>
        </RevealInView>

        {/* Inquiry Form + Direct Business Contact Pathways */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Commercial Inquiry Form */}
          <RevealInView className="lg:col-span-7">
            <div className="rounded-2xl border border-[#090C16]/12 bg-[#FFFFFF] p-6 shadow-xs sm:p-8">
              <h3 className="text-xl font-extrabold text-[#090C16]">
                {locale === "ar"
                  ? "طلب عرض رعاية أو شراكة تجارية"
                  : "Request a Sponsorship & Partnership Proposal"}
              </h3>
              <p className="mt-1.5 text-sm text-[#5A647A]">
                {locale === "ar"
                  ? "املأ البيانات التالية وسيتواصل معك فريق تطوير الأعمال في ProMedia خلال يومي عمل."
                  : "Share your campaign details and the ProMedia business development team will respond within two business days."}
              </p>

              {submitted ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-emerald-600/25 bg-emerald-50 p-5 text-emerald-950"
                >
                  <div className="flex items-center gap-2.5 font-bold">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                    <span>
                      {locale === "ar"
                        ? "تم استلام طلب الشراكة بنجاح"
                        : "Partnership Inquiry Received"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">
                    {locale === "ar"
                      ? "شكراً لتواصلك مع فريق ProMedia. سيتم مراجعة طلبك والتواصل معك قريباً."
                      : "Thank you for contacting ProMedia. Our commercial team will review your inquiry and follow up shortly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 min-h-[44px] rounded-lg bg-[#090C16] px-4 text-xs font-bold text-[#FFFFFF]"
                  >
                    {locale === "ar" ? "إرسال طلب آخر" : "Send Another Inquiry"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  {/* Honeypot anti-spam field */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="websiteHoneypot">Website</label>
                    <input
                      id="websiteHoneypot"
                      name="websiteHoneypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.websiteHoneypot}
                      onChange={(e) =>
                        setForm({ ...form, websiteHoneypot: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "اسم الشركة / المؤسسة *" : "Company / Brand Name *"}
                      </label>
                      <input
                        id="companyName"
                        type="text"
                        required
                        value={form.companyName}
                        onChange={(e) =>
                          setForm({ ...form, companyName: e.target.value })
                        }
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactPerson"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "الاسم الكامل *" : "Contact Person *"}
                      </label>
                      <input
                        id="contactPerson"
                        type="text"
                        required
                        value={form.contactPerson}
                        onChange={(e) =>
                          setForm({ ...form, contactPerson: e.target.value })
                        }
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "البريد الإلكتروني المهني *" : "Business Email *"}
                      </label>
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        required
                        dir="ltr"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "رقم الهاتف *" : "Phone Number *"}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        required
                        dir="ltr"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "القطاع" : "Industry"}
                      </label>
                      <select
                        id="industry"
                        value={form.industry}
                        onChange={(e) =>
                          setForm({ ...form, industry: e.target.value })
                        }
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      >
                        {sponsorshipData.industries.map((ind) => (
                          <option key={ind.value} value={ind.value}>
                            {ind.label[locale]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="partnershipType"
                        className="block text-xs font-bold text-[#090C16]"
                      >
                        {locale === "ar" ? "نوع الشراكة المطلوبة" : "Partnership Type"}
                      </label>
                      <select
                        id="partnershipType"
                        value={form.partnershipType}
                        onChange={(e) =>
                          setForm({ ...form, partnershipType: e.target.value })
                        }
                        className="mt-1.5 min-h-[46px] w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] px-3.5 text-sm text-[#090C16]"
                      >
                        {sponsorshipData.tiers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.title[locale]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold text-[#090C16]"
                    >
                      {locale === "ar" ? "تفاصيل الحملة أو الرسالة *" : "Campaign Brief / Message *"}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-[#090C16]/15 bg-[#FAF7F2] p-3.5 text-sm text-[#090C16]"
                    />
                  </div>

                  {errorMsg && (
                    <p role="alert" className="text-xs font-bold text-red-700">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#FE7C01] px-6 text-sm font-bold text-[#090C16] transition-colors hover:bg-[#e56d00] disabled:opacity-60 sm:w-auto"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {submitting
                        ? locale === "ar"
                          ? "جاري الإرسال..."
                          : "Sending..."
                        : locale === "ar"
                          ? "إرسال طلب الشراكة"
                          : "Submit Partnership Inquiry"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </RevealInView>

          {/* Direct Business Contact Pathways + Media Kit */}
          <RevealInView className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-[#090C16] p-6 text-[#F8FAFC] sm:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#F0C188]">
                  {locale === "ar" ? "التواصل التجاري المباشر" : "Direct Commercial Desk"}
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-[#FFFFFF]">
                  {locale === "ar" ? "فريق الشراكات في ProMedia" : "ProMedia Partnerships Team"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                  {locale === "ar"
                    ? "للاستفسارات العاجلة من الشركات والوكالات الإعلانية، يمكنكم التواصل مباشرة عبر خطوط ProMedia الرسمية أو استعراض الملف الإعلامي القابل للطباعة."
                    : "For corporate sponsors and media agencies seeking immediate alignment, contact ProMedia Group directly or download our executive Media Kit."}
                </p>

                <div className="mt-6 space-y-4 border-t border-[var(--border-dark)] pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FE7C01]" aria-hidden="true" />
                    <div className="flex flex-col gap-1" dir="ltr">
                      {companyData.contact.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="font-semibold text-[#FFFFFF] hover:text-[#F0C188]"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FE7C01]" aria-hidden="true" />
                    <div>
                      <p className="text-[#E2E8F0]">{companyData.contact.address[locale]}</p>
                      <p className="mt-1 text-xs text-[#94A3B8]">
                        {companyData.contact.hours[locale]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#F0C188]/25 bg-[#111629] p-5">
                <p className="text-sm font-bold text-[#FFFFFF]">
                  {locale === "ar" ? "الملف الإعلامي التنفيذي (Media Kit)" : "Executive Media Kit (PDF)"}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#B8C2D8]">
                  {locale === "ar"
                    ? "يتضمن نبذة البرنامج، قائمة الضيوف، سيرة مقدم البرنامج، بيانات ProMedia، وباقات الرعاية في نسخة مهيأة للطباعة والحفظ كملف PDF."
                    : "Includes show overview, guest roster, host credentials, ProMedia profile, and sponsorship formats ready for PDF export."}
                </p>
                <Link
                  href="/media-kit"
                  className="mt-4 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2F3B8E] px-4 text-xs font-bold text-[#FFFFFF] transition-colors hover:bg-[#3c4bb0]"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {locale === "ar" ? "فتح / تحميل الملف الإعلامي" : "Open / Download Media Kit"}
                  </span>
                </Link>
              </div>
            </div>
          </RevealInView>
        </div>
      </div>
    </section>
  );
}
