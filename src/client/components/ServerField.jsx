import React, { useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GraphContext } from '../contexts/GraphContext';

const ServerField = () => {
  // Pull state into component from ApolloContext using 'useContext' hook
  const [info, setInfo] = useContext(GraphContext);

  // Invokes query to the Apollo client
  function handleClick(e) {
    e.preventDefault();

    // Gather user input from 'Server', 'Query', and 'Variables' input fields
    const userURI = document.getElementById('server-input').value;
    //const userBody = document.getElementById('query-input').value;
    //const userVariables = document.getElementById('variable-input').value;

    // Instantiate a new Apollo Client corresponding to the Apollo Server located @ uri
    const client = new ApolloClient({
      uri: userURI,
      cache: new InMemoryCache(),
    });

    // Format and send the user's query to the Apollo Server
    client
      .query({
        query: gql`
          ${info.body}
        `,
      })
      .then((res) => {
        // setInputs(prevInputs => Object.assign(prevInputs, {response: res.data.rates}));
        setInfo(() => ({
          ...info,
          response: res.data,
        }));
      })
      .catch(() => {
        setInfo(() => ({
          ...info,
          response: 'Query failed.',
        }));
      });
  }

  return (
    <div className="server-field">
      <form>
        <label>
          Query: 
          <input id="server-input" className="input" type="text" defaultValue={info.uri} />
        </label>
        <button id="submit-query" className="btn-gray" type="submit" onClick={handleClick}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ServerField;
