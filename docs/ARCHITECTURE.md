# SolidState Audio Platform Architecture

## Current baseline

The current firmware is an ESP32-S3 USB Audio to Wi-Fi gateway. It builds from
repo-owned application code in `main/main.c`, `main/usb_audio_app.c`, and
`main/usb_descriptors.c`, plus local gateway, diagnostics, discovery, and PCM
transport modules.
The protocol capability layer already advertises 16/24/32-bit PCM across
44.1/48/88.2/96/176.4/192 kHz. The USB host-facing profile keeps a
mobile-friendly UAC1 stereo 16-bit 44.1/48 kHz path for immediate Android and
iOS recognition, while the high-speed UAC2 branch now advertises 192 kHz as the
upper ceiling for capable hosts.

```text
USB host
  -> ESP32-S3 native USB-OTG
  -> TinyUSB audio receive FIFO
  -> audio_task() reads complete PCM bytes
  -> gateway_submit_pcm()
  -> bounded FreeRTOS queue
  -> pcm_sender_send_frames()
  -> UDP receiver
```

## Bit-perfect boundary

The bit-perfect core starts at the bytes returned by `tud_audio_read()` and
ends at the UDP payload emitted by `pcm_sender_send_frames()`. Within this
boundary the platform must not:

- interpret sample values for processing,
- apply gain, mute, volume, EQ, mixing, or limiting,
- resample,
- change sample container width,
- change endianness,
- drop or insert samples except when a whole UDP block is dropped due to
  transport failure.

The USB Audio control surface may expose host mute/volume controls for
enumeration compatibility, but those controls must not alter forwarded PCM.

## Current modules

- `main/main.c`: local USB Audio device entrypoint and startup wrapper.
- `main/usb_audio_app.c`: local USB Audio device loop and PCM capture
  integration.
- `main/usb_descriptors.c`: local USB Audio descriptors.
- `main/gateway.c`: setup WLAN, stored receiver configuration, HTTP status UI,
  PCM queue, sender lifecycle.
- `components/pcm_transport/pcm_sender.c`: UDP packetization with transport
  metadata and payload CRC.
- `main/pcm_transport_protocol.c`: shared protocol constants, sample-rate
  masks, CRC32, naming helpers, and capability defaults for the full protocol
  PCM matrix.
- `main/diagnostics.c`: in-memory runtime diagnostic snapshot and JSON output.
- `main/device_discovery.c`: placeholder discovery lifecycle.
- `components/rtp/rtp_sender.c`: RTP-compatible sender path retained for
  compatibility experiments; not currently registered in the firmware build.

## Product architecture target

The product should evolve into separable layers:

```text
usb_audio_adapter/
pcm_transport_core/
network_sender/
receiver_core/
jitter_buffer/
clock_sync/
diagnostics_api/
oem_sdk/
```

The first extraction target is `pcm_transport_core`: packet layout, validation,
frame sizing, CRC, and capability metadata should be unit-testable without
ESP-IDF, Wi-Fi, or TinyUSB.

## Assumptions

- Initial product hardware is ESP32-S3 class hardware with native USB-OTG.
- Initial receiver is an IPv4 UDP endpoint under OEM or integrator control.
- Stereo PCM is the first supported product profile.
- 44.1/48 kHz remain the mobile-safe USB-visible rates for UAC1 enumeration,
  while the high-speed UAC2 branch advertises 88.2/96/176.4/192 kHz.
- 88.2/96/176.4/192 kHz are exposed on the high-speed UAC2 path, with 192 kHz
  as the documented transport target.
- Transport reliability remains best-effort until receiver diagnostics and
  jitter-buffer behavior are implemented.

## Technical debt

- TinyUSB is retained only as source provenance. The build now consumes
  repo-owned USB audio sources and treats TinyUSB as a dependency.
- Discovery currently logs static identity only; it does not broadcast
  receiver or sender capabilities.
- Diagnostics now carry live packet-loss, jitter, buffer-fill, and underrun
  snapshots, but RSSI and some queue-depth fields still need broader firmware
  wiring on all target paths.
- Host-side unit tests now exist for packet sizing, CRC, JSON formatting, and
  bit-preservation contracts, but the matrix should still expand for more
  network and receiver conditions.
