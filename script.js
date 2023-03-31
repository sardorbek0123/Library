// Get the form and the book list
const form = document.querySelector("form");
const bookList = document.querySelector("#book-list");

function toggleReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  render();
}

// Load the books from local storage
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

// // Book constructor
function Book(title, author, year, pages, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.pages = pages;
  this.read = read;
}

// Add a book to the library
function addBookToLibrary(book) {
  myLibrary.push(book);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  console.log(myLibrary);
}

// Render the book list
function render() {
  // Clear the book list
  bookList.innerHTML = "";

  // Render each book in the library
  myLibrary.forEach((book, index) => {
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.innerHTML = `<div class="py-4 border-b border-gray-300 max-w-lg mx-auto">
    <div class="flex items-center justify-between">
      <div class="text-lg font-medium text-gray-900">${book.title}</div>
      <div class="text-sm font-medium text-gray-500">${book.author}</div>
      <div class="text-sm font-medium text-gray-500">${book.year}</div>
      <div class="text-sm font-medium text-gray-500">${book.pages}</div>
      <div class="text-sm font-medium text-gray-500">${
        book.read ? "Read" : "Not Read"
      }
      </div>
    </div>
    <div>
      <button class="text-indigo-600 hover:text-indigo-900 mr-4 delete-button" data-index="${index}">Delete</button>
      <button class="text-indigo-600 hover:text-indigo-900 read-button" data-index="${index}">
        ${book.read ? "Mark as Not Read" : "Mark as Read"}
      </button>
    </div>
  </div>
  `;
    bookList.appendChild(li);
    // Add event listeners to the DELETE buttons
    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      render();
    });
    // Add event listeners to the READ buttons
    const readButton = li.querySelector(".read-button");
    readButton.addEventListener("click", () => {
      toggleReadStatus(index);
      console.log(myLibrary[index].read);
      myLibrary[index].read != myLibrary[index].read;
      // console.log(myLibrary[index].read);

      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });

    bookList.appendChild(li);
  });
}

// Add event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = form.title.value;
  const author = form.author.value;
  const year = form.year.value;
  const pages = form.pages.value;
  const read = form.read.checked;

  const book = new Book(title, author, year, pages, read);

  addBookToLibrary(book);

  form.reset();

  render();
});

// Render the book list
render();

document.querySelectorAll(".form-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const index = checkbox.getAttribute("data-index");
    toggleReadStatus(index);
  });
});

// TOGGLE FORM

const toggleFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form");

toggleFormButton.addEventListener("click", () => {
  bookForm.classList.toggle("hidden");
});

// BACKGROUND IMAGE SLIDER

const body = document.getElementById("body");
const images = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
];
let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  body.style.backgroundImage = `url(${images[currentIndex]})`;
}, 5000);
