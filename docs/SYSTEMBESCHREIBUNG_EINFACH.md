# SolidState Audio Platform - einfache Systembeschreibung

## Kurz gesagt

Die SolidState Audio Platform transportiert Musik oder andere Audiosignale
ueber ein lokales Netzwerk, ohne den Ton dabei absichtlich zu veraendern.
Das System nimmt digitale Audiodaten entgegen, verpackt sie in kleine
Netzwerkpakete und schickt sie an einen Empfaenger, der daraus wieder ein
abspielbares Audiosignal macht.

Der wichtigste Gedanke ist: Die Audiodaten sollen unterwegs nicht "besser",
"lauter", "kleiner" oder "kompatibler" gemacht werden. Sie sollen moeglichst
genau so beim Empfaenger ankommen, wie sie am Eingang hineingegangen sind.

## Welches Problem loest das System?

Viele Audio-Transportloesungen sind fuer Komfort gebaut: Streaming aus Apps,
Multiroom-Funktionen, automatische Lautstaerke, Sprachassistenten,
Bluetooth-Kopplung oder Internetdienste. Das ist fuer viele Anwendungen
praktisch, macht aber oft unsichtbar, was mit dem Signal passiert.

Diese Plattform verfolgt einen anderen Schwerpunkt:

- Der Transport soll nachvollziehbar sein.
- Das Audiosignal soll nicht durch Codecs, Klangregler oder Resampling
  veraendert werden.
- Hersteller und Integratoren sollen das System in eigene Geraete einbauen
  koennen.
- Diagnosewerte sollen zeigen, ob Netzwerk, Puffer und Empfaenger stabil
  laufen.

Damit eignet sich die Plattform besonders fuer Hi-Fi, Pro-Audio, Embedded
Linux, Raspberry-Pi-Empfaenger, Installationsaudio und OEM-Produkte, bei denen
Kontrolle wichtiger ist als eine fertige Consumer-App.

## Wie funktioniert es vereinfacht?

Man kann sich das System wie eine sehr vorsichtige digitale Paketpost
vorstellen:

1. Ein Computer, Player oder anderes Quellgeraet gibt Ton digital aus.
2. Ein ESP32-S3-Geraet erscheint gegenueber dem Computer wie ein USB-Lautsprecher.
3. Statt den Ton selbst wiederzugeben, nimmt der ESP32-S3 die PCM-Audiodaten
   entgegen.
4. Die Firmware legt diese Audiodaten unveraendert in UDP-Netzwerkpakete.
5. Ein Empfaenger nimmt die Pakete entgegen, prueft sie und puffert sie kurz.
6. Der Empfaenger gibt die Daten an eine Audio-Schnittstelle wie I2S, ALSA oder
   spaeter S/PDIF weiter.

Vereinfacht als Kette:

```text
Computer / Audioquelle
  -> USB-Audio
  -> ESP32-S3 Gateway
  -> WLAN / Ethernet per UDP
  -> Empfaenger
  -> Audioausgang
  -> Verstaerker / DAC / Lautsprecher
```

## Was bedeutet "bitgenau"?

"Bitgenau" bedeutet: Die Zahlen, aus denen das digitale Audiosignal besteht,
sollen im Transportkern nicht geaendert werden.

Das System soll deshalb im geschuetzten Audiopfad keine dieser Dinge tun:

- keine Lautstaerkeaenderung
- kein Equalizer
- kein Limiter
- keine Klangverbesserung
- keine Mischung mit anderen Signalen
- keine Kompression wie MP3, AAC oder Opus
- keine automatische Umrechnung der Abtastrate
- keine Aenderung der Sample-Reihenfolge oder Byte-Reihenfolge

Das Projekt transportiert rohe PCM-Daten. PCM ist die einfache digitale Form,
in der Audio als Abfolge von Zahlen vorliegt, zum Beispiel Stereo mit 44,1 kHz
oder 96 kHz.

## Warum nicht einfach eine vorhandene Streamingloesung nehmen?

Vorhandene Loesungen sind oft sehr gut, aber fuer andere Ziele optimiert. Die
folgende Tabelle zeigt die typische Einordnung.

| Loesung | Staerken | Einschraenkungen gegenueber dieser Plattform |
| --- | --- | --- |
| USB-Audio-Kabel | Sehr direkt, hohe Qualitaet, breite Betriebssystem-Unterstuetzung | Kurze Kabelwege, Punkt-zu-Punkt, nicht gut fuer verteilte Raeume oder eingebaute Netzwerkprodukte |
| Bluetooth Audio | Sehr bequem, fast ueberall verfuegbar | Meist komprimiert, hoehere und schwankende Latenz, begrenzte Kontrolle ueber den Signalweg |
| AirPlay / Chromecast | Gute Nutzererfahrung, App- und Oekosystemintegration | Stark an Hersteller-Oekosysteme gebunden, Transportdetails und Signalverarbeitung nicht immer transparent |
| Sonos und andere Consumer-Multiroom-Systeme | Sehr ausgereifte Bedienung, Multiroom, robuste Apps | Geschlossene Plattformen, weniger geeignet als offener OEM-Transportkern, meist nicht als frei integrierbare Firmware gedacht |
| Dante / AES67 / Ravenna | Professionelle Audio-over-IP-Loesungen, viele Kanaele, Synchronisation, teils Standards | Hoeherer Integrationsaufwand, oft Lizenz-/Zertifizierungs- und Infrastrukturthemen, fuer kleine Embedded-Gateways teilweise schwergewichtig |
| Einfaches RTP/UDP-Audio | Niedrige Latenz, bekannte Netzwerkmechanik | Ohne klare Formatregeln, Diagnose, Jitterpuffer und Bitgenauigkeitsregeln bleibt viel Integrationsarbeit offen |
| DLNA / UPnP | Medienbibliotheken und Heimnetz-Playback | Eher datei- oder streamorientiert, nicht primaer fuer niedrige Latenz und rohen Live-PCM-Transport gedacht |

