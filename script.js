/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
const myLibrary = [
  {
    author: "JRR Tolkien",
    title: "Lord of the Rings",
    pages: "1178",
    read: true,
    index: 0,
  },
  {
    author: "Frank Herbert",
    title: "Dune",
    pages: "896",
    read: true,
    index: 1,
  },
  {
    author: "Charles Dickens",
    title: "Great Expectations",
    pages: "512",
    read: false,
    index: 2,
  },
];

class Book {
  constructor(author, title, pages, read, index) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.index = index;
  }

  info = () => `${this.title} by ${this.author}, ${this.pages} pages, `;
}

function checkValid() {
  document.getElementById("submitBtn").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    if (title && author && pages) {
      addBookToLibrary();
      toggleForm();
    }
  });
}

function addBookToDisplay(book) {
  const library = document.getElementById("library");
  const shelf = library.insertRow();
  const title = shelf.insertCell();
  const titleText = document.createTextNode(book.title);
  title.appendChild(titleText);
  const author = shelf.insertCell();
  const authorText = document.createTextNode(book.author);
  author.appendChild(authorText);
  const pages = shelf.insertCell();
  const pagesText = document.createTextNode(book.pages);
  pages.appendChild(pagesText);
  const read = shelf.insertCell();
  read.className = "read";
  let readText;
  if (book.read) {
    readText = document.createTextNode("Yes");
  } else {
    readText = document.createTextNode("No ");
  }
  read.appendChild(readText);
  const toggle = document.createElement("button");
  toggle.className = "toggle";
  toggle.innerText = "Switch";
  toggle.dataset.index = book.index;
  read.appendChild(toggle);
  const remove = shelf.insertCell();
  const removeButton = document.createElement("button");
  removeButton.className = "remove";
  removeButton.innerText = "Remove";
  removeButton.dataset.index = book.index;
  remove.appendChild(removeButton);
}

function removeBook(index) {
  const i = parseInt(index, 10);
  myLibrary.forEach((book) => {
    if (book.index === i) {
      myLibrary.splice(i, 1);
    }
  });
  displayBooks();
}

function displayBooks() {
  document.getElementById("library").innerHTML = "";
  let i = 0;
  myLibrary.forEach((book) => {
    this.index = i;
    addBookToDisplay(book);
    i += 1;
  });
  const remove = document.querySelectorAll(".remove");
  remove.forEach((button) => {
    button.addEventListener("click", () => {
      removeBook(button.getAttribute("data-index"));
    });
  });
  const toggle = document.querySelectorAll(".toggle");
  toggle.forEach((button) => {
    button.addEventListener("click", () => {
      toggleRead(button.getAttribute("data-index"));
    });
  });
}

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("yes-read").checked;
  const index = myLibrary.length;
  const book = new Book(author, title, pages, read, index);
  myLibrary.push(book);
  addBookToDisplay(book);
  document.getElementById("new-book").reset();
  displayBooks();
}

function toggleForm() {
  const form = document.getElementById("new-book");

  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

function toggleRead(index) {
  const i = parseInt(index, 10);
  myLibrary[i].read = !myLibrary[i].read;
  displayBooks();
}

displayBooks();
