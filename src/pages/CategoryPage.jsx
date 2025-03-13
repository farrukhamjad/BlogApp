import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import appwriteService from '../appwrite/configure';
import { Container, PostCard, Spinner } from '../components';

function CategoryPage() {

    const [posts, setPosts] = useState([]);
    const {category} = useParams();
    const [error, setError] = useState('');
    const [pageloading, setPageLoading] = useState(true);

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

    const filteredPosts = category
        ? posts.filter((post) => post.category === category)
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
                <div className='border-b border-b-light-grey mb-8 pb-8'>
                    <p className='mb-3'>Posts by Category of</p>
                    <h2 className="text-white font-bold text-xl">
                        {category}
                    </h2>
                </div>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
                    {filteredPosts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    </>
  )
}

export default CategoryPage
