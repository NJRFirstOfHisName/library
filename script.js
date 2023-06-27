let myLibrary = [
    {
        author: 'JRR Tolkien',
        title: 'Lord of the Rings',
        pages: '1178',
        read: true,
        index: 0
    },
    {
        author: 'Frank Herbert',
        title: 'Dune',
        pages: '896',
        read: true,
        index: 1
    },
    {
        author: 'Charles Dickens',
        title: 'Great Expectations',
        pages: '512',
        read: false,
        index: 2
    }
];

class Book {
    constructor(author, title, pages, read, index) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.index = index;
    }

    info = () => {
        return(title + " by " + author + ", " + pages + " pages, ");
    }
}

// function Book(author, title, pages, read, index) {
//     this.author = author;
//     this.title = title;
//     this.pages = pages;
//     this.read = read;
//     this.index = index;
//     this.info = function() {
//         return(title + " by " + author + ", " + pages + " pages, ");
//     }
// }

function displayBooks() {
    document.getElementById('library').innerHTML = '';
    let i = 0;
    myLibrary.forEach((book) => {
        book.index = i;
        addBookToDisplay(book)
        i++;
    });
    const remove = document.querySelectorAll(".remove");
    remove.forEach((button) => {
        button.addEventListener('click', () => {
            removeBook(button.getAttribute('data-index'));
    })})
    const toggle = document.querySelectorAll(".toggle");
    toggle.forEach((button) => {
        button.addEventListener('click', () => {
            toggleRead(button.getAttribute('data-index'));
    })})
}

function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("yes-read").checked;
    let index = myLibrary.length;
    const book = new Book(author, title, pages, read, index);
    myLibrary.push(book);
    addBookToDisplay(book);
    document.getElementById("new-book").reset();
    displayBooks();
}

function addBookToDisplay(book) {
    var library = document.getElementById("library");
    var shelf = library.insertRow();
    let title = shelf.insertCell();
    let titleText = document.createTextNode(book.title);
    title.appendChild(titleText);
    let author = shelf.insertCell();
    let authorText = document.createTextNode(book.author);
    author.appendChild(authorText);
    let pages = shelf.insertCell();
    let pagesText = document.createTextNode(book.pages);
    pages.appendChild(pagesText);
    let read = shelf.insertCell();
    read.className = "read";
    let readText;
    if(book.read) {
        readText = document.createTextNode("Yes")
    } else {
        readText = document.createTextNode("No ")
    }
    read.appendChild(readText);
    let toggle = document.createElement('button');
    toggle.className = 'toggle';
    toggle.innerText = "Switch";
    toggle.dataset.index = book.index;
    read.appendChild(toggle);
    let remove = shelf.insertCell();
    let removeButton = document.createElement('button');
    removeButton.className = "remove";
    removeButton.innerText = "Remove";
    removeButton.dataset.index = book.index;
    remove.appendChild(removeButton);
}

function toggleForm() {
    const form = document.getElementById('new-book');

    if (form.style.display === 'none') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

function toggleRead(index) {
    index = parseInt(index);
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function removeBook(index) {
    index = parseInt(index);
    myLibrary.forEach((book) => {
        if(book.index === index) {
            myLibrary.splice(index, 1);
        }
    })
    displayBooks();
}

displayBooks();