//NavBar + <Outlet />
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;