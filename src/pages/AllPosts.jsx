import React, { useEffect, useState } from 'react';
import { Container, PostCard, PostCategory, Spinner } from '../components';
import appwriteService from '../appwrite/configure';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [pageloading, setPageLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setError('');
        appwriteService.getPosts([]).then((response) => {
            if (response && response.documents) {
                const sortedPosts = response.documents.sort((a, b) => {
                    return new Date(b.$updatedAt) - new Date(a.$updatedAt);
                });
                setPosts(sortedPosts);
            }
        }).catch((error) => {
            setError(error.message);
            console.error('Error Fetching posts:', error);
        }).finally(() => setPageLoading(false));
    }, []);

    if (pageloading) {
        return <Spinner />;
    }

    const filteredPosts = selectedCategory
        ? posts.filter((post) => post.category === selectedCategory)
        : posts;

    return (
        <>
            {error && (
                <div className="error-notification">
                    {error}
                    <button onClick={() => setError(null)}>×</button>
                </div>
            )}
            <div className='w-full py-25 min-h-[60vh]'>
                <Container>
                    <PostCategory 
                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory} 
                    />
                    {filteredPosts.length === 0 ? (
                        <div className="flex justify-center items-center min-h-[30vh]">
                            <div className='text-2xl font-bold uppercase text-center text-primary-clr'>No posts are available.</div>
                        </div>
                    ) : (
                        <>
                            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
                                {filteredPosts.map((post) => (
                                    <div key={post.$id}>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </Container>
            </div>
        </>
    );
}

export default AllPosts;
