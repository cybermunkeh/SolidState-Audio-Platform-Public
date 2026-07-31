# Linux Reference Evidence

This note records the first verified build-and-run result for the Linux
reference tools in this repository.

## Environment

- Host: Windows with WSL Linux userland
- Kernel reported by WSL: `Linux xps13 4.4.0-26100-Microsoft`
- Compiler: `cc`
- Python: `python3`

## Build

From `examples/linux/`:

```sh
cc -std=c11 -Wall -Wextra -I ../../main \
  pcm_linux_sender.c ../../main/pcm_transport_protocol.c \
  -o pcm-linux-sender

cc -std=c11 -Wall -Wextra -I ../../main \
  pcm_linux_receiver.c ../../main/pcm_transport_protocol.c ../../main/depacketizer.c \
  -o pcm-linux-receiver
```

The receiver now builds without ALSA development headers and keeps the ALSA
mirror path optional.

With ALSA development headers installed, the receiver also builds with
`-lasound`, and the optional mirror path passes against the ALSA `null`
device:

```text
loopback_smoke: ok
```

## Smoke tests

Both reference smoke tests passed in WSL:

```text
loopback_smoke: ok
discovery_loopback_smoke: ok
```

The tests now choose free UDP ports automatically when no ports are supplied.
That keeps the smoke tests reproducible even when the default ports are already
in use on the host.

## Notes

- The raw PCM preservation path is verified.
- The optional ALSA mirror path was verified against the ALSA `null` sink.
- This note is the first recorded Linux build-and-run evidence in the repo.
