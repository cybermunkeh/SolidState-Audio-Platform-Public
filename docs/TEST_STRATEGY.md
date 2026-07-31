# Test Strategy

## Test principles

- Bit-perfect PCM transport is the primary invariant.
- Tests should first protect packetization, frame boundaries, metadata, and
  diagnostics.
- Hardware tests are required for release confidence, but core protocol tests
  should run on a normal development machine.
- No test may treat resampled, gained, mixed, or otherwise altered audio as
  acceptable output.

## Current gaps

- No golden PCM fixture set is committed yet beyond the current proof sample.
- Receiver-side hardware validation still needs a wider matrix across targets.
- No long-run Wi-Fi stability report format is present.
- Linux reference tools still need a recorded build-and-run result on a Linux
  host.

## Unit test targets

- `pcm_proto_crc32()` with known CRC vectors.
- `pcm_proto_sample_rate_to_mask()` for supported and unsupported rates.
- `pcm_proto_format_name()` and `pcm_proto_platform_name()` fallback behavior.
- Packet frame grouping for 44.1/48/88.2/96/192 kHz, with 192 kHz as the
  target coverage for the broader PCM matrix.
- Payload length and maximum packet-size rejection.
- Diagnostics JSON formatting with boundary values.

## Existing host tests

- `tests/protocol_core_tests.c` covers CRC32, depacketizer CRC rejection,
  duplicate/skipped sequence detection, initial stream classification, format
  change reporting, jitter-buffer byte preservation, PLL clamping, discovery
  CRC validation, diagnostics JSON formatting, 16-bit selection fallback, and
  EMA-based jitter-buffer adaptation.
- `tests/packet_flow_sim.py` is an executable Python simulation for packet
  layout, CRC rejection, duplicate/loss detection, format-change handling, and
  payload preservation when no host C compiler is available. It also mirrors
  the current mobile-safe 16-bit packet assumptions, validates the ACK header
  shape used on the return channel, and checks that 192 kHz remains the
  preferred shared rate when both sides advertise it.

## Existing build checks

- `python -m platformio run --environment esp32-s3` builds the ESP32-S3
  firmware. The project excludes the unused `esp_lcd` component to avoid a
  reproducible internal compiler crash in the bundled ESP-IDF toolchain.
- Discovery/capability changes must keep both `python tests/packet_flow_sim.py`
  and the ESP32-S3 PlatformIO build green.
- The current proof fixture is 48 kHz, while 192 kHz is now represented in the
  USB host-facing high-speed matrix coverage.
- USB host validation should now split into a mobile-friendly UAC1
  recognition check and a high-speed UAC2 capability check on capable hosts.
- Format-change ACK helpers should be covered by host protocol tests so the
  control response keeps mirroring the source stream metadata.
- Sender-side ACK/status listeners should be exercised in a Linux loopback
  smoke test that prints the return-channel packets while raw PCM continues to
  flow unchanged.
- The `examples/linux/loopback_smoke.sh` script should be the documented
  host-side raw PCM preservation check, with ALSA mirroring enabled by
  environment flag when a playback device is available.
- The `examples/linux/discovery_loopback_smoke.sh` script should cover receiver
  discovery broadcast and sender auto-selection before comparing raw PCM
  hashes.
- Linux sender discovery mode should be covered by a loopback test with a
  receiver broadcasting capabilities on the discovery port, then verifying the
  sender targets that receiver without converting PCM.

## Integration test targets

- USB enumeration on Windows, macOS, and Linux.
- 44.1 kHz and 48 kHz stereo host playback into the gateway on the current
  mobile-safe USB profile.
- Packet capture verification that UDP payload bytes match captured USB PCM
  blocks after header removal.
- Configuration portal save/reconnect behavior.
- Receiver restart while sender continues running.

## Stability test targets

- 8-hour continuous playback at 48 kHz stereo.
- 8-hour continuous playback at 96 kHz stereo.
- 192 kHz endurance and replay validation once the higher-rate receiver path is
  validated.
- WLAN reconnect during active USB stream.
- Receiver unavailable at boot, then available later.
- Packet-loss impairment at controlled percentages.

## Release evidence

Each release candidate should include:

- firmware build command and output summary,
- git revision,
- board model,
- ESP-IDF or PlatformIO version,
- host OS and USB Audio mode,
- receiver version,
- sample-rate matrix,
- packet-loss and underrun summary,
- known limitations.
