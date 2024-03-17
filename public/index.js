/*Kennedy Ninh & Hayden Perusek       300X HW5-2        3/17/2024*/
/*In this assignment, we have built a full-stack application with a Node/Express backend and a
simple HTML/CSS/JavaScript frontend.*/



// Function to fetch and display jokes from a category
//By: Hayden Perusek
const displayJokes = async (category) => {
  try {
    const response = await fetch(
      `/jokebook/joke/${encodeURIComponent(category)}`
    );
    if (response.ok) {
      const jokes = await response.json();
      const jokeDisplay = document.getElementById("joke-display");
      jokeDisplay.innerHTML = "";
      if (Array.isArray(jokes)) {
        jokes.forEach((joke) => {
          const jokeElement = document.createElement("div");
          jokeElement.innerHTML = `<p><strong>Joke:</strong> ${joke.joke}</p>
                                            <p><strong>Response:</strong> ${joke.response}</p>`;
          jokeDisplay.appendChild(jokeElement);
        });
      } else {
        console.error("Invalid response format:", jokes);
      }
    } else {
      const errorData = await response.json();
      console.error("Error fetching jokes:", errorData.error);
      // Display an appropriate message to the user, e.g., "Category not found"
    }
  } catch (error) {
    console.error("Error fetching jokes:", error);
  }
};

//By: Hayden Perusek
document.addEventListener("DOMContentLoaded", () => {
  // Event listener for form submission to add a new joke
  document
    .getElementById("add-joke-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const category = document.getElementById("category").value;
      const joke = document.getElementById("joke").value;
      const jokeResponse = document.getElementById("response").value;
      try {
        const fetchResponse = await fetch("/jokebook/joke/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category, joke, response: jokeResponse }),
        });
        const data = await fetchResponse.json();
        // Clear the form inputs after adding the joke
        document.getElementById("joke").value = "";
        document.getElementById("response").value = "";
        // Update the UI to display the new joke in the respective category
        displayJokes(category);
        console.log("New joke added:", data);
      } catch (error) {
        console.error("Error adding new joke:", error);
      }
    });

  displayCategories();
});

//By: Kennedy Ninh
// Function to fetch and display joke categories
const displayCategories = async () => {
  try {
    const response = await fetch("/jokebook/categories");
    const categories = await response.json();
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = "";

    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.classList.add("category-button");
      button.addEventListener("click", () => displayJokes(category));
      categoryList.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
