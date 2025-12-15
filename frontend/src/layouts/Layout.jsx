import Header from '@/components/Header'
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className={`flex-1 ${!isHomePage ? 'container mx-auto py-10' : ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Layout;