// // endpoints
// GET all users: https://jsonplaceholder.typicode.com/users
// GET all posts: https://jsonplaceholder.typicode.com/posts

//  Write a function that does a GET request on both endpoints and returns all users in this structure:

//  { id: Number, username: String, posts: Array }
//  for posts, find all posts by userId
// Note: You need to use javascript es7 features. Time limit 15 minutes.

// Function to fetch data from the provided endpoints and return the structured data
async function fetchAndProcessData() {
  try {
    // - Here I am Fetching Users and posts data parallely
    const [usersResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    // Now usersResponse & postsResponse contain the responses from the get requests to both of these fetched APIs

    console.log(usersResponse);
    console.log(postsResponse);

    // Here I am parsing the responses to JSON, because by default every response from the API consists of a readable stream, not a direct JSON object
    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    console.log(users);
    console.log(posts);

    console.log(typeof users);
    console.log(typeof posts);

    // Map users to the desired structure
    const usersWithPosts = users.map((user) => ({
      id: user.id,
      username: user.username,
      posts: posts.filter((post) => post.userId === user.id),
    }));

    return usersWithPosts;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Function to generate table rows and insert into the HTML
async function generateTable() {
  const data = await fetchAndProcessData();

  // Get the table body element
  const tbody = document.querySelector("tbody");

  // Clear existing rows
  tbody.innerHTML = "";

  // Create new rows for each user
  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row"  >${user.id}</th>
      <td class="text-center" >${user.username}</td>
      <td  >${user.posts.map((post) => post.title).join(", ")}</td>
    `;
    tbody.appendChild(row);
  });
}

// Call the function to generate the table on page load
generateTable();
