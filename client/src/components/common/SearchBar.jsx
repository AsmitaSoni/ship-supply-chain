import { Form } from "react-bootstrap";

function SearchBar({ value, onChange }) {
  return (
    <Form.Control
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBar;