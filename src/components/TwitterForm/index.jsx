import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartBar, faFilm, faImage, faMapMarkedAlt, faSmile } from '@fortawesome/free-solid-svg-icons';
import { tweet } from '../../api/tweet_api';

const TwitterForm = ({ onTweet, userName, userUsername, userAvatar }) => {
    const [content, setContent] = useState("");
    const textAreaRef = useRef();

    const handleSubmit = async () => {
        const trimmedContent = content.trim();
        const userId = localStorage.getItem('user_id');

        if (trimmedContent && userId) {
            const result = await tweet(userId, trimmedContent);
            if (result.success) {

                const newTweet = {
                    ...result.data,
                    name: userName,
                    username: userUsername,
                    avatar: userAvatar,
                    time: new Date().toLocaleString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                };
                onTweet(newTweet);  
                setContent(""); 
            } else {
                console.error(result.message);
            }
        } else {
            console.error("User ID or content is null.");
        }
    };

    return (
        <div className="border-b border-gray-800 p-4">
            <textarea
                placeholder="What's happening?"
                className="w-full bg-transparent text-white text-xl resize-none outline-none"
                ref={textAreaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-4">
                    <div><FontAwesomeIcon icon={faImage} className="text-blue-400 cursor-pointer" /></div>
                    <div><FontAwesomeIcon icon={faFilm} className="text-blue-400 cursor-pointer" /></div>
                    <div><FontAwesomeIcon icon={faChartBar} className="text-blue-400 cursor-pointer" /></div>
                    <div><FontAwesomeIcon icon={faSmile} className="text-blue-400 cursor-pointer" /></div>
                    <div><FontAwesomeIcon icon={faCalendarAlt} className="text-blue-400 cursor-pointer" /></div>
                    <div><FontAwesomeIcon icon={faMapMarkedAlt} className="text-blue-400 cursor-pointer" /></div>
                </div>
                <button
                    className="bg-blue-400 text-white font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200"
                    onClick={handleSubmit}
                >
                    Tweet
                </button>
            </div>
        </div>
    );
}

export default TwitterForm;
