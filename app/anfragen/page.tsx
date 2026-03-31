import type { Metadata } from "next";
import Konfigurator from "./Konfigurator";

export const metadata: Metadata = {
  title: "Projekt anfragen — Websight",
  description:
    "Konfiguriere dein Projekt, erhalte eine Kostenschätzung und starte unverbindlich durch.",
};

export default function AnfragenPage() {
  return <Konfigurator />;
}
