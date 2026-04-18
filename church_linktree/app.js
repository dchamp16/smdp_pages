const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Tell Express to serve static files from the 'public' folder
// This is how our browser gets access to style.css
// Any file in /public is accessible at the URL directly
// e.g. public/style.css → http://localhost:3000/style.css
app.use(express.static(path.join(__dirname, "public")));

// Tell Express to use EJS as our templating engine
// EJS lets us write HTML with embedded JavaScript
// Express will look for .ejs files inside a 'views/' folder by default
app.set("view engine", "ejs");

// Explicitly tell Express where our views folder is
// __dirname = current directory (where app.js lives)
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.redirect("/links"));

// Our main route — handles GET requests to '/' (the homepage)
app.get("/links", async (req, res) => {
  try {
    // fetch a random new testmend verse from the free bible-api.com
    // no api key needed - completly free
    const response = await fetch("https://bible-api.com/data/web/random/NT");
    const data = await response.json();

    // pull first verse from the returned array
    const verse = data.random_verse;

    // res.render() → tells Express to find 'index.ejs' inside /views
    // and send it back as HTML to the browser
    // The second argument is an object of variables we pass INTO the template
    // Inside index.ejs, we can use these as <%= verseText %> and <%= verseRef %>
    res.render("index", {
      verseText: verse.text.trim(),
      verseRef: `${verse.book} ${verse.chapter}:${verse.verse}`,
    });
    console.log(
      `Fetched verse: ${verse.book} ${verse.chapter}:${
        verse.verse
      } - "${verse.text.trim()}"`
    );
  } catch (error) {
    // If there's an error (e.g. network issue), log it and show a default verse
    res.render("index", {
      verseText:
        "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      verseRef: "John 3:16",
    });
  }
});

app.use((req, res) => res.redirect("/links"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
