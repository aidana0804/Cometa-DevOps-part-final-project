import React, { useState, useEffect } from "react";

const App = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('library-books') || '[]');
    setBooks(storedBooks);
  }, []);

  const addBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title,
      author
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('library-books', JSON.stringify(updatedBooks));

    setTitle("");
    setAuthor("");
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('library-books', JSON.stringify(updatedBooks));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.header}>Library Management</h1>
        <form onSubmit={addBook} style={styles.form}>
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Add Book
          </button>
        </form>
        <h2 style={styles.subHeader}>Book List</h2>
        <ul style={styles.list}>
          {books.map((book) => (
            <li key={book.id} style={styles.listItem}>
              <div style={styles.bookInfo}>
                <span style={styles.bookTitle}>{book.title}</span>
                <span style={styles.bookAuthor}>by {book.author}</span>
              </div>
              <button 
                onClick={() => deleteBook(book.id)}
                style={styles.deleteButton}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4ii',
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 123, 255, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '450px',
  },
  header: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '25px',
    fontSize: '24px',
    fontWeight: '600',
  },
  subHeader: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: '30px',
    marginBottom: '15px',
    fontSize: '18px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solidrgb(92, 142, 193)',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'background-color 0.3s ease',
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  bookTitle: {
    fontWeight: '600',
    color: '#007bff',
  },
  bookAuthor: {
    color: 'navy',
    fontSize: '18px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#dc3545',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  }
};

export default App;