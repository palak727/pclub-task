import test from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import { isIITKEmail, register, login } from '../controllers/authController.js';
import { setMemoryMode, memoryStore } from '../store/memoryStore.js';

test('IITK email validation accepts valid campus email', () => {
  assert.equal(isIITKEmail('student@iitk.ac.in'), true);
});

test('IITK email validation rejects non-campus email', () => {
  assert.equal(isIITKEmail('student@gmail.com'), false);
});

test('register rejects invalid non-IITK email', async () => {
  setMemoryMode(true);
  memoryStore.users = [];

  let payload;
  await register(
    { body: { name: 'Test User', email: 'student@gmail.com', password: 'password123' } },
    { status(code) { this.code = code; return this; }, json(data) { payload = data; } }
  );

  assert.equal(payload.message.includes('Only @iitk.ac.in'), true);
});

test('login succeeds for valid memory-mode user', async () => {
  setMemoryMode(true);
  memoryStore.users = [];
  const password = 'secret123';
  const hashed = await bcrypt.hash(password, 10);
  memoryStore.users.push({
    id: 'u-1',
    _id: 'u-1',
    name: 'Alice',
    email: 'alice@iitk.ac.in',
    password: hashed,
    hall: 'Hall 1',
    year: 'Y22',
  });

  let tokenPayload;
  await login(
    { body: { email: 'alice@iitk.ac.in', password } },
    { json(data) { tokenPayload = data; } }
  );

  assert.ok(tokenPayload.token);
  assert.equal(tokenPayload.user.email, 'alice@iitk.ac.in');
});
