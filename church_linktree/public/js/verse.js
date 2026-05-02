//Resposible for on thing only: Displaying a random Bible verse

//this function run as soon as the page loads

async function loadVerse() {
  try {
    // fetch a random verse from the API bible-api.com
    // free API - no need for a token
    const response = await fetch("https://bible-api.com/data/web/random/NT");
    const data = await response.json();
    const verse = data.random_verse;
    console.log(verse);

    document.getElementById(
      "verse-text"
    ).textContent = `"${verse.text.trim()}"`;

    document.getElementById(
      "verse-ref"
    ).textContent = `— ${verse.book} ${verse.chapter}:${verse.verse}`;
  } catch (error) {
    document.getElementById("verse-text").textContent =
      '"For God so loved the world that he gave his one and only Son."';
    document.getElementById("verse-ref").textContent = "— John 3:16";
    console.log("Error loading verse:", error);
  }
}

loadVerse();
