import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve(process.cwd(), ".todo.json");
const [command = "help", ...args] = process.argv.slice(2);
const help = `Todo CLI

Usage: npm start -- <command> [arguments]

  add <text>    Add a task
  list          Show all tasks
  done <id>     Mark a task complete
  remove <id>   Remove a task
  help          Show this help

Tasks are saved in .todo.json in the current directory.`;

try {
    if (["help", "--help", "-h"].includes(command)) {
        console.log(help);
    } else {
        if (!["add", "list", "done", "remove"].includes(command)) {
            throw new Error(`Unknown command: ${command}. Run help for usage.`);
        }

        let tasks;
        try {
            tasks = JSON.parse(readFileSync(file, "utf8"));
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
            tasks = [];
        }
        if (!Array.isArray(tasks) || tasks.some(task =>
            !task || !Number.isSafeInteger(task.id) || task.id < 1 ||
            typeof task.text !== "string" || typeof task.done !== "boolean"
        )) {
            throw new Error("Invalid task data in .todo.json.");
        }

        let message;
        if (command === "list") {
            console.log(tasks.length
                ? tasks.map(task => `${task.id}. [${task.done ? "x" : " "}] ${task.text}`).join("\n")
                : "No tasks yet.");
        } else {
            if (command === "add") {
                const text = args.join(" ").trim();
                if (!text) throw new Error("Usage: add <text>");
                const id = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
                if (!Number.isSafeInteger(id)) throw new Error("Task ID limit reached.");
                tasks.push({ id, text, done: false });
                message = `Added task ${id}: ${text}`;
            } else {
                if (args.length !== 1 || !/^[1-9]\d*$/.test(args[0]) ||
                    !Number.isSafeInteger(Number(args[0]))) {
                    throw new Error(`Usage: ${command} <id>`);
                }
                const index = tasks.findIndex(task => task.id === Number(args[0]));
                if (index === -1) throw new Error(`Task ${args[0]} not found.`);
                if (command === "done") tasks[index].done = true;
                else tasks.splice(index, 1);
                message = `${command === "done" ? "Completed" : "Removed"} task ${args[0]}.`;
            }
            writeFileSync(file, JSON.stringify(tasks, null, 2) + "\n", "utf8");
            console.log(message);
        }
    }
} catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
}
