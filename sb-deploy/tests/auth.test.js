const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

function waitForServer(url, timeoutMs = 8000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tryFetch = () => {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() - started > timeoutMs) {
            reject(new Error(`Server did not start at ${url}`));
            return;
          }
          setTimeout(tryFetch, 200);
        });
    };
    tryFetch();
  });
}

test('admin login endpoint issues a token', async () => {
  const server = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: '3101' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let stderr = '';
  server.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  try {
    await waitForServer('http://127.0.0.1:3101/');

    const response = await fetch('http://127.0.0.1:3101/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'admin', pass: 'Admin@1234' })
    });

    const body = await response.json();
    assert.equal(response.status, 200);
    assert.ok(body.token, 'expected a JWT token');
  } finally {
    server.kill('SIGTERM');
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  if (stderr.includes('EADDRINUSE')) {
    throw new Error(`Server failed to start: ${stderr}`);
  }
});
