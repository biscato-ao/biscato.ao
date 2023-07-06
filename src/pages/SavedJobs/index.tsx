import React, { useState } from 'react';
import { Menu } from '../../components/menu';
import Sidebar from 'react-sidebar';
// import { Container } from './styles';

const SavedJobs: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const onSetSidebarOpen = (open: boolean) => {
    setSidebarOpen(open);
  };

  return (
    <main className='mt-5 pt-5'>
      <Menu />

      <Sidebar
        sidebar={<b>Sidebar content</b>}
        open={sidebarOpen}
        onSetOpen={onSetSidebarOpen}
        styles={{ sidebar: { background: "white" } }}
      >
        <button  onClick={() => onSetSidebarOpen(true)}>
          Open sidebar
        </button>
      </Sidebar>
    </main>
  );
}

export default SavedJobs;
