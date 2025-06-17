import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEllipsisH, faHeart, faRetweet, faUpload } from '@fortawesome/free-solid-svg-icons';
import { updateState } from '../../api/tweet_api';

const Tweet = ({ tweet }) => {
    const [comments, setComments] = useState(tweet.comments_count || 0);
    const [likes, setLikes] = useState(tweet.likes_count || 0);
    const [isLiked, setIsLiked] = useState(tweet.is_liked || false);
    const [isShared, setIsShared] = useState(tweet.is_shared || false);
    const [retweets, setRetweets] = useState(tweet.shares_count || 0);

    const handleAction = async (action) => {
        try {
            let updateData = {};
    
            switch (action) {
                case 'like':
                    const newLikes = isLiked ? likes - 1 : likes + 1;
                    setLikes(newLikes);
                    setIsLiked(!isLiked);
                    updateData.likes_count = newLikes;
                    break;
    
                case 'retweet':
                    const newRetweets = isShared ? Math.max(retweets - 1, 0) : retweets + 1;
                    setRetweets(newRetweets);
                    setIsShared(!isShared);
                    updateData.shares_count = newRetweets;
                    break;
    
                case 'comment':
                    setComments((prevComments) => prevComments + 1);
                    break;
    
                default:
                    return;
            }
    
            // Update the database with new state
            if (Object.keys(updateData).length > 0) {
                const updatedTweet = await updateState(tweet.id, updateData);

                setIsLiked(updatedTweet.is_liked);
                setIsShared(updatedTweet.is_shared); 

                console.log(updatedTweet);
            }
        } catch (error) {
            console.error("Error updating tweet interaction:", error);
        }
    };

    useEffect(() => {
        setComments(tweet.comments_count || 0);
        setLikes(tweet.likes_count || 0);
        setIsLiked(tweet.is_liked || false);
        setIsShared(tweet.is_shared || false);
        setRetweets(tweet.shares_count || 0);
    }, [tweet]);

    return (
        <div className="border-b border-gray-800 p-4 hover:bg-gray-800 transition duration-200">
            <div className="flex space-x-3">
                <img src={tweet.avatar} alt="user avatar" className="rounded-full w-12 h-12" />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="font-bold">{tweet.name}</span>
                            <span className="text-gray-500 ml-2">@{tweet.username}</span>
                            <span className="text-gray-500 ml-2">{tweet.time}</span>
                        </div>
                        <FontAwesomeIcon icon={faEllipsisH} className="text-grey-500" />
                    </div>
                    <p className='mt-2'>{tweet.content}</p>
                    {tweet.image && (
                        <img
                            src={tweet.image}
                            className='mt-3 rounded-2xl max-w-full h-auto'
                            alt='user image content'
                        />
                    )}
                    <div className='flex justify-between mt-4 text-gray-500'>
                        <div className='flex items-center cursor-pointer hover:text-blue-400'>
                            <FontAwesomeIcon icon={faComment} onClick={() => handleAction('comment')} />
                            <span className='ml-2'>{comments}</span>
                        </div>
                        <div className='flex items-center cursor-pointer hover:text-green-400'>
                            <FontAwesomeIcon icon={faRetweet} color={isShared ? '#4ADE80' : '#6B7280'} onClick={() => handleAction('retweet')} />
                            <span className='ml-2'>{retweets}</span>
                        </div>
                        <div className='flex items-center cursor-pointer hover:text-red-400'>
                            <FontAwesomeIcon icon={faHeart} color={isLiked ? 'red' : '#6B7280'} onClick={() => handleAction('like')} />
                            <span className='ml-2'>{likes}</span>
                        </div>
                        <div className='flex items-center cursor-pointer hover:text-blue-400'>
                            <FontAwesomeIcon icon={faUpload} onClick={() => handleAction('share')} />
                            <span className='ml-2'>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Tweet;
