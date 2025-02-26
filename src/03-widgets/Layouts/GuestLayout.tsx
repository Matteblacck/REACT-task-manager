import { Outlet } from 'react-router-dom';
const GuestLayout = () => {
  return (
    <>
    <main>
        <Outlet />
    </main>
    </>
  );
};

export default GuestLayout;