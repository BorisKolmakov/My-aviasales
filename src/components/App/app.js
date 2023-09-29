import React from 'react';

import Header from '../Header';
import SideBar from '../SideBar';
import TicketType from '../TicketType';
import TicketList from '../TicketList';

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <aside className="sidebar">
          <SideBar />
        </aside>
        <main className="content">
          <TicketType />
          <TicketList />
        </main>
      </div>
    </>
  );
}

export default App;
