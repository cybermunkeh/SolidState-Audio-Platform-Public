# Implementation Status

## Current implementation

The repository now contains the first transport-core and receiver-side building
blocks for the requested custom UDP PCM protocol:

- Forward packet metadata and CRC helpers in `main/pcm_transport_protocol.*`.
- ESP32-S3 sender packetization in `components/pcm_transport/pcm_sender.*`.
- Receiver depacketizer in `main/depacketizer.*`.
- Adaptive ring-style jitter buffer in `main/jitter_buffer.*` with EMA-based
  instability tracking and gradual shrink/grow behavior.
- Smoothed software PLL controller in `main/software_pll.*`.
- Receiver engine integration in `main/receiver_engine.*`.
- ESP32-S3 UDP receiver service stub in `main/receiver_service.*`.
- 100 ms status return-channel task in `main/status_channel.*`.
- Host-oriented core tests in `tests/protocol_core_tests.c`.
- Python packet-flow simulation in `tests/packet_flow_sim.py`.
- Linux raw PCM sender and receiver reference tools in `examples/linux/`.
- Capability negotiation helpers and CRC-protected discovery packets in
  `main/pcm_transport_protocol.*`.
- The shared capability defaults now advertise the full protocol PCM matrix:
  16/24/32-bit across 44.1/48/88.2/96/176.4/192 kHz, with 192 kHz as the
  documented transport target.
- ESP32 and Linux receiver discovery broadcasts with capability metadata.
- Linux sender discovery mode that listens for receiver broadcasts and selects
  a receiver only when its advertised capabilities exactly match the supplied
  raw PCM input format.
- The Linux receiver discovery broadcaster now also wakes on receive timeout so
  discovery can start even before the first audio packet arrives.
- The transport scope is UDP only; the repository does not define or support
  a TCP fallback path.
- The ESP32 USB audio profile keeps a mobile-friendly UAC1 stereo 16-bit
  44.1/48 kHz entry path for Windows, iOS, and Android hosts while exposing
  192 kHz on the high-speed UAC2 path for capable hosts.
- The gateway station configuration now uses an open auth profile only when no
  WLAN password is stored; otherwise it connects with WPA2-PSK using the saved
  credentials.
- The ESP32 gateway can auto-discover a compatible receiver on UDP 5005 when
  the receiver IP field is left empty, then persist the selected endpoint.
- The ESP32 gateway now listens on UDP 5006 for receiver status and ACKs and
  reflects those packets in diagnostics and the web view.
- The Linux sender reference now listens on UDP 5006 for return-channel status
  and ACK packets and prints them to stderr during playback.
- The Linux receiver reference can optionally mirror validated raw PCM to ALSA
  while keeping the raw-file/stdout fallback path.
- A Linux loopback smoke test script now exercises the sender/receiver raw PCM
  path and can include the ALSA mirror path when enabled.
- A separate Linux discovery smoke test script now exercises receiver
  broadcast, sender auto-selection, and raw PCM hash comparison.
- Linux reference tools now build in WSL without ALSA development headers, and
  both loopback smoke tests pass with automatically selected free UDP ports.
- The optional ALSA mirror path now also builds with `libasound2-dev` and
  passes the loopback smoke test against the ALSA `null` sink.
- The receiver engine now feeds packet timing into the software PLL so the
  clock controller reacts to real timing drift instead of remaining inert.
- The sender control helper now tracks ACK freshness and can force automatic
  rediscovery when an auto-selected target goes stale.
- The local firmware entrypoint and USB audio loop now live in repo-owned
  sources under `main/`, with TinyUSB treated as a dependency instead of the
  application owner.
- The ESP32-S3 USB audio device path now exposes a mobile-friendly UAC1
  entry profile for Windows, iOS, and Android hosts and a high-speed UAC2
  profile that advertises 192 kHz to capable hosts.
- The USB host-facing profile is pinned with compile-time guards so the
  mobile-friendly UAC1 entry path stays at 16-bit stereo 44.1/48 kHz while
  the high-speed UAC2 branch keeps its 192 kHz ceiling visible.
- The optional HID audio-debug callback now serves the live snapshot on
  `GET_REPORT`.
- The ESP32 receiver service now starts the status channel back to the sender
  peer on the default return-channel port and refreshes it when the peer
  address changes.
- The receiver now emits a minimal ACK datagram on the return channel when the
  depacketizer reports a format change.
- The Python packet-flow simulation now checks the ACK header shape in
  addition to audio payload and discovery CRC behavior.
- Host-side protocol tests now also cover diagnostics JSON formatting so the
  release evidence can reference the live status schema without guesswork.
- Linux discovery loopback now has a dedicated documented script path for
  discovery broadcast and sender auto-selection validation.
- A release evidence template now captures the build, transport, bit-perfect,
  USB, and receiver data points needed for release candidates.
- A release evidence index now centralizes the template, example, proof, and
  result snapshot for release candidates.
- The release evidence template now also includes a Linux discovery smoke-test
  section for auto-selection and hash-comparison evidence.
- A release checklist now turns the evidence template into a candidate gate
  for firmware, receiver, and SDK handoff.
- A public-safe GitHub release package now lists the docs and website assets
  that can be published without exposing the transport core.
- The public-safe package now ships with an exporter that copies the listed
  files into a reproducible GitHub-ready folder.
- A public release boundary document now makes the public, partner-only, and
  private split explicit for GitHub publication.
- A public release checklist now turns the export, review, and publish steps
  into a concrete public GitHub launch flow.
- A public GitHub QA note now summarizes quick visual, export, and content
  checks for the public cut.
