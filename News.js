const apikey = "5e29b6b5347964ae8a43241755bdb6934";

const blogContainer = document.getElementById("blog-container");

/*
 if our function is unable to fetch the data it will throw an error
 */
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;

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
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.description;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
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
