import { Button } from "@/app/_components/Button";
import { Container } from "@/app/_components/Container";
import { Section } from "@/app/_components/Section";
import Image from "next/image";

export function HeroSection() {
    return (
        <Section size="sm">
            <Container>
                <div className="grid items-center gap-12 md:grid-cols-2">

                    {/* IMAGE */}
                    <div className="flex justify-center md:justify-end order-1 md:order-2">

                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full" />
                            {/*<Image
                                src="/Yo-min.jpg"
                                alt="Demian Adam"
                                fill
                                className="relative object-cover rounded-2xl border border-white/10"
                                priority
                            />*/}
                        </div>
                    </div>

                    {/* TEXT */}
                    <div className="space-y-8 text-center md:text-left order-2 md:order-1">
                        <p className="text-sm font-medium text-brand-primary">
                            Portfolio · Desarrollo FullStack · Mentorías
                        </p>

                        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                            Hola, soy Demian Adam.
                            <br />
                            Profesor de{" "}
                            <span className="text-brand-primary">
                                Programación
                            </span>
                            <br />
                            y Desarrollador FullStack.
                        </h1>

                        <p className="text-lg text-ui-text/70">
                            Acompaño a estudiantes y desarrolladores a comprender
                            programación desde la base hasta la arquitectura de sistemas reales.
                            <br /><br />
                            Trabajo principalmente con .NET en backend, y tengo experiencia
                            fullstack en JavaScript, React, Next.js, SQL y lenguajes
                            como C y C++.
                        </p>

                        <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                            <Button size="lg">
                                Ver Proyectos
                            </Button>

                            <Button variant="secondary" size="lg">
                                Reservar Clase
                            </Button>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
}