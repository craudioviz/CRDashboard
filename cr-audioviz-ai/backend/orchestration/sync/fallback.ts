export function handleMissingEnv(key: string, avatar: string) {
  console.warn(`⚠️ ${key} is missing. Triggering fallback protocol for ${avatar}.`);

  switch (avatar.toLowerCase()) {
    case 'crai':
      return 'CRAI fallback: default orchestration mode activated.';
    case 'javari':
      return 'Javari fallback: emotional telemetry paused.';
    case 'kairo':
      return 'Kairo fallback: contributor scoring disabled.';
    case 'vizara':
      return 'Vizara fallback: campaign sync offline.';
    case 'nova':
      return 'Nova fallback: content engine in safe mode.';
    default:
      return 'Generic fallback: system running in degraded mode.';
  }
}
