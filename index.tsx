import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Emblem } from "@/components/Emblem";
import { GoldHeading, GoldName, Section, StatusBadge } from "@/components/ui-bits";
import { BOARD, EVENTS, MEMBERS, MISSION, MOTTO, OBJECTIVES, ORG, TAGLINES, formatDate } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { useLoginModal } from "@/lib/login-modal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Astrologer's Right Protection Organisation | தென்னிந்திய ஜோதிடர் நல சங்கம்" },
      {
        name: "description",
        content:
          "Registered welfare association of South Indian hereditary astrologers. Member directory, welfare support, events and subscription management.",
      },
      { property: "og:title", content: "Astrologer's Right Protection Organisation" },
      {
        property: "og:description",
        content: "Unity, knowledge and growth for South Indian hereditary astrologers. Reg. No. 200/2024.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { lang, t } = useLang();
  const { openLogin } = useLoginModal();
  const activeCount = MEMBERS.filter((m) => m.status === "paid").length;

  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-gold">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t({ ta: "பதிவு எண். 200/2024", en: "Reg. No. 200/2024" })}
            </span>
            <h1 className="gold-title mt-5 text-3xl leading-tight md:text-5xl">{ORG.nameTa}</h1>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground md:text-base">
              {ORG.nameEn}
            </p>
            <hr className="rule-gold my-6" />
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t(MISSION)}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openLogin("join")}
                className="inline-flex items-center gap-2 rounded-full border-2 border-gold bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-primary-foreground transition-all hover:bg-maroon hover:text-gold"
              >
                <Users className="h-4 w-4" />
                {t({ ta: "உறுப்பினராகச் சேரவும்", en: "Become a Member" })}
              </button>
              <Link
                to="/directory"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
              >
                {t({ ta: "உறுப்பினர் பட்டியல்", en: "Member Directory" })}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{lang === "ta" ? ORG.regTa : ORG.regEn}</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Emblem size={230} priority className="md:h-[280px] md:w-[280px]" />
            <div className="panel w-full p-5 text-center">
              <p className="gold-title text-lg leading-snug">{t(MOTTO)}</p>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gold/40 bg-maroon/70 py-3">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-2 px-4 text-center text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
            {TAGLINES.map((tag) => (
              <span key={tag.en} className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { value: `${MEMBERS.length}+`, label: { ta: "பதிவு செய்த உறுப்பினர்கள்", en: "Registered members" } },
            { value: `${activeCount}`, label: { ta: "செயலில் உள்ள சந்தாக்கள்", en: "Active subscriptions" } },
            { value: `${EVENTS.length}`, label: { ta: "வரும் நிகழ்வுகள்", en: "Upcoming events" } },
          ].map((stat) => (
            <div key={stat.label.en} className="panel panel-hover p-6 text-center">
              <p className="gold-title text-3xl">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {t(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <GoldHeading ta="சங்கத்தின் நோக்கங்கள்" en="Our Objectives" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {OBJECTIVES.map((obj, i) => (
            <div key={obj.en} className="panel panel-hover flex gap-4 p-5">
              <span className="gold-name shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-foreground">{t(obj)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <GoldHeading ta="நிர்வாகக் குழு" en="Governing Board" align="center" className="mx-auto" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BOARD.map((person) => (
            <div key={person.role.en} className="panel panel-hover p-5 text-center">
              <img
                src={person.photo}
                alt={t(person.name)}
                loading="lazy"
                className="mx-auto h-24 w-24 rounded-full border-[3px] border-gold object-cover"
              />
              <div className="mt-4">
                <GoldName className="text-sm">{t(person.name)}</GoldName>
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-foreground">{t(person.role)}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-gold" />
                {t(person.location)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <GoldHeading ta="வரும் நிகழ்வுகள்" en="Upcoming Events" />
          <Link
            to="/events"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t({ ta: "அனைத்தும்", en: "View all" })}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {EVENTS.slice(0, 3).map((e) => (
            <article key={e.id} className="panel panel-hover p-5">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-gold">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(e.date, lang)}
              </p>
              <h3 className="gold-title mt-3 text-lg leading-snug">{t(e.title)}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{t(e.location)}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">{t(e.description)}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <GoldHeading ta="உறுப்பினர்கள்" en="Featured Members" />
          <Link
            to="/directory"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            {t({ ta: "முழு பட்டியல்", en: "Full directory" })}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.slice(0, 4).map((m) => (
            <div key={m.id} className="panel panel-hover p-5 text-center">
              <img
                src={m.photo}
                alt={t(m.name)}
                loading="lazy"
                className="mx-auto h-20 w-20 rounded-full border-[3px] border-gold object-cover"
              />
              <div className="mt-4">
                <GoldName className="text-sm">{t(m.name)}</GoldName>
              </div>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                {t(m.specialization)}
              </p>
              <div className="mt-3 flex justify-center">
                <StatusBadge status={m.status} />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
