import Form from "./components/Form/Form";
import Contacts from "./components/Contacts/Contacts";
import Filter from "./components/Filter/Filter";
import Section from "./components/Section/Section";
import useLocalStorage from "./hooks/useLocalStorage";

import { v4 as unId } from "uuid";
import "./App.css";

function App() {
  const [contacts, setContacts] = useLocalStorage("contacts", [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useLocalStorage("filter", "");

  const checkName = (contact, contacts) =>
    contacts.find((cont) =>
      cont.name.toLowerCase().includes(contact.name.toLowerCase())
    );

  const checkNumber = (contact, contacts) =>
    contacts.find((cont) => cont.number.includes(contact.number));

  const addContact = (e) => {
    const contact = {
      id: unId(),
      name: e.name,
      number: e.number,
    };
    checkName(contact, contacts)
      ? alert(`${contact.name} is already in your list`)
      : checkNumber(contact, contacts)
      ? alert(`${contact.number} is already in your list`)
      : setContacts([contact, ...contacts]);
  };

  const deleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  const changeFilter = (value) => setFilter(value);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className="mainContainer">
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter}></Filter>
        <Contacts
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        ></Contacts>
      </Section>
    </div>
  );
}

export default App;
