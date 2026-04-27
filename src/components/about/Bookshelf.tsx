import BentoBlock from "./BentoBlock";

const books = [
  {
    title: "Caps Lock",
    author: "Ruben Pater",
    /* TODO: Bran polish — write line on what this book changed for you */
    line: "[BOOK_LINE_PLACEHOLDER]",
  },
  {
    title: "Work: A History of How We Spend Our Time",
    author: "James Suzman",
    /* TODO: Bran polish — write line on what this book changed for you */
    line: "[BOOK_LINE_PLACEHOLDER]",
  },
  {
    title: "On the Genealogy of Morals",
    author: "Friedrich Nietzsche",
    /* TODO: Bran polish — write line on what this book changed for you */
    line: "[BOOK_LINE_PLACEHOLDER]",
  },
];

export default function Bookshelf() {
  return (
    <BentoBlock>
      <h3 className="type-body font-medium text-text-primary">
        These books changed my mind.
      </h3>
      <ul className="flex flex-col gap-5">
        {books.map((book) => (
          <li key={book.title} className="flex flex-col gap-1">
            <p className="type-label text-text-primary">
              <span className="font-medium">{book.title}</span>
              <span className="text-text-secondary"> · {book.author}</span>
            </p>
            <p className="type-label text-text-secondary">{book.line}</p>
          </li>
        ))}
      </ul>
    </BentoBlock>
  );
}
