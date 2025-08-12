import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookShareButton } from 'react-share';
// import Overstate from '../Overstate/Overstate';

const GuideProfile = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/tourguides/${id}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('Fetched guide data:', data);
                setGuide(data);
            })
            .catch((error) => console.error('Error fetching guide data:', error));

        if (guide && guide.email) {
            fetch(`http://localhost:5000/stories/guide?email=${guide.email}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log('Fetched stories:', data);

                    setStories(Array.isArray(data) ? data : []);
                })
                .catch((error) => console.error('Error fetching stories:', error));
        }
    }, [id, guide]);

    if (!guide) {
        return <p>Loading guide details...</p>;
    }

    return (
        <div className="guide-detail-container bg-white shadow-lg rounded-lg p-6  mx-auto">
            <div className='flex gap-10'>
                <img
                    src={guide.img}
                    alt={guide.name}
                    className="w-96 object-cover rounded-md"
                />
                <div>
                    <h1 className="text-2xl font-bold mt-4">{guide.name}</h1>
                    <p><strong>Age:</strong> {guide.age}</p>
                    <p><strong>Gender:</strong> {guide.gender}</p>
                    <p><strong>Languages:</strong> {guide.language ? guide.language.join(', ') : 'Not available'}</p>
                    <p><strong>Experience:</strong> {guide.experience}</p>
                    <p><strong>Specialty:</strong> {guide.specialty}</p>
                    <p><strong>Rating:</strong> {guide.rating} ⭐</p>
                    <p><strong>Availability:</strong> {guide.availability}</p>
                    <p><strong>Contact:</strong> {guide.email}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 px-4 py-2 bg-[#52C960] text-white rounded-lg hover:bg-[#3F0113] hover:text-[#52C960] transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
            <hr className='mt-10' />
            <div className="stories mt-8  lg:px-10">
                <h2 className="text-xl font-semibold mb-4">Stories by {guide.name}</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {stories.length === 0 ? (
                        <p>No stories available.</p>
                    ) : (
                        stories.map((story) => (
                            <div key={story._id} className="story-card bg-white rounded shadow p-4 cursor-pointer"
                                onClick={() => handleStoryClick(story)}>
                                <img
                                    src={story.images}
                                    alt={story.title || 'Story Image'}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                                <div className="flex">
                                    <div className="w-1/3">
                                        <img
                                            className="w-20 h-20 rounded-full"
                                            src={story.userImage || '/default-avatar.png'}
                                            alt={`${story.userName || 'User'}'s profile picture`}
                                            onError={(e) => {
                                                e.target.src = '/default-avatar.png'; // Fallback image
                                            }}
                                        />
                                        <p>{story.userName || 'Anonymous'}</p>
                                    </div>
                                    <div className="w-2/3">
                                        <h3 className="text-lg font-bold">{story.title || 'Untitled Story'}</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 mt-2">
                                    {story.text ? `${story.text.substring(0, 100)}...` : 'No description available.'}
                                </p>
                                <div className='mt-4 flex justify-between'>
                                    <div className='flex gap-2'>
                                        <img width="28" height="28" src="https://img.icons8.com/color/48/filled-like.png" alt="filled-like" /> <p>{story.reactCount}</p>
                                    </div>
                                    <div className='flex gap-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                                            <path fill="#1976D2" d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"></path><path fill="#1E88E5" d="M11 17A7 7 0 1 0 11 31 7 7 0 1 0 11 17zM37 7A7 7 0 1 0 37 21 7 7 0 1 0 37 7zM37 27A7 7 0 1 0 37 41 7 7 0 1 0 37 27z"></path>
                                        </svg> <p>{story.shareCount}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <FacebookShareButton
                                        url={story.image || 'http://localhost:5000'} // Replace with appropriate story URL
                                        quote={story.title || 'Check out this amazing story!'}
                                        onClick={() => handleShare(story.image)}
                                    >
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex gap-1">
                                            Share on Facebook <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                                                <path d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24	s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"></path><path d="M11,17c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S14.9,17,11,17z M37,7c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7	S40.9,7,37,7z M37,27c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S40.9,27,37,27z"></path>
                                            </svg>
                                        </button>
                                    </FacebookShareButton>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
            <div>
                {/* <Overstate></Overstate> */}
            </div>
        </div>
    );
};

export default GuideProfile;
