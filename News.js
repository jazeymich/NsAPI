const apikey = "e29b6b5347964ae8a43241755bdb6934";

const blogContainer = document.getElementById("blog-container");

/*
 if our function is unable to fetch the data it will throw an error
 */

const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();

  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);

      displayBlogs(articles);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error("error fetching random news", error);
    return [];
    /*
  it will return an empty array if it is unable to fetch the data
  */
  }
}

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error("error fetching random news", error);
    return [];
    /*
  it will return an empty array if it is unable to fetch the data
  */
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");

    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");

    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;

    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    description.textContent = article.description;

    const truncatedDescription =
      article.description.length > 120
        ? article.description.slice(0, 120) + "...."
        : article.description;

    description.textContent = truncatedDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const articles = await fetchRandomNews();

    displayBlogs(articles);

    console.log(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
