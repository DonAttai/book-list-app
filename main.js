const form = document.querySelector("#book-form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const publisher = document.querySelector("#publisher");
const bookList = document.querySelector("#book-list");

let books = [];

//add event to form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const book = {
    id: Date.now().toString(),
    title: title.value,
    author: author.value,
    publisher: publisher.value,
  };
  addBook(book);
});

//function to add a book
function addBook(book) {
  if (book.title == "" || book.author == "" || book.publisher == "") {
    showAlert("Please, fill in all fields", "danger");
  } else {
    books.push(book);
    addToLocalStorage(books);
    showAlert("Book was added successfully", "success");

    title.value = "";
    author.value = "";
    publisher.value = "";
  }
}

//function to render books on the page
function renderBooks(books) {
  bookList.innerHTML = " ";
  books.forEach((book) => {
    //create table row
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", book.id);
    tr.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.publisher}</td>
  <td><button class="btn btn-sm btn-danger delete">X</button></td>
  `;
    bookList.append(tr);
  });
}

// function to add books to localStorage
function addToLocalStorage(books) {
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks(books);
}

//function to get books from localStorage
function getFromLocalStorage() {
  const storedBooks = localStorage.getItem("books");
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    renderBooks(books);
  }
}

getFromLocalStorage();

// show alert function
function showAlert(message, className) {
  const card = document.querySelector(".card");
  const div = document.createElement("div");
  div.className = `alert alert-${className} text-center p-0 m-0`;
  div.append(document.createTextNode(message));
  card.insertBefore(div, form);

  // remove alert after 2 seconds
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 2000);
}

//function to delete book
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  addToLocalStorage(books);
}
//delete book
bookList.addEventListener("click", removeBook);
function removeBook(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      const id = e.target.parentElement.parentElement.getAttribute("data-id");
      deleteBook(id);
    }
  }
}
