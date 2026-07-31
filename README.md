# SolidState Audio Platform

SolidState Audio Platform is an embedded audio transport project for
bit-perfect raw PCM over IP. The current firmware target is an ESP32-S3 USB
Audio gateway that enumerates on the native USB-OTG port and forwards incoming
PCM over Wi-Fi.

## Non-negotiable transport rules

- Raw PCM only
- No audio container
- No DSP
- No resampling
- No volume change
- No sample manipulation
- Bit-perfect PCM transport must not be broken

## Current capabilities

- USB Audio Class 1 speaker enumeration
- Stereo PCM streaming
- Protocol capability negotiation for 16/24/32-bit PCM across 44.1/48/88.2/96/176.4/192 kHz
- Audio sample rates of 44.1 kHz and 48 kHz on the current mobile-safe USB profile
- 192 kHz as the documented transport target for the broader PCM capability set
- Adaptive jitterbuffer behavior with host-side protocol coverage
- 16-bit stereo as the conservative default USB audio format for phone testing
- UDP PCM forwarding over Wi-Fi only
- Preservation of the incoming PCM format in transport metadata
- Host-side protocol tests and packet-flow simulation for core transport checks
- Persistent Wi-Fi and receiver configuration portal
- JSON diagnostics endpoint at `/api/status`

## Transport scope

This repository uses a custom UDP PCM transport only. There is no TCP
compatibility mode in the current architecture, and no part of the core path
is allowed to fall back to containers, resampling, DSP, or gain changes.

## Observed host behavior

- The device appears as a USB audio speaker on the host.
- The native USB-OTG port is used for audio.
- The USB Serial/JTAG port remains available for flashing and debugging.

## Current repository status

This repository is still pre-product. It contains a working ESP32-S3 firmware
foundation with repo-owned USB audio sources, the embedded TinyUSB dependency,
an initial PCM transport sender, and early diagnostics/configuration surfaces.
Productization work is tracked in [docs/ROADMAP.md](docs/ROADMAP.md).

## Documentation

- [Marketing website](website/index.html)
- [Configuration](CONFIGURATION.md)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [Security policy](SECURITY.md)
- [Simple German system description](docs/SYSTEMBESCHREIBUNG_EINFACH.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Protocol specification](docs/PROTOCOL_SPEC.md)
- [Roadmap](docs/ROADMAP.md)
- [Test strategy](docs/TEST_STRATEGY.md)
- [Implementation status](docs/IMPLEMENTATION_STATUS.md)
- [Linux reference evidence](docs/LINUX_REFERENCE_EVIDENCE.md)
- [ESP to LP10 signal-chain evidence](docs/ESP_TO_LP10_SIGNALCHAIN_EVIDENCE.md)
- [ESP to LP10 signal-chain result](docs/ESP_TO_LP10_SIGNALCHAIN_RESULT.md)
- [Release evidence template](docs/RELEASE_EVIDENCE_TEMPLATE.md)
- [Release evidence index](docs/RELEASE_EVIDENCE_INDEX.md)
- [Release evidence example](docs/RELEASE_EVIDENCE_EXAMPLE.md)
- [Evaluation bundle](docs/EVALUATION_BUNDLE.md)
- [Evaluation runbook](docs/EVALUATION_RUNBOOK.md)
- [Release checklist](docs/RELEASE_CHECKLIST.md)
- [Business and OEM plan](docs/BUSINESS.md)
- [Product brief](docs/PRODUCT_BRIEF.md)
- [Public disclosure policy](docs/PUBLIC_DISCLOSURE_POLICY.md)
- [Public release boundary](docs/PUBLIC_RELEASE_BOUNDARY.md)
- [Public repository index](docs/PUBLIC_REPO_INDEX.md)
- [Public release checklist](docs/PUBLIC_RELEASE_CHECKLIST.md)
- [Public GitHub QA](docs/PUBLIC_GITHUB_QA.md)
- [Public release log](docs/PUBLIC_RELEASE_LOG.md)
- [Public release map](docs/PUBLIC_RELEASE_MAP.md)
- [GitHub publication guide](docs/GITHUB_PUBLICATION_GUIDE.md)
- [Public-safe GitHub release package](publish/public-safe-release/README.md)
- [Public-safe export script](publish/public-safe-release/export-public-safe.ps1)
- [Public-safe GitHub Actions workflow](.github/workflows/public-safe-export.yml)
- [GitHub issue templates](.github/ISSUE_TEMPLATE/bug_report.yml)

## Public GitHub

If you are viewing a public GitHub mirror or export, start with the
[Public repository index](docs/PUBLIC_REPO_INDEX.md) and the
[Public release boundary](docs/PUBLIC_RELEASE_BOUNDARY.md). They explain what
belongs in the public cut and what stays private.

## Quick evaluation path

1. Open [Evaluation bundle](docs/EVALUATION_BUNDLE.md).
2. Follow [Evaluation runbook](docs/EVALUATION_RUNBOOK.md).
3. Use [Release evidence index](docs/RELEASE_EVIDENCE_INDEX.md) for the
   evidence trail.
