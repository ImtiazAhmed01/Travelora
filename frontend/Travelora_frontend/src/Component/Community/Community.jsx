import React, { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { useNavigate } from 'react-router-dom';

const Community = ({ isLoggedIn }) => {
    const [stories, setStories] = useState([]);
    const navigate = useNavigate();
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('http://localhost:5000/stories/all');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStories(data);
            } catch (error) {
                console.error('Error fetching stories:', error.message);
            }
        };

        fetchStories();
    }, []);


    const handleShare = (storyUrl) => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    };
    const handleStoryClick = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStory(null);
    };

    return (
        <div className="tourist-story-section p-6">
            <h2 className="text-2xl font-bold mb-4">All Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map((story) => (
                    <div key={story.id || story._id} className="story-card border rounded shadow p-4 cursor-pointer"
                        onClick={() => handleStoryClick(story)}>
                        <img
                            src={Array.isArray(story.images) && story.images.length > 0 ? story.images[0] : story.images}
                            alt={Array.isArray(story.images) ? story.images.join(', ') : story.title}
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
                                <button className="bg-[#52C960]/70  px-4 py-2 rounded hover:bg-[#52C960] flex gap-1">
                                    Share on Facebook <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                                        <path d="M38.1,31.2L19.4,24l18.7-7.2c1.5-0.6,2.3-2.3,1.7-3.9c-0.6-1.5-2.3-2.3-3.9-1.7l-26,10C8.8,21.6,8,22.8,8,24	s0.8,2.4,1.9,2.8l26,10c0.4,0.1,0.7,0.2,1.1,0.2c1.2,0,2.3-0.7,2.8-1.9C40.4,33.5,39.6,31.8,38.1,31.2z"></path><path d="M11,17c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S14.9,17,11,17z M37,7c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7	S40.9,7,37,7z M37,27c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S40.9,27,37,27z"></path>
                                    </svg>
                                </button>
                            </FacebookShareButton>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    className="bg-[#52C960]/70 px-6 py-2 rounded hover:bg-[#52C960]"
                    onClick={() => navigate('/addstories')}
                >
                    Add Stories
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedStory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        {Array.isArray(selectedStory.images) && selectedStory.images.length > 1 ? (
                            // Collage view for multiple images
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {selectedStory.images.slice(0, 4).map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-32 object-cover rounded"
                                    />
                                ))}
                            </div>
                        ) : (
                            // Single image view
                            <img
                                src={Array.isArray(selectedStory.images) && selectedStory.images.length > 0 ? selectedStory.images[0] : selectedStory.images}
                                alt={selectedStory.title || 'Image'}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                        )}
                        <h3 className="text-2xl font-bold mb-2">{selectedStory.title || 'Untitled Story'}</h3>
                        <p className="text-gray-700 mb-4">{selectedStory.text || 'No description available.'}</p>
                        <div className="flex justify-end space-x-4">
                            <FacebookShareButton
                                url={selectedStory.image || 'http://localhost:5000'} // Replace with appropriate story URL
                                quote={selectedStory.title || 'Check out this amazing story!'}
                            >
                                <button className="bg-blue-500  px-4 py-2 rounded hover:bg-blue-600">
                                    Share on Facebook
                                </button>
                            </FacebookShareButton>
                            <button
                                className="bg-gray-500  px-4 py-2 rounded hover:bg-gray-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Community;


