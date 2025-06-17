import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBookmark, faEllipsisH, faEnvelope, faFeatherAlt, faHashtag, faHome, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { logout } from '../../api/login_api'

const NavItem = ({ icon, text }) => {
    return (
        <div className='flex items-center p-3 rounded-full cursor-pointer hover:bg-gray-600 transition duration-200'>
            <FontAwesomeIcon icon={icon} className='text-2xl mr-4' />
            <span className='text-xl hidden xl:inline'>{text}</span>
        </div>
    )
}

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            navigate('/');
        } else {
            alert(result.message || "Erro ao fazer logout.");
        }
    };

    return (
        <div className="w-20 xl:w-64 sticky top-0 px-2 h-screen">
            <FontAwesomeIcon icon={faTwitter} className='text-blue-400 text-3xl m-4' />
            <nav>
                <NavItem icon={faHome} text="Home" />
                <NavItem icon={faHashtag} text="Explore" />
                <NavItem icon={faBell} text="Notifications" />
                <NavItem icon={faEnvelope} text="Messages" />
                <NavItem icon={faBookmark} text="Bookmarks" />
                <NavItem icon={faUserFriends} text="Communities" />
                <NavItem icon={faTwitter} text="Premium" />
                <NavItem icon={faUser} text="Profile" />
                <NavItem icon={faEllipsisH} text="More" />
            </nav>
            <Link to="/">
                <button className='bg-white-400 text-white rounded-full font-bold px-4 mt-4 py-3 w-full cursor-pointer'>
                    <FontAwesomeIcon icon={faFeatherAlt} className='text-blue-400 text-3xl m-4 inline xl:hidden' />
                    <span className='hidden xl:inline'>Xtwitt</span>
                </button>
            </Link>
        </div>
    )
}

export default Sidebar