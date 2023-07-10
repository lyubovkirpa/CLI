const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// Возвращает массив контактов.
function listContacts() {
  const data = fs.readFileSync(contactsPath, "utf8");
  return JSON.parse(data);
}

//Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
function getContactById(contactId) {
  const contacts = listContacts();
  const contactItem = contacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (!contactItem) {
    throw new Error("Contact not found");
  }
  return contactItem;
}

//Возвращает объект удаленного контакта. Возвращает null, если объект с таким id не найден.
function removeContact(contactId) {
  const contacts = listContacts();
  const index = contacts.findIndex(
    ({ id }) => id.toString() === contactId.toString()
  );
  if (index === -1) {
    throw new Error("There are no such contact");
  }
  const removedContact = contacts.splice(index, 1);
  const strContacts = JSON.stringify(contacts, undefined, " ");
  fs.writeFileSync(contactsPath, strContacts, "utf8");
  return removedContact;
}

//Возвращает объект добавленного контакта.
function addContact(name, email, phone) {
  const contacts = listContacts();
  const id = uuidv4();
  const newContact = { id, name, email, phone };
  const isExist = contacts.some((e) => e.id.toString() === id.toString());
  if (isExist) {
    throw new Error(`Contact with id: ${id} already exist`);
  }
  const newContacts = JSON.stringify([...contacts, newContact], undefined, " ");
  fs.writeFileSync(contactsPath, newContacts, "utf8");
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