- A public release log now summarizes safe public-facing changes without
  leaking transport internals.
- A public release map now groups the public documentation by purpose for
  faster GitHub navigation.
- The implementation status is included in the public-safe export so the public
  cut matches the documented boundary.
- The exporter now defaults to a temp directory so it does not pollute the repo
  tree while preparing a public-safe cut.
- A GitHub Actions workflow now runs the public-safe export and validates the
  resulting public file set on Windows.
- The public-safe export now includes the GitHub workflow itself so the public
  cut can verify its own release boundary.
- The public website footer now points to the product brief, disclosure policy,
  GitHub publication guide, and public-safe release package so the public path
  is easy to navigate.
- A GitHub publication guide now explains the recommended private/public split
  and the export flow for a public GitHub release.
- A contributing guide and PR template now give public-safe collaborators a
  clear contribution path.
- A changelog now summarizes the public GitHub readiness work and release
  evidence additions for public-facing readers.
- GitHub issue templates now cover public-safe bug reports and feature
  requests.
- A security policy now tells public readers how to report sensitive issues
  without opening a public ticket.
- A code of conduct now sets a respectful tone for public collaboration.
- LP10 helper-side source switching is available in
  `tools/lp10/lp10-udp-pcm.sh`: the USB source button can free matching LP10
  audio pipeline processes, apply optional integrator release commands, and
  start the direct UDP-to-ALSA raw receiver.
- The LP10 helper now mirrors the received PCM stream into
  `/var/www/waterfall/latest.pcm` and writes `status.json` so a static
  waterfall page can inspect the live stream without a separate backend.
- A lightweight WebGL2 waterfall page now lives under `website/waterfall/`
  and is intended to be deployed on the LP10 webserver for receiver-side PCM
  inspection.
- The current repo state includes a verified ESP-to-LP10 bit-perfect signal
  chain proof with matching SHA-256 hashes on a 2880-byte PCM fixture.
- The same proof now has a short public-facing result snapshot in
  `docs/ESP_TO_LP10_SIGNALCHAIN_RESULT.md` for quick review and export.
- A requirement traceability matrix now maps the objective to the strongest
  repo evidence, so implemented, partial, and open items stay visible in one
  place.

## Protected invariants

- PCM payload bytes are copied into packets and jitter storage without sample
  interpretation.
- Depacketizer verifies payload CRC32 before exposing payload bytes.
- First valid packet starts a stream without being misclassified as a format
  change.
- Runtime format changes are detected from metadata changes or the
  `PCM_PROTO_FLAG_FORMAT_CHANGE` flag.
- Discovery packets are protected with CRC32 and include sample-rate,
  bit-depth, PCM-format, channel, platform, and firmware metadata.
- Format selection chooses the highest mutually supported sample rate and
  falls back without sample conversion when a preferred bit depth is not common.
- Duplicate, late, skipped, and out-of-order packet counters are tracked for
  diagnostics and return-channel status.
- Receiver buffer target starts at 20 ms, matching the requested jitterbuffer
  baseline, and adapts inside the 10 ms to 100 ms operating window.
- Software PLL output is clamped to the configured ppm range and smoothed over
  successive updates.

## Verification performed

- `tests/protocol_core_tests.c` was syntax-checked with the PlatformIO
  Xtensa cross compiler.
- The transport-core source files used by the tests were syntax-checked with
  the same compiler.
- `python tests/packet_flow_sim.py` passed.
- The packet-flow simulation now covers discovery packet CRC behavior in
  addition to audio packet validation.
- `tests/protocol_core_tests.exe` was built with the Visual Studio 2019 Build
  Tools host compiler and passed, including diagnostics JSON formatting
  coverage.
- `tests/protocol_core_tests` was rebuilt in WSL with the receiver-engine PLL
  path and passed, including a host stub for the status channel and sender ACK
  freshness tracking.
- `python -m platformio run --environment esp32-s3` completed successfully
  after excluding the unused `esp_lcd` component that reproducibly crashed the
  bundled compiler; the current gateway and sender-control changes build in the
  ESP32-S3 firmware graph.
- Firmware artifacts were produced at `.pio/build/esp32-s3/firmware.elf` and
  `.pio/build/esp32-s3/firmware.bin`.

## Verification not yet complete

- ESP32-S3 I2S output is not implemented yet.
- Capability negotiation and discovery now have packet structures, broadcast
  stubs, Linux sender-side receiver selection, and a firmware-side discovery
  auto-selection path when the receiver target is omitted. The receiver-side
  ACK datagram exists and the gateway now consumes status/ACK packets. The
  sender reference also prints status/ACK packets, and the gateway now tracks
  ACK freshness so auto-selected targets can be rediscovered when the return
  channel goes stale.
- LP10 OEM integration still needs device-specific validation of the release
  commands and process patterns for each firmware image, plus confirmation on
  each target phone/adapter combination.
- Jitterbuffer adaptation now tracks packet-arrival jitter and fill deficit via
  EMA, but it still needs wider field validation with real network traces and
  playback-backend feedback.
- Receiver-side PLL input is now live, but the control law still needs a wider
  field validation pass on actual hardware and longer network traces.
- Sender-side ACK timeout behavior still needs longer field validation on a
  real network with a discovered receiver.

## Next implementation steps

1. Validate the EMA-based jitterbuffer adaptation on longer real-network traces
   and playback-backend feedback.
2. Extend sender-side ACK freshness with richer link-quality heuristics and
   longer real-network validation.
3. Close the remaining hardware gap by implementing and validating the ESP32-S3
   I2S output backend and an end-to-end 192 kHz proof path.
