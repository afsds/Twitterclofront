import React, { useState, useEffect } from 'react';

import Sidebar from '../Sidebar';
import TwitterForm from '../TwitterForm';
import Tweet from '../Tweet';
import Aside from '../Aside';

import { v4 } from "uuid";
import { getAvatar, getRandomImage } from '../../utils/generateImages';
import { fetchTweets } from '../../api/tweet_api';

const Home = () => {
    const [tweets, setTweets] = useState([]);

    // Random user information
    const userName = "User";

    useEffect(() => {
        const interval = setInterval(() => {
            addNewRandomTweets();
        }, 9000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const loadTweets = async () => {
            const result = await fetchTweets();
            if (result.success && Array.isArray(result.data)) {
                const updatedTweets = result.data.map(tweet => ({
                    ...tweet,
                    avatar: getAvatar(`user${tweet.id}@gmail.com`),
                    name: tweet.name,
                    username: `user${Math.floor(Math.random() * 1000)}`,
                    time: new Date(tweet.created_at).toLocaleString([], { 
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                }));
                setTweets(updatedTweets);
            } else {
                console.error("Fetched tweets are not an array:", result);
            }
        };
        loadTweets();
    }, []);

    const addNewRandomTweets = () => {
        const randomTweets = [
           "Cada dia é uma nova oportunidade para aprender e crescer. Qual será sua conquista hoje?",

"Pequenos momentos fazem a diferença. Aproveitando cada instante, um tweet de cada vez.",

"Espalhe alegria! Um sorriso pode transformar o seu dia e o de quem está ao seu lado.",

"Qual é a sua trilha sonora de hoje? Compartilhe a música que está embalando seu dia!",

"Se pudesse embarcar agora em uma viagem dos sonhos, para onde iria?",

"A vida é feita de detalhes especiais. Qual foi a sua pequena alegria hoje?",

"Está lendo algo interessante? Recomendações de livros são sempre bem-vindas!",

"Dicas para um dia produtivo: mantenha o foco, organize sua rotina e celebre as pequenas vitórias!",

"Hora de escolher: café ou chá? Qual sua bebida favorita para começar bem o dia?",

"Gratidão transforma nossa visão do mundo. Hoje, sou grato por… e você?"
        ];

        const randomTweet = randomTweets[Math.floor(Math.random() * randomTweets.length)];
        addNewTweet(randomTweet, Math.random() > 0.9);
    };

    const addNewTweet = (content, includeImage = false) => {
        const newTweet = {
            id: v4(),
            name: userName,
            username: `user${Math.floor(Math.random() * 1000)}`,
            avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
            content,
            time: new Date().toLocaleString([], {
                hour: '2-digit',
                minute: '2-digit'
            }),
            image: includeImage ? getRandomImage() : null,
            likes: 0,
            retweets: 0,
            comments: 0,
        };
        setTweets((prevTweets) => [newTweet, ...prevTweets]);
    }; 

    return (
        <div className='flex mx-auto max-w-7xl'>
            <Sidebar />
            <main className='flex-grow border-l border-r border-gray-700 max-w-xl'>
                <header className='sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm'>
                    <h2 className='px-4 py-3 text-xl font-bold'>For you</h2>
                </header>
                <TwitterForm
                    onTweet={(newTweet) => setTweets((prevTweets) => [newTweet, ...prevTweets])} 
                    userName={userName}
                    userUsername={`user${Math.floor(Math.random() * 1000)}`}
                    userAvatar= {getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`)}
                />
                <div>
                    {tweets.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            </main>
            <Aside />
        </div>
    );
}

export default Home;
