# Contributing

Thanks for helping improve SolidState Audio Platform.

## Before you change anything

- Read `docs/PUBLIC_DISCLOSURE_POLICY.md`.
- Keep the raw PCM transport rules intact.
- Prefer documentation and tests before broad code changes.
- Keep implementation details and test fixtures private unless the change is
  explicitly part of the public-safe cut.

## What good contributions look like

- Small, reviewable changes.
- Clear documentation updates for any behavioral change.
- Tests or verifications that match the scope of the change.
- No resampling, DSP, volume changes, or other PCM manipulation in the core
  transport path.

## Suggested verification

- `python tests/packet_flow_sim.py`
- `python -m platformio run --environment esp32-s3`
- Host tests in `tests/protocol_core_tests.c` when a host compiler is
  available.

## Pull requests

- Describe the problem and the verification you ran.
- Call out whether the change is public-safe, partner-only, or private.
- Link the relevant docs when the change affects roadmap, release evidence, or
  GitHub publication flow.
