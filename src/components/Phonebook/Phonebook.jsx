import ContactsList from '../ContactsList';
import ContactForm from '../ContactForm/';
import Filter from '../Filter';
import Spinner from '../Loader';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { contactsOperations, contactsSelectors } from '../../redux/contacts/';

const Phonebook = ({ isLoading, isError, fetchContacts }) => {
  // eslint-disable-next-line
  useEffect(() => fetchContacts(), []);

  return (
    <>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>Oops, we have some loading error! :(</p>
      ) : (
        <ContactsList />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  isLoading: contactsSelectors.getLoading(state),
  isError: contactsSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Phonebook);
