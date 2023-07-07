const { Client } = require("pg");
const Quill = require("quill");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_CONNECTION_STRING,
});

client.connect();

async function saveContent(contentArray) {
  for (let i = 0; i < contentArray.length; i++) {
    const content = contentArray[i];
    await client.query("INSERT INTO quill_content (content) VALUES ($1)", [content]);
  }
}

const quillContentArray = [
  "Quill editor content 1",
  "Quill editor content 2",
  "Quill editor content 3",
  "Quill editor content 4",
  "Quill editor content 5",
  "Quill editor content 6",
  "Quill editor content 7",
  "Quill editor content 8",
  "Quill editor content 9",
  "Quill editor content 10",
  "Quill editor content 11",
  "Quill editor content 12",
  "Quill editor content 13",
  "Quill editor content 14",
  "Quill editor content 15",
  "Quill editor content 16",
  "Quill editor content 17",
  "Quill editor content 18" 
];

saveContent(quillContentArray)
  .then(() => {
    console.log("Content saved successfully!");
    client.end();
  })
  .catch((error) => {
    console.error("Error saving content:", error);
    client.end();
  });
