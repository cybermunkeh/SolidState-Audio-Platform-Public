# Release Evidence Template

Use this template for every firmware, receiver, or SDK release candidate.
Keep the filled version in the repository or in the release notes bundle so a
buyer or integrator can verify the current state without guessing.

## Candidate metadata

- Release name:
- Date:
- Git revision:
- Repository branch:
- Board model:
- Firmware / receiver version:
- PlatformIO or ESP-IDF version:
- Host OS:
- USB audio mode:
- Receiver host/device:

## Build evidence

- Firmware build command:
- Build result summary:
- Binary artifact path:
- Flash artifact path:
- Compiler warnings of interest:
- Known build exclusions:

## Transport evidence

- Sample rate tested:
- Bit depth tested:
- Channel count tested:
- PCM format tested:
- Packet loss summary:
- Duplicate packets:
- Late packets:
- Out-of-order packets:
- Jitter summary:
- Latency summary:
- ACK / status channel result:

## Bit-perfect evidence

- Input fixture or capture path:
- Output fixture or capture path:
- Hash algorithm:
- Input hash:
- Output hash:
- Match result:
- Notes on any fallback paths:
- ESP-to-LP10 bit-perfect proof:
- ESP-to-LP10 result snapshot:
- ESP-to-LP10 local hash:
- ESP-to-LP10 remote hash:
- ESP-to-LP10 payload bytes:
- ESP-to-LP10 status:

## Linux discovery smoke-test evidence

- Linux sender build command:
- Linux receiver build command:
- Discovery smoke-test command:
- Discovery log path:
- Sender log path:
- Receiver log path:
- Auto-selected receiver IP:
- Auto-selected receiver port:
- Discovery raw input hash:
- Discovery raw output hash:
- Discovery match result:

## USB and host evidence

- Host OS enumeration result:
- USB audio device name:
- Selected device format:
- Notes on phone / adapter combinations:
- Any observed host-side restrictions:

## Receiver evidence

- Receiver version:
- Receiver endpoint / port:
- ALSA or I2S backend used:
- Buffer fill summary:
- Underruns:
- Overruns:
- Recovery behavior:

## Known limitations

- Unverified assumptions:
- Partial test coverage:
- Hardware not yet validated:
- Follow-up work:

## Sign-off

- Prepared by:
- Reviewed by:
- Decision:
- Release tag / checksum:
