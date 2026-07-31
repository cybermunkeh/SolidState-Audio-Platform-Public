# Product Roadmap

## Priority order

1. Productization
2. Stability
3. Testability
4. Documentation
5. OEM integration
6. Business buildout

## Phase 0: Repository baseline

Status: in progress

- Keep architecture rules visible in README and protocol docs.
- Document current firmware modules, assumptions, and technical debt.
- Align setup documentation with firmware constants.
- Establish a test strategy before changing transport behavior.
- Maintain a green ESP32-S3 PlatformIO build.

## Phase 1: Firmware productization

Goal: turn the current proof of concept into a maintainable firmware baseline.

- Harden the repo-owned USB audio entrypoint and descriptors.
- Remove or clearly isolate unused entrypoints.
- Define a stable public PCM sender API.
- Add compile-time checks for frame size, packet size, and supported sample
  formats.
- Add queue-depth and dropped-block diagnostics.
- Document supported boards and flashing workflow.

Exit criteria:

- Clean firmware build from a documented command.
- USB enumeration verified on at least one host OS.
- PCM bytes forwarded without sample manipulation in an automated or captured
  test.

## Phase 2: Receiver and diagnostics

Goal: create a receiver reference implementation suitable for OEM evaluation.

- Linux receiver prototype for UDP PCM packets.
- Packet validation: magic, version, payload length, CRC, sequence continuity.
- Linux sender prototype for raw PCM packet generation.
- ALSA playback profile selection from transport metadata.
- Receiver status channel with packet loss, jitter, buffer fill, and underruns.
- JSON diagnostics schema shared between sender and receiver.

Exit criteria:

- End-to-end 44.1/48/96 kHz stereo playback verified, with 192 kHz remaining
  the documented transport target for the broader PCM matrix.
- Receiver reports packet loss and underruns.
- No sender-side resampling, DSP, or volume processing.

## Phase 3: Test and compliance kit

Goal: make bit-perfect behavior demonstrable to OEMs.

- Host-side unit tests for protocol helpers.
- Golden PCM fixture tests.
- Wireshark capture examples and decoding notes.
- Long-run soak test plan.
- Packet-loss and Wi-Fi impairment test scenarios.
- Release checklist for firmware, receiver, docs, known limits, and
  release-evidence template filling.

Exit criteria:

- Reproducible test report template.
- At least one automated bit-preservation test.
- Documented known-good firmware and receiver versions.

## Phase 4: OEM SDK

Goal: package the platform for integration by hardware and product partners.

- C API for sender/receiver integration.
- Reference receiver service for Linux/Raspberry Pi.
- Hardware integration guide.
- Configuration and provisioning guide.
- Diagnostics API documentation.
- Versioning and compatibility policy.

Exit criteria:

- OEM can integrate the receiver without reading firmware internals.
- Protocol versioning and compatibility behavior are documented.

## Phase 5: Business readiness

Goal: support B2B sales and evaluation.

- One-page product brief.
- Technical datasheet.
- Evaluation kit checklist.
- Licensing and support model proposal.
- Pilot-customer requirements template.
- Risk register and mitigation plan.
- Public-safe GitHub release package with docs-only positioning and redacted
  implementation guidance.
- Public release boundary document with explicit public, partner-only, and
  private tiers.
- Public release checklist for export, review, and publish flow.
- Public GitHub QA note for quick post-export verification.
- Public-safe GitHub release log for public-facing changes.
- Public release map to group the public documentation by purpose.
- Public implementation status in the exported public-safe cut.
- Public-safe export script for reproducible GitHub-ready documentation cuts.
- GitHub Actions workflow to verify the public-safe export on push and PR.
- Include the public-safe GitHub workflow in the exported public cut.
- GitHub publication guide for public/private split and publication flow.
- Contributing guide and PR template for a public-safe GitHub collaboration
  path.
- Changelog for public GitHub readiness and release evidence updates.
- Public-safe GitHub release log for public-facing changes.
- GitHub issue templates for public-safe feedback and feature requests.
- Security policy for public-safe reporting.
- Code of conduct for public collaboration.

Exit criteria:

- A technical buyer can understand scope, constraints, and evaluation steps.
- A commercial buyer can understand licensing, support, and roadmap posture.

Reference artifacts:

- [Release evidence template](RELEASE_EVIDENCE_TEMPLATE.md)
- [Release checklist](RELEASE_CHECKLIST.md)
- [Requirement traceability matrix](TRACEABILITY_MATRIX.md)

## Next recommended steps

1. Add a Linux loopback test for receiver discovery and sender auto-selection.
2. Validate the EMA-based jitterbuffer target adjustment against longer packet
   timing traces and playback underrun feedback.
3. Add a documented UDP-only LP10 evaluation path with helper-side direct
   playback and device-specific release hooks.
4. Add a receiver-side WebGL waterfall page on LP10 that reads live PCM
   snapshots without altering the transport stream.
5. Harden the repo-owned USB audio entrypoint and descriptors.
6. Add firmware-side discovery listening and format-change ACK flow.
7. Use the traceability matrix to close the remaining hardware-validation gaps,
   especially ESP32-S3 I2S output and an end-to-end 192 kHz proof.
