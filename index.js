const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  console.log(action);
  switch (action) {
    case "list":
      try {
        const result = listContacts();
        console.table(result);
      } catch (e) {
        console.error(e);
      }
      break;

    case "get":
      try {
        const result = getContactById(id);
        console.log(result);
      } catch (e) {
        console.error(e);
      }
      break;

    case "add":
      try {
        const result = addContact(name, email, phone);
        console.log(result);
      } catch (e) {
        console.error(e);
      }
      break;

    case "remove":
      try {
        const result = removeContact(id);
        console.log(result);
      } catch (e) {
        console.error(e);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
