import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { fetchUsers, toggleFollowUser } from '../../api/follow';

import TrendItem from '../TrendItem';
import FollowItem from '../FollowItem';
import { fetchUser, updateUserPremiumStatus } from '../../api/login_api'; // Adicione uma função para buscar o usuário

const Aside = ({ currentUser }) => {
    const [isSubscribed, setSubscribed] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchPremiumStatus = async () => {
            const userId = localStorage.getItem('user_id');
            const response = await fetchUser(userId);
            if (response.success) {
                setSubscribed(response.data.is_premium);
            } else {
                console.error(response.message);
            }
        };

        const loadUsers = async () => {
            const response = await fetchUsers();
            if (response.success) {
                setUsers(response.data.map(user => ({
                    ...user,
                    isFollowing: user.is_following
                })));
            } else {
                console.error(response.message);
            }
        };

        fetchPremiumStatus(); 
        loadUsers();
    }, [currentUser]);

    const handleToggleFollow = async (userId) => {
        const response = await toggleFollowUser(userId);
        if (response.success) {
            setUsers(users.map(user =>
                user.id === userId ? { ...user, isFollowing: response.following } : user
            ));
        } else {
            console.error(response.message);
        }
    };

    const handleSubscribe = async () => {
        const userId = localStorage.getItem('user_id');

        const response = await updateUserPremiumStatus(userId);
        if (response.success) {
            setSubscribed(response.data.is_premium);
        } else {
            console.error(response.message);
        }
    };

    return (
        <aside className='hidden xl:block w-80 px-4'>
            <div className='sticky top-0 pt-2'>
                <div className='relative'>
                    <FontAwesomeIcon icon={faSearch} className='absolute top-3 left-3 text-grey-500' />
                    <input placeholder='Search Twitter' className='w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4' />
                </div>

                <div className='bg-gray-800 rounded-xl mt-4 p-4'>
                    <h2 className='font-bold text-xl mb-4'>Assine a assinatura premium!</h2>
                    <p className='text-gray-500 mb-4'>Assine para desbloquear novidades e se eleja para receber as novidades no capricho</p>
                    <button
                        className='bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200'
                        onClick={handleSubscribe}
                    >
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                </div>

                <div className='bg-gray-800 rounded-xl mt-4 p-4'>
                    <h2 className='font-bold text-xl mb-4'>O que está acontecendo</h2>
                    <TrendItem category="Famosos • LIVE" name="MC POZE É PRESO AO VIVO" tweetCount={undefined} />
                    <TrendItem category="Famosos • Trending" name="Separação de Zé felipe e Vírginia entenda o caso" tweetCount="4,098,871" />
                    <TrendItem category="Esportes • Trending" name="ACESSO NEGADO! Corinthians é eliminado da Sulamericana" tweetCount={undefined} />
                    <TrendItem category="Lifestyle • Trending" name="Ter Bebê Reborn é a moda do momento?" tweetCount="570,111" />
                    <TrendItem category="Esportes • Trending" name="Here Go! Cristiano Ronaldo é o novo jogador do Botafogo" tweetCount="1,000,621" />
                    <TrendItem category="Esportes • Trending" name="HISTORICO!!! Tyrese Haliburton escreve seu na história após game winner que consagrou o Indiana Pacers campeão da NBA" tweetCount="890,334" />
                </div>

                <div className='bg-gray-800 rounded-xl mt-4 p-4'>
                    <h2 className='font-bold text-xl mb-4'>Quem seguir</h2>
                    {users.map((user, index) => (
                        <FollowItem
                            key={user.id || index}
                            name={user.name}
                            username={user.name}
                            userId={user.id}
                            isFollowing={user.isFollowing}
                            onToggleFollow={() => handleToggleFollow(user.id)}
                        />
                    ))}
                </div>
            </div>
        </aside>
    )
}

export default Aside;
