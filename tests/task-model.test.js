import test from "node:test";
import assert from "node:assert/strict";

import { validateTitle,validateTask } from "../src/task-model.js";

test("should normalize a valid title", () => {
    const result = validateTitle("  Learn JS  ");

    assert.equal(result, "Learn JS");
});

test("should reject an empty title", () => {
    assert.throws(() => validateTitle(""), RangeError);
});

test("should reject non-string input", () => {
    assert.throws(() => validateTitle(123), TypeError);
});

test("should reject a title longer than 200 characters", () => {
    assert.throws(
        () => validateTitle("a".repeat(201)),
        RangeError
    );
});

test("should accept a title with exactly 200 characters", () => {
    assert.equal(validateTitle("a".repeat(200)).length, 200);
});

const validTask = {
  id: 1,
  title: "Learn JavaScript",
  completed: false,
  createdAt: "2026-11-03T08:00:00.000Z"
};
test("validateTask accepts a valid task", () => {
  const result = validateTask(validTask);

  assert.equal(result, true);
});
test("validateTask rejects negative ID", () => {
  const invalidTask = {
    ...validTask,
    id: -1
  };

  assert.throws(
    () => validateTask(invalidTask),
    RangeError
  );
});

test("validateTask rejects invalid completion status", () => {
  const invalidTask = {
    ...validTask,
    completed: "false"
  };

  assert.throws(
    () => validateTask(invalidTask),
    TypeError
  );
});

test("validateTask rejects invalid timestamps", () => {
  const invalidTask = {
    ...validTask,
    createdAt: "2026-02-30T08:00:00.000Z"
  };

  assert.throws(
    () => validateTask(invalidTask),
    RangeError
  );
});

test("validateTask rejects invalid timestamps", () => {
  const invalidTask = {
    ...validTask,
    title: null
  };

  assert.throws(
    () => validateTask(invalidTask),
    TypeError
  );
});

test("validateTask rejects invalid timestamps", () => {
  const invalidTask = {
    ...validTask,
    title: []
  };

  assert.throws(
    () => validateTask(invalidTask),
    TypeError
  );
});

test("validateTask rejects invalid timestamps", () => {
  const invalidTask = {
    ...validTask,
    title: ""
  };

  assert.throws(
    () => validateTask(invalidTask),
    RangeError
  );
});
