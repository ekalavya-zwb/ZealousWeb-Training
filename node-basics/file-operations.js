const fs = require("fs").promises;

async function readFile() {
  try {
    const data = await fs.readFile("notes.txt", "utf8");
    console.log("File Content:", data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("File not found!");
    } else {
      console.error("Error:", error.message);
    }
  }
}

readFile();

const fs = require("fs").promises;

async function appendFile() {
  const data =
    "\nThe domestic cat is the only domesticated species of the family Felidae.";
  try {
    await fs.appendFile("notes.txt", data);
    console.log("Content added successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

appendFile();
