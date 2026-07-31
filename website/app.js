const header = document.querySelector("[data-elevates]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const tabButtons = [...document.querySelectorAll(".tab-button")];
const tabPanels = [...document.querySelectorAll(".tab-panel")];
const langButtons = [...document.querySelectorAll(".lang-button")];
const textNodes = [...document.querySelectorAll("[data-i18n]")];
const metaDescription = document.querySelector('meta[name="description"]');

const translations = {
  de: {
    document_title: "SolidState Audio Platform | Raw PCM transport ohne Umweg",
    document_description:
      "SolidState Audio Platform transportiert Raw PCM ueber IP, mit Bit-perfect-Transport, Discovery, Statuskanal und vielen Integrationspfaden fuer Hi-Res-Systeme.",
    brand_title: "SolidState",
    brand_subtitle: "Audio Plattform",
    nav_overview: "Überblick",
    nav_features: "Funktionen",
    nav_integration: "Integration",
    nav_evidence: "Evidenz",
    nav_resources: "Ressourcen",
    made_germany_badge: "Made in Germany",
    hero_eyebrow: "RAW PCM TRANSPORT / SYSTEMPLATTFORM",
    hero_title: "Audio bewegen, wie es gemacht wurde.",
    hero_text:
      "SolidState hält die Transportschicht low-level und vorhersehbar, während Raw PCM durchs Netz wandert. Discovery, Diagnose und Rückkanal-Status sind eingebaut. Die Plattform bleibt offen für viele Integrationspfade: Musikserver, eingebettete Sinks, DAC-Bridges, Lab-Rigs und Partner-Firmware.",
    hero_subcopy:
      "Für Hi-Res gemacht. Made in Germany. USB Audio Class ist ein möglicher Eingang, nicht die Produktidentität.",
    cta_features: "Funktionen ansehen",
    cta_integration: "Integration erkunden",
    cta_evidence: "Evidenz öffnen",
    cta_waterfall: "Waterfall Demo",
    badge_bitperfect: "Bit-perfect by design",
    badge_hires: "Made for Hi-Res",
    badge_noresample: "No resampling",
    badge_multiintegration: "Multi-Integration",
    badge_status: "Return-channel status",
    signal_label: "DER SIGNALPFAD",
    signal_title: "Signalpfad / Signal Path",
    sources_title: "Quellen",
    source_1: "USB Audio Class Eingang",
    source_2: "Musikserver",
    source_3: "Eigene App / Capture-Rig",
    source_4: "Live Input / Lab-Feed",
    platform_title: "Plattform",
    platform_1: "Bit-perfect transport",
    platform_2: "Discovery & topology",
    platform_3: "Rückkanal-Status",
    platform_4: "Diagnose & Telemetrie",
    platform_5: "Protokollverwaltung",
    platform_6: "Security & integrity",
    endpoints_title: "Endpunkte",
    endpoint_1: "DACs",
    endpoint_2: "Receiver",
    endpoint_3: "AV-Hosts",
    endpoint_4: "Netzwerkplayer",
    endpoint_5: "OEM-Systeme",
    legend_audio: "Audio (PCM)",
    legend_control: "Steuerung / Discovery",
    legend_status: "Status / Telemetrie",
    feature_eyebrow: "FEATURES / FUNKTIONEN",
    feature_title: "Built for Hi-Res chains, engineered for proof.",
    feature_intro:
      "Die Seite verkauft keine Box. Sie verkauft die Plattform-Features, die ein Audio-System verständlich, integrierbar und messbar machen.",
    feature1_title: "Bit-perfect transport",
    feature1_text: "PCM bleibt Raw PCM. Keine Kompression, kein DSP, kein verstecktes Reframing.",
    feature2_title: "Made for Hi-Res",
    feature2_text: "Gedacht für 44.1 / 48 / 96 / 192 kHz Zielketten und klare Formatregeln.",
    feature3_title: "Discovery ready",
    feature3_text: "Kompatible Endpunkte sichtbar machen, statt sie hard-coded zu verstecken.",
    feature4_title: "Status channel",
    feature4_text: "Buffer, Jitter, Loss und Clock-Infos gehen im Takt zurück an die Quelle.",
    feature5_title: "Flexible deployment",
    feature5_text: "Linux, embedded targets, Receiver-Services und browsernahe Sicht auf einen Stack.",
    feature6_title: "Evidence trail",
    feature6_text: "Hash-Proofs, Tests, Traceability und Release-Doku statt Marketing-Nebel.",
    integration_eyebrow: "INTEGRATION / INTEGRATION",
    integration_title: "Passt in bestehende Stacks, ohne sie umzubauen.",
    integration_intro:
      "Quellen, Receiver, OEM-Firmware und Lab-Setups bekommen jeweils ihren eigenen Integrationspfad. Der USB-Audio-Class-Treiber ist ein möglicher Eingang, nicht der Markenmittelpunkt.",
    tab_sources: "Quellen",
    tab_receivers: "Receiver",
    tab_oem: "OEM",
    tab_lab: "Labor",
    panel1_label: "Best fit",
    panel1_title: "USB-Audio-Class-Treiber, Musikserver, Capture-Tools.",
    panel1_text:
      "Ideal, wenn die Playback-App oder der Quellpfad bereits existiert und die Transportschicht auf dem Weg ins Netz vorhersehbar bleiben soll.",
    panel1_b1: "Low-level USB-Audio-Class Eingangspfad",
    panel1_b2: "Raw PCM forwarding ohne versteckte Umwandlung",
    panel1_b3: "Discovery, Capability-Match und Status-Feedback",
    panel2_label: "Best fit",
    panel2_title: "Linux-Services, eingebettete Sinks, DAC-Bridges.",
    panel2_text:
      "Der Endpunkt sieht Pakete, keine Vermutungen. So bleiben Wiedergabe, Diagnose und Ausgabeverhalten synchron.",
    panel2_b1: "ALSA, I2S oder eigener Receiver-Backend",
    panel2_b2: "Rückkanal-Telemetrie für Laufzeit-Transparenz",
    panel2_b3: "Formatnegotiation mit expliziten Capability-Daten",
    panel3_label: "Best fit",
    panel3_title: "OEM-Firmware, SDKs und Partnerprodukte.",
    panel3_text:
      "Wenn das Produkt in einem anderen Markenstack ausgeliefert wird, liefert die Plattform einen kontrollierten technischen Vertrag.",
    panel3_b1: "Protokolldoku, Evidenz und Versionspolitik",
    panel3_b2: "Integrationsleitfäden für Partner-Hardware und Software",
    panel3_b3: "Klare Trennung zwischen Transportkern und Adaptern",
    panel4_label: "Best fit",
    panel4_title: "Validation-Rigs, Stresstests und QA.",
    panel4_text:
      "Proof beats claims. Der Laborpfad zeigt, was der Stream wann und warum getan hat.",
    panel4_b1: "Hash-Vergleich und Packet-Flow-Simulation",
    panel4_b2: "Waterfall- und Status-Views für Live-Inspektion",
    panel4_b3: "Traceability vom Spec bis zum aufgezeichneten Ergebnis",
    cov1_title: "USB Audio Class",
    cov1_text:
      "Ein möglicher Eingangspfad, vor allem wenn die Source-App die Wiedergabe bereits kontrolliert.",
    cov2_title: "Musikserver",
    cov2_text: "Roon-ähnliche Server, lokale Bibliotheken und Netzwerk-Audio-Stacks.",
    cov3_title: "Receiver & DACs",
    cov3_text: "Direkte Bridges, Endpunktdienste und OEM-Sink-Integrationen.",
    cov4_title: "Partner-Firmware",
    cov4_text: "Eine kontrollierte Transportschicht für ein Gerät oder eine Plattform einer anderen Marke.",
    cov5_title: "Labor & QA",
    cov5_text: "Bit-perfect Proof, Impairment-Tests und nachvollziehbare Release-Checks.",
    cov6_title: "Browser-Ansicht",
    cov6_text: "Waterfall- und Status-Views für die Inspektion, ohne PCM anzufassen.",
    snippet_eyebrow: "LOW-LEVEL / LOW-LEVEL",
    snippet_title: "Der Transport beginnt im Protokollkern, nicht an der Oberfläche.",
    snippet_text:
      "Der Code bleibt nah an den Bytes: explizite Header, Sequenznummern, Sample-Counter und CRC. Genau das soll die Seite sichtbar machen.",
    code_panel_label: "Protokollkern",
    code_panel_title: "Forward header",
    snippet_note: "Repräsentativer Auszug aus dem Transportkern.",
    evidence_eyebrow: "EVIDENCE / EVIDENZ",
    evidence_title: "Für Hi-Res-Vertrauen sichtbar gemacht.",
    evidence_intro:
      "Die Produktgeschichte wird stärker, wenn der Nachweis leicht zu finden ist: Hashes, Tests, Topologie und ein reproduzierbarer Release-Pfad.",
    metric1_text: "Codecs im Kerntransport",
    metric2_text: "Jitterbuffer-Baseline",
    metric3_text: "Rückkanal-Takt",
    metric4_text: "Dokumentiertes Transportziel",
    proof_header1: "Checkpoint",
    proof_header2: "Was es zeigt",
    proof_header3: "Warum es zählt",
    proof_row1a: "Protokolltests",
    proof_row1b: "CRC, Paketlayout, Discovery-Logik",
    proof_row1c: "Bit-perfect Verhalten bleibt prüfbar",
    proof_row2a: "Signal-Chain Proof",
    proof_row2b: "Matching SHA-256-Hashes auf dem PCM Payload",
    proof_row2c: "Der Stream blieb beim Transport unverändert",
    proof_row3a: "Referenztools",
    proof_row3b: "Linux-Sender, Receiver, Smoke-Tests",
    proof_row3c: "Integrationsgeschichten lassen sich reproduzieren",
    resources_eyebrow: "RESOURCES / RESSOURCEN",
    resources_title: "Mit dem Brief starten. Dann die Evidenz nachziehen.",
    resources_intro:
      "Die Landingpage führt zu den Dokumenten, die man bei einer Plattform-Evaluierung wirklich braucht: Brief, Bundle, Boundary und Ergebnis.",
    resources_badge_title: "Made in Germany",
    resources_badge_text: "Bit-perfect Plattformschicht für Hi-Res-Systeme und OEM-Integrationen.",
    footer_note: "Raw PCM transport. Bit-perfect by design. Made in Germany.",
  },
  en: {
    document_title: "SolidState Audio Platform | Raw PCM transport without detours",
    document_description:
      "SolidState Audio Platform moves raw PCM over IP, with bit-perfect transport, discovery, status channel, and many integration paths for Hi-Res systems.",
    brand_title: "SolidState",
    brand_subtitle: "Audio Platform",
    nav_overview: "Overview",
    nav_features: "Features",
    nav_integration: "Integration",
    nav_evidence: "Evidence",
    nav_resources: "Resources",
    made_germany_badge: "Made in Germany",
    hero_eyebrow: "RAW PCM TRANSPORT / SYSTEM PLATFORM",
    hero_title: "Move audio as it was made.",
    hero_text:
      "SolidState keeps the transport layer low-level and predictable while raw PCM moves across IP. Discovery, diagnostics, and return-channel status are built in. The platform stays open to many integration paths: music servers, embedded sinks, DAC bridges, lab rigs, and partner firmware.",
    hero_subcopy:
      "Made for Hi-Res. Made in Germany. USB Audio Class is one possible input, not the product identity.",
    cta_features: "See features",
    cta_integration: "Explore integration",
    cta_evidence: "Open evidence",
    cta_waterfall: "Waterfall demo",
    badge_bitperfect: "Bit-perfect by design",
    badge_hires: "Made for Hi-Res",
    badge_noresample: "No resampling",
    badge_multiintegration: "Multi-integration",
    badge_status: "Return-channel status",
    signal_label: "THE SIGNAL PATH",
    signal_title: "Signal path / Signalpfad",
    sources_title: "Sources",
    source_1: "USB Audio Class input",
    source_2: "Music servers",
    source_3: "Custom app / capture rig",
    source_4: "Live input / lab feed",
    platform_title: "Platform",
    platform_1: "Bit-perfect transport",
    platform_2: "Discovery & topology",
    platform_3: "Return-channel status",
    platform_4: "Diagnostics & telemetry",
    platform_5: "Protocol management",
    platform_6: "Security & integrity",
    endpoints_title: "Endpoints",
    endpoint_1: "DACs",
    endpoint_2: "Receivers",
    endpoint_3: "AV hosts",
    endpoint_4: "Network players",
    endpoint_5: "OEM systems",
    legend_audio: "Audio (PCM)",
    legend_control: "Control / Discovery",
    legend_status: "Status / Telemetry",
    feature_eyebrow: "FEATURES / FUNKTIONEN",
    feature_title: "Built for Hi-Res chains, engineered for proof.",
    feature_intro:
      "This page does not sell a box. It sells platform features that make an audio system understandable, integrable, and measurable.",
    feature1_title: "Bit-perfect transport",
    feature1_text: "PCM stays raw PCM. No compression, no DSP, no hidden reframing.",
    feature2_title: "Made for Hi-Res",
    feature2_text: "Designed for 44.1 / 48 / 96 / 192 kHz target chains and explicit format rules.",
    feature3_title: "Discovery ready",
    feature3_text: "Make compatible endpoints visible instead of hiding them behind hard-coded assumptions.",
    feature4_title: "Status channel",
    feature4_text: "Buffer, jitter, loss, and clock information flows back to the source on time.",
    feature5_title: "Flexible deployment",
    feature5_text: "Linux, embedded targets, receiver services, and browser-side visibility in one stack.",
    feature6_title: "Evidence trail",
    feature6_text: "Hash proofs, tests, traceability, and release docs instead of marketing fog.",
    integration_eyebrow: "INTEGRATION / INTEGRATION",
    integration_title: "Fits into existing stacks without asking them to become something else.",
    integration_intro:
      "Sources, receivers, OEM firmware, and lab setups each get their own integration path. The USB Audio Class driver is one possible input, not the brand centerpiece.",
    tab_sources: "Sources",
    tab_receivers: "Receivers",
    tab_oem: "OEM",
    tab_lab: "Lab",
    panel1_label: "Best fit",
    panel1_title: "USB Audio Class driver implementation, music servers, capture tools.",
    panel1_text:
      "Ideal when you already own the playback app or source path and want the transport layer to stay predictable on the way to the network.",
    panel1_b1: "Low-level USB Audio Class input path",
    panel1_b2: "Raw PCM forwarding without hidden conversion",
    panel1_b3: "Discovery, capability match, and status feedback",
    panel2_label: "Best fit",
    panel2_title: "Linux services, embedded sinks, DAC bridges.",
    panel2_text:
      "The endpoint sees packets, not guesses. That keeps playback, diagnostics, and output behavior aligned.",
    panel2_b1: "ALSA, I2S, or a custom receiver backend",
    panel2_b2: "Return-channel telemetry for runtime visibility",
    panel2_b3: "Format negotiation with explicit capability metadata",
    panel3_label: "Best fit",
    panel3_title: "OEM firmware, SDKs, and partner products.",
    panel3_text:
      "When the product must ship inside another brand's stack, the platform gives you a controlled technical contract.",
    panel3_b1: "Protocol docs, release evidence, and version policy",
    panel3_b2: "Integration guidance for partner hardware and software",
    panel3_b3: "Clear boundary between transport core and adapters",
    panel4_label: "Best fit",
    panel4_title: "Validation rigs, impairment tests, and QA.",
    panel4_text:
      "Proof beats claims. The lab path is there to show what the stream did, when, and why.",
    panel4_b1: "Hash comparisons and packet-flow simulation",
    panel4_b2: "Waterfall and status views for live inspection",
    panel4_b3: "Traceability from spec to recorded result",
    cov1_title: "USB Audio Class",
    cov1_text: "One possible source path, especially when the source app already owns playback.",
    cov2_title: "Music servers",
    cov2_text: "Roon-like servers, local libraries, and network audio stacks.",
    cov3_title: "Receivers & DACs",
    cov3_text: "Direct bridges, endpoint services, and OEM sink integrations.",
    cov4_title: "Partner firmware",
    cov4_text: "A controlled transport layer for a device or platform from another brand.",
    cov5_title: "Lab & QA",
    cov5_text: "Bit-perfect proof, impairment testing, and traceable release checks.",
    cov6_title: "Browser visibility",
    cov6_text: "Waterfall and status views for operator-facing inspection without touching PCM.",
    snippet_eyebrow: "LOW-LEVEL / LOW-LEVEL",
    snippet_title: "The transport starts at the protocol core, not at the surface.",
    snippet_text:
      "The code stays close to the bytes: explicit headers, sequence numbers, sample counters, and CRC. That is the low-level posture the page should signal.",
    code_panel_label: "Protocol core",
    code_panel_title: "Forward header",
    snippet_note: "Representative excerpt from the transport core.",
    evidence_eyebrow: "EVIDENCE / EVIDENZ",
    evidence_title: "Designed to make Hi-Res trust visible.",
    evidence_intro:
      "The product story gets stronger when the proof is easy to find: hashes, tests, topology, and a repeatable release path.",
    metric1_text: "codecs in the core transport",
    metric2_text: "jitter buffer baseline",
    metric3_text: "return-channel cadence",
    metric4_text: "documented transport target",
    proof_header1: "Checkpoint",
    proof_header2: "What it shows",
    proof_header3: "Why it matters",
    proof_row1a: "Protocol tests",
    proof_row1b: "CRC, packet layout, discovery logic",
    proof_row1c: "Bit-perfect behavior stays verifiable",
    proof_row2a: "Signal-chain proof",
    proof_row2b: "Matching SHA-256 hashes on the PCM payload",
    proof_row2c: "The stream survived transport unchanged",
    proof_row3a: "Reference tools",
    proof_row3b: "Linux sender, receiver, smoke tests",
    proof_row3c: "Integration stories can be reproduced",
    resources_eyebrow: "RESOURCES / RESSOURCEN",
    resources_title: "Start with the brief. Then trace the proof.",
    resources_intro:
      "The landing page points to the documents people actually need when they evaluate a platform: brief, bundle, boundary, and result.",
    resources_badge_title: "Made in Germany",
    resources_badge_text: "Bit-perfect platform layer for Hi-Res systems and OEM integrations.",
    footer_note: "Raw PCM transport. Bit-perfect by design. Made in Germany.",
  },
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.de;
  document.documentElement.lang = lang;
  document.title = dict.document_title;
  if (metaDescription) metaDescription.setAttribute("content", dict.document_description);

  textNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === lang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("solidstate-lang", lang);
}

const initialLang = localStorage.getItem("solidstate-lang") || "de";
applyLanguage(initialLang);

function updateHeader() {
  header.classList.toggle("is-elevated", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    header.classList.toggle("is-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      header.classList.remove("is-open");
    }
  });
}

function activateTab(target) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === target;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tabTarget);
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length === 0) return;

      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const currentId = visible[0].target.id;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("is-active", isActive);
      });
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.4, 0.6, 0.8],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

activateTab(tabButtons[0]?.dataset.tabTarget || "sources");
