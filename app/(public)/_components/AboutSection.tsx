import { Container } from "@/app/_components/Container";
import { Section } from "@/app/_components/Section";
import { SectionHeader } from "@/app/_components/SectionHeader";

export function AboutSection() {
  const highlights = [
    "5+ años enseñando programación",
    "Experiencia en proyectos reales",
    "Especialización en backend y arquitectura",
    "Mentorías personalizadas 1 a 1",
  ];

  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-2 items-start">

          {/* LEFT */}
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Sobre mí"
              title="Desarrollo software real. Enseño programación real."
            />

            <p className="text-ui-text/70">
              Trabajo profesionalmente construyendo sistemas backend y aplicaciones completas.
              Mi enfoque como profesor no se basa en repetir ejercicios, sino en enseñar a pensar,
              estructurar y comprender cómo funcionan los sistemas en el mundo real.
            </p>

            <p className="text-ui-text/70">
              Trabajo principalmente con .NET en backend, y tengo experiencia fullstack en
              JavaScript, React, Next.js y SQL, además de fundamentos sólidos en C y C++.
            </p>

            <p className="text-ui-text/70">
              Las mentorías son 1 a 1, enfocadas en comprensión profunda, arquitectura
              y resolución de problemas reales.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex h-full justify-center items-center">
            <ul className="divide-y divide-white/5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-4 py-6"
                >
                  <div className="h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(212,154,53,0.6)] transition-all duration-300 group-hover:scale-125" />                  <p className="text-ui-text/70 transition-colors duration-300 group-hover:text-ui-text">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Container>
    </Section>
  );
}