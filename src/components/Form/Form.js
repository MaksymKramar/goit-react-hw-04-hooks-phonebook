import { useState } from "react";
import Button from "../Button/Button";
import { v4 as unId } from "uuid";
import { CustomForm, Input } from "./Form.style";

function Form({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const nameInputId = unId();
  const numInputId = unId();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;

      default:
        break;
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        <Input
          id={nameInputId}
          placeholder="Name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          onChange={handleChange}
          value={name}
        />
      </label>
      <label htmlFor={numInputId}>
        <Input
          id={numInputId}
          placeholder="Tel"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          onChange={handleChange}
          value={number}
        />
      </label>
      <Button text="Add contact" type="submit" />
    </CustomForm>
  );
}

export default Form;
