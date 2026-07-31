# ESP to LP10 Signal-Chain Evidence

This document records a verified raw PCM proof from the ESP32-side UDP stream
to the LP10 receiver path.

## What was verified

- The ESP32-side PCM fixture was sent as raw UDP PCM.
- The LP10 receiver captured the stripped raw payload.
- The local SHA-256 hash and remote SHA-256 hash matched exactly.
- The proof was performed without installing the Windows LP10 endpoint driver.

## Reproducible command

Run the repo wrapper from Windows PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File `
  C:\development\esp32-usb-audio-rtp\tools\windows\test-esp-to-lp10-signalchain.ps1 `
  -Password '********'
```

The wrapper delegates to `tools/windows/test-lp10-pcm-hash.ps1`.

## Verified parameters

- LP10 host: private LAN evaluation target (redacted in the public record)
- SSH user: recorded in the private lab notes
- UDP port: `5013`
- Transport header bytes: `48`
- PCM payload bytes: `2880`
- Sample rate: `48000`
- Channels: `2`
- SSH host key fingerprint: recorded in the private lab notes

## Result

- Local SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`
- Remote SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`
- Match: yes
- Status: `Passed`

## Recorded log excerpt

The Windows proof script prints the following verification lines when the
LP10 capture path is healthy:

```text
Local payload hash:  84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6
Local payload bytes: 2880
Remote target:       <redacted-lp10-host> port 5013
Remote raw bytes:   2880
Remote raw hash:    84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6
Match: payload arrived on LP10 unchanged.
```

## Interpretation

The raw PCM payload arrived on the LP10 unchanged. This confirms the test
chain from the ESP-facing transport fixture to the LP10 raw capture path
preserved the payload byte-for-byte for this fixture.

## Notes

- The Windows LP10 endpoint installer is not required for this proof.
- The test uses a deterministic payload unless `-PcmPath` is supplied.
- No sample conversion, resampling, or mixer path is part of this proof.
