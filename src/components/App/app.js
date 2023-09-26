import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTickets, loadMore } from '../../redux/ticketsSlice';
import Header from '../Header';
import Spinner from '../Spinner';
import SideBar from '../SideBar';
import TicketType from '../TicketType';
import TicketList from '../TicketList';

function App() {
  const { copyTickets } = useSelector((state) => state.root.tickets);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, []);
  return (
    <>
      <Header />
      <Spinner />
      <div className="container">
        <aside className="sidebar">
          <SideBar />
        </aside>
        <main className="content">
          <TicketType />
          <TicketList />
          {copyTickets.length !== 0 ? (
            <button type="button" className="button" onClick={() => dispatch(loadMore(5))}>
              Показать еще 5 билетов!
            </button>
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
