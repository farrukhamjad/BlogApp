import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userProfileSlice';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner } from '../components';
import appwriteService from '../appwrite/configure'

function UserProfile() {

  const { userProfile } = useParams();
  const dispatch = useDispatch();
  const [pageloading, setPageLoading] = useState(true)

  const { userProfile: profile, userPosts, status, error } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    if (userProfile) {
      dispatch(fetchUserProfile(userProfile));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (status === 'loading') {
      setPageLoading(true);
    } else {
      setPageLoading(false)
    }
  }, [status]);

  if (status === 'failed') {
    return (
      <div className="error-notification">
          {error}
          <button onClick={() => setError(null)}>×</button>
      </div>
    );
  }

  const extractPara = (content) => {
    const paraContent = content.match(/<p[^>]*>(.*?)<\/p>/g);
    return paraContent ? paraContent.join('') : '';
  }

  function generateAvatarUrl(name) {
    if (!name) return 'https://cloud.appwrite.io/v1/avatars/initials?name=Anonymous&width=80&height=80';
    const formattedName = name.trim().replace(/\s+/g, ' ');
    return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(formattedName)}&width=80&height=80`;
  }

  if (pageloading) {
      return (
          <Spinner />
      )
  }

  return (
    <div className="w-full py-25 min-h-[60vh]">
      <Container>
        {profile && (
          <div className="border-b-1 border-light-grey flex items-center pb-10">
            <img
              src={generateAvatarUrl(profile.userName)}
              alt={profile.userName}
              className="w-25 h-25 rounded-full mr-5"
            />
            <h1 className="text-3xl font-semibold">{profile.userName}</h1>
          </div>
        )}

        <div className="posts mt-6">
          <h2 className="text-xl mb-7">Posts by {profile?.userName}</h2>
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
            {userPosts.length === 0 ? (
              <p>No posts found</p>
            ) : (
              userPosts.map((post) => (
                <div key={post.$id}>
                  <div className='group w-full bg-dark-clr rounded-lg hover:rounded-xl transition-all scale-[0.98] hover:scale-100'>
                    <Link to={`/post/${post.$id}`}>
                      <div className="w-full justify-center">
                          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} className='group-hover:rounded-xl rounded-lg w-full lg:h-45 md:h-40 object-cover transition-all bg-light-grey' />
                      </div>
                      <div className='px-5 py-4'>
                        <h3 className="group-hover:text-primary-clr text-xl transition-all mb-3 line-clamp-2">{post.title}</h3>
                        <div className='browser-css text-sm text-font-clr line-clamp-2'>
                          <div dangerouslySetInnerHTML={{
                            __html: extractPara(post.content),
                          }} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default UserProfile
