import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

test("tasks persist across add, list, done, and remove commands", () => {
    const cwd = mkdtempSync(join(tmpdir(), "todo-cli-"));
    const entry = fileURLToPath(new URL("../index.js", import.meta.url));
    const run = (...args) => spawnSync(process.execPath, [entry, ...args], {
        cwd, encoding: "utf8"
    });
    try {
        assert.match(run("list").stdout, /No tasks yet/);
        assert.equal(run("add", "Buy groceries").status, 0);
        assert.match(run("list").stdout, /1\. \[ \] Buy groceries/);
        assert.equal(run("done", "1").status, 0);
        assert.match(run("list").stdout, /1\. \[x\] Buy groceries/);
        assert.equal(run("remove", "1").status, 0);
        assert.match(run("list").stdout, /No tasks yet/);
        assert.equal(run("add").status, 1);
        assert.equal(run("done", "99").status, 1);
        assert.equal(run("unknown").status, 1);
    } finally {
        rmSync(cwd, { recursive: true, force: true });
    }
});