Die SolidState Audio Platform will keine fertige Consumer-Musik-App ersetzen.
Sie ist eher ein Baustein fuer Hersteller, die einen kontrollierbaren
Audio-Transport in eigene Produkte einbauen wollen.

## Was ist heute schon vorhanden?

Der aktuelle Stand ist eine fruehe, aber konkrete technische Basis:

- ESP32-S3-Firmware als USB-Audio-zu-WLAN-Gateway
- USB Audio Class Speaker-Erkennung am Host
- Stereo-PCM-Streaming
- aktuelle mobile-safe USB-Sampleraten: 44,1 kHz und 48 kHz
- konservatives USB-Audio-Format fuer Mobilgeraete: 16 Bit Stereo
- UDP-Weiterleitung der PCM-Daten
- Transport-Metadaten fuer Samplerate, Kanalzahl und Sample-Format
- Konfigurationsportal fuer WLAN und Empfaengeradresse
- Diagnose-Endpunkt als JSON unter `/api/status`
- erste Receiver-Bausteine: Paketpruefung, Jitterpuffer, Software-PLL und
  Rueckkanal-Grundstruktur

Der wichtige Punkt: Das Projekt ist noch kein fertiges Produkt. Es ist eine
Pre-Product-Basis mit klarer Architektur, ersten Implementierungen und einer
Roadmap fuer Stabilitaet, Tests, Receiver und OEM-Integration.

## Was ist noch Zielbild?

Einige Eigenschaften sind bereits entworfen oder teilweise begonnen, aber noch
nicht vollstaendig produktreif:

- automatische Empfaengererkennung im Netzwerk
- vollstaendige Faehigkeitsaushandlung zwischen Sender und Empfaenger
- Linux-/Raspberry-Pi-Receiver mit Wiedergabe
- dynamisch wachsender oder schrumpfender Jitterpuffer
- belastbare Langzeittests und Bitgenauigkeitsnachweise
- hoehere Formate bis 24 Bit / 192 kHz nach Validierung
- optionale Erweiterungen wie Verschluesselung, FEC, QoS oder AES67-naehere
  Profile

## Warum UDP?

UDP ist ein einfaches Netzwerkverfahren, bei dem Pakete schnell verschickt
werden, ohne dass jedes Paket einzeln bestaetigt und bei Verlust wiederholt
wird. Das passt gut zu Live-Audio, weil ein zu spaet erneut gesendetes Paket
oft weniger hilft als ein stabiler, kurzer Puffer.

Das bedeutet aber auch: Das System muss Paketverlust, Reihenfolge,
Netzwerkschwankungen und Pufferfuellung selbst beobachten. Genau dafuer gibt es
im Zielbild Diagnosewerte, Jitterpuffer und Rueckmeldungen vom Empfaenger.

## Wo liegt der Unterschied zu komprimiertem Streaming?

Bei komprimiertem Streaming wird Audio vor dem Transport verkleinert. Das spart
Bandbreite, kann aber Latenz erzeugen und das Signal veraendern. Das ist bei
Spotify, Bluetooth oder vielen Internet-Streams voellig normal und fuer viele
Hoersituationen sinnvoll.

Diese Plattform spart keine Bandbreite durch Audiokompression. Sie sendet PCM
direkt. Das braucht mehr Netzwerkleistung, macht den Signalweg aber einfacher
nachvollziehbar.

## Typische Einsatzszenarien

- Ein Hi-Fi-Hersteller moechte einem DAC oder Verstaerker einen
  Netzwerk-Audioeingang geben.
- Ein Pro-Audio-Geraet soll lokale PCM-Audiodaten mit niedriger Latenz an einen
  anderen Punkt im Raum senden.
- Ein Embedded-Linux-Produkt braucht einen kleinen USB-Audio-zu-Netzwerk-Baustein.
- Ein Integrator will Audio ueber WLAN testen, aber genau sehen, wann
  Paketverlust, Jitter oder Pufferprobleme auftreten.

## Was ist die Kernbotschaft?

Die SolidState Audio Platform ist kein weiterer Musikdienst und keine
Multiroom-App. Sie ist ein kontrollierbarer Transportkern fuer digitale
Audiodaten.

Ihr Wert liegt in drei Dingen:

- Das Audiosignal bleibt im Transportkern unveraendert.
- Das Verhalten des Netzwerks soll messbar und sichtbar werden.
- Die Architektur ist als Baustein fuer eigene Hardware- und Softwareprodukte
  gedacht.
