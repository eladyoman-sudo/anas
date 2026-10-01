// Seedance 2.5 text-to-video example using the official Higgsfield SDK (v2 client).
// Credentials come from HF_CREDENTIALS (key-id:key-secret), loaded from .env.local at
// runtime when the variable is not already set. The value is never printed.
import { config as loadEnv } from 'dotenv';
import {
  APIError,
  AuthenticationError,
  BadInputError,
  NotEnoughCreditsError,
  TimeoutError,
  ValidationError,
  createHiggsfieldClient,
} from '@higgsfield/client/v2';

loadEnv({ path: '.env.local', quiet: true });

const MODEL = 'bytedance/seedance-2.5/text-to-video';

function credentialsLookValid(value: string | undefined): value is string {
  if (!value) return false;
  const parts = value.split(':');
  return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
}

// Never print raw error objects: network errors from the SDK's HTTP client carry the
// request config, including the Authorization header.
function describeError(err: unknown): string {
  if (err instanceof NotEnoughCreditsError) {
    // The SDK maps every HTTP 403 to NotEnoughCreditsError, including a proxy or
    // firewall refusing the connection, so don't assert which one it was.
    return 'HTTP 403: either the Higgsfield account has too few credits, or a proxy or firewall blocked api.higgsfield.ai.';
  }
  if (err instanceof ValidationError || err instanceof BadInputError) {
    return `The API rejected the input (HTTP ${err.statusCode}): ${err.message}`;
  }
  if (err instanceof APIError) {
    return `API error (HTTP ${err.statusCode ?? 'unknown'}): ${err.message}`;
  }
  if (err instanceof AuthenticationError) {
    return 'Authentication failed (HTTP 401). Check HF_CREDENTIALS.';
  }
  if (err instanceof TimeoutError) {
    // The SDK only stops polling on completed, failed, or nsfw, so a canceled
    // request also ends up here.
    return `${err.message}. The request may still be running, or it was canceled. Check the Higgsfield console.`;
  }
  if (err instanceof Error) {
    return `${err.name}: ${err.message}`;
  }
  return 'Unknown error';
}

async function main(): Promise<number> {
  const credentials = process.env.HF_CREDENTIALS;
  if (!credentialsLookValid(credentials)) {
    console.error(
      'HF_CREDENTIALS is missing or not in key-id:key-secret format. Add it to .env.local (see .env.example).',
    );
    return 1;
  }

  const client = createHiggsfieldClient({
    credentials,
    // Never let the SDK re-send this billable request after a timeout or 5xx.
    maxRetries: 0,
    pollInterval: 5_000,
    maxPollTime: 15 * 60_000,
  });

  console.log(`Submitting ${MODEL} and waiting for it to finish...`);
  const result = await client.subscribe(MODEL, {
    input: {
      prompt: 'A cinematic scene at sunset',
      duration: 5,
      resolution: '720p',
      aspect_ratio: '16:9',
    },
    withPolling: true,
  });

  // The SDK's status type has no "canceled", so compare as a plain string.
  const status: string = result.status;
  switch (status) {
    case 'completed': {
      const url = result.video?.url;
      if (!url) {
        console.error(`Request ${result.request_id} completed but returned no video URL.`);
        return 1;
      }
      console.log(`Request ${result.request_id} completed.`);
      console.log(`Video URL: ${url}`);
      return 0;
    }
    case 'failed':
      console.error(`Request ${result.request_id} failed.`);
      return 1;
    case 'nsfw':
      console.error(`Request ${result.request_id} was blocked by content moderation.`);
      return 1;
    case 'canceled':
    case 'cancelled':
      console.error(`Request ${result.request_id} was canceled.`);
      return 1;
    default:
      console.error(`Request ${result.request_id} ended with unexpected status "${status}".`);
      return 1;
  }
}

main().then(
  (code) => {
    process.exitCode = code;
  },
  (err: unknown) => {
    console.error(describeError(err));
    process.exitCode = 1;
  },
);
