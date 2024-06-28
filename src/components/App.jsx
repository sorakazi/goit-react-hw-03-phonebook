import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    findBy: 'name',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }


  addContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  searchContact = fieldName => searchString => {
    this.setState(prevState => ({
      ...prevState,
      filter: searchString,
      findBy: fieldName,
    })
  )};

  handleFindBy = e => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      findBy: prevState.findBy === 'name' ? 'number' : 'name'
    }));
  };

  render() {
    const { contacts, filter, findBy } = this.state;
    const contactList = contacts
      .filter(c => findBy === '' ||  c[findBy].toLowerCase().includes(filter));

    return (
      <div className="container">
        <h1>Phonebook</h1>
        <div className="phonebook-container">
          <div>
          <h2>New Contact</h2>
          <ContactForm addContact={this.addContact} contacts={contacts} />
          </div>
          <div>
            <h2>Contacts</h2>
            <div style={{display: 'flex', flexDirection: 'row'}}>
            <button type="button" style={{ width: '75px' }} onClick={this.handleFindBy}>{findBy === 'name' ? 'ABC' : '123'}</button>
            <Filter by={findBy} searchContact={this.searchContact} />
            </div>
            <ContactList contacts={contactList} deleteContact={this.deleteContact} />
          </div>
        </div>
      </div>
    );
  }
}