# Release Checklist

Use this checklist for firmware, receiver, and SDK release candidates.
The goal is to keep every release tied to evidence that lives in the
repository.

## Before release

- Update the implementation status if anything material changed.
- Fill out `[Release Evidence Template](RELEASE_EVIDENCE_TEMPLATE.md)` for the
  candidate.
- Use `[Release Evidence Index](RELEASE_EVIDENCE_INDEX.md)` to navigate the
  proof trail before filling the bundle.
- Copy the verified values into `[Release Evidence Example](RELEASE_EVIDENCE_EXAMPLE.md)`
  when you want a filled reference artifact in the repository.
- Confirm the repository build is green for the current firmware target.
- Confirm packet-flow simulation still passes.
- Confirm the Linux reference tools still have documented smoke-test paths.
- Confirm no documentation references stale ports, paths, or format defaults.

## Required evidence

- Firmware build command and output summary.
- Git revision for the candidate.
- Board model and host OS.
- USB audio mode and supported sample-rate matrix.
- Bit-perfect hash evidence for at least one end-to-end fixture.
- Linux discovery smoke-test evidence when the Linux reference path is part of
  the candidate scope.
- Receiver status and ACK evidence.
- Packet-loss, duplicate, late, and out-of-order summaries.
- Known limitations and follow-up work.

## Optional but recommended

- Screen capture or photo of host enumeration.
- Receiver log excerpt for format change or recovery behavior.
- Linux loopback smoke-test output.
- Linux discovery loopback smoke-test output showing auto-selected receiver and
  matching raw PCM hashes.
- LP10 evaluation notes when the candidate touches that path.
- ESP-to-LP10 result snapshot when the candidate includes the bit-perfect
  proof.

## Release gate

Do not tag or hand off a release candidate until the checklist above is
complete enough that a technical buyer can reproduce the result without
guessing.
