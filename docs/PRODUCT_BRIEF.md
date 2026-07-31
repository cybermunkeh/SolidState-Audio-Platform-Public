# SolidState Audio Platform Product Brief

## What it is

SolidState Audio Platform is a raw PCM transport layer for OEMs that need
networked audio without codec latency, DSP coloration, resampling, or hidden
sample conversion.

## Why it matters

- Bit-perfect transport is the product promise.
- The transport is UDP only.
- The firmware and reference tools are designed to be embeddable, testable, and
  documentable for OEM evaluation.
- Diagnostics and status reporting are part of the value, not an afterthought.

## Current verified evidence

- ESP32-S3 firmware builds successfully with PlatformIO.
- Host-side protocol tests pass, including diagnostics JSON formatting.
- Python packet-flow simulation passes.
- The jitterbuffer now uses EMA-based instability tracking with gradual
  shrink/grow behavior.
- An ESP-to-LP10 bit-perfect proof exists with matching SHA-256 hashes on a
  2880-byte PCM fixture.
- The ESP32-S3 USB audio device path now advertises a mobile-friendly UAC1
  profile plus a high-speed UAC2 profile with 192 kHz capability for hosts
  that support it.
- The current proof fixture runs at 48 kHz, while the USB host profile keeps
  UAC1 friendly for mobile recognition and exposes 192 kHz on the high-speed
  UAC2 path for capable hosts.

## Reference components

- ESP32-S3 gateway firmware in `main/`.
- Linux raw PCM sender and receiver references in `examples/linux/`.
- Discovery broadcasts and sender auto-selection for Linux loopback evaluation.
- Release evidence and checklist templates under `docs/`.

## Evaluation package

An OEM evaluation should include:

- the evaluation bundle for the quickest public start,
- the evaluation runbook for a short verification order,
- firmware build command and result summary,
- release evidence index and filled example,
- protocol and format matrix,
- bit-perfect hash evidence,
- short signal-chain result snapshot,
- receiver status and ACK evidence,
- Linux loopback smoke-test output,
- known limitations and follow-up work.

## Current limits

- Linux reference tools still need a recorded build-and-run result on a Linux
  host in this workspace.
- ESP32-S3 I2S output is not yet implemented.
- Wider OEM validation still depends on device-specific testing.
- The 192 kHz transport target still needs a full end-to-end hardware proof on
  a compatible high-speed host.

## Next steps

1. Compile and run the Linux reference tools on a Linux host.
2. Expand receiver validation and Wi-Fi impairment reporting.
3. Turn the reference material into a formal OEM SDK handoff package.
