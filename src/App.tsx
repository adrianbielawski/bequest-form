import './App.css';
import FormPage from 'components/FormPage';
import { AddressesContext, initialState, reducer } from 'store';
import { useReducer } from 'react';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = {
    state,
    dispatch,
  }

  return (
    <AddressesContext.Provider value={contextValue}>
      <div className="App">
        <FormPage />
      </div>
    </AddressesContext.Provider>
  );
}

export default App;
