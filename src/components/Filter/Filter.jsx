

const handleSearch = searchContact => e =>  {
    searchContact(e.target.value);
  };
  
  export const Filter = ({ searchContact, by }) => (
    <div style={{ width: '100%'}}>
      <input type="search" placeholder={`Find contacts by ${by}`} onChange={ handleSearch(searchContact(by))} />
    </div>
  )
  