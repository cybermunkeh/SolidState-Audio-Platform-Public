# ESP to LP10 Signal-Chain Result

This is the short, user-facing snapshot of the verified bit-perfect proof from
the ESP-facing UDP PCM stream to the LP10 capture path.

## Status

- Result: `Passed`
- Proof type: raw PCM hash comparison
- Transport scope: UDP only
- Sample rate in the proof fixture: `48000`
- Transport target for the broader PCM capability set: `192000`
- Payload bytes: `2880`

## Verified hashes

- Local SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`
- Remote SHA-256:
  `84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6`
- Match: yes

## Log excerpt

```text
Local payload hash:  84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6
Local payload bytes: 2880
Remote target:       <redacted-lp10-host> port 5013
Remote raw bytes:   2880
Remote raw hash:    84e4b3912496a3b81e6fbd14ad38d523f1060bf973c5c84c74eb580621c95fd6
Match: payload arrived on LP10 unchanged.
```

## Repro command

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File `
  .\tools\windows\test-esp-to-lp10-signalchain.ps1 `
  -Password '********'
```

## Notes

- The Windows LP10 endpoint installer is not required for this proof.
- The proof keeps the raw payload unchanged and does not add resampling, DSP,
  or gain processing.
