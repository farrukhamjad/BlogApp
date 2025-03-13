import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/configure"
import { Container, PostCard, Spinner } from '../components'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { assets } from '../assets'
import { BackgroundBeams } from '../components/ui/background-beams'

function Home() {

    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    const [pageloading, setPageLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                const sortedPosts = posts.documents.sort((a, b) => {
                    return new Date(b.$createdAt) - new Date(a.$createdAt);
                });
                setPosts(sortedPosts)
            }
        }).catch((error) => {
            console.error('Error Fetching posts:', error);
        })
        .finally(() => setPageLoading(false))
    }, [])

    if (pageloading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <div className='w-full py-25 min-h-[60vh]'>
                <Container>
                    <div className="relative isolate px-6 lg:px-8">
                        <div className="absolute inset-x-0 -top-40 -z-20 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#01bbff] to-[#0066ff] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                        </div>
                        <div className="mx-auto max-w-4xl">
                            <div className="mb-8 flex justify-center text-center">
                                {posts.length === 0 ? (
                                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-font-clr ring-1 ring-border-clr/70 hover:ring-border-clr">
                                            Already have an Account? <Link to={'/login'} className="font-semibold text-primary-clr"><span className="absolute inset-0" aria-hidden="true"></span>Login Now</Link>
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:leading-18">Publish your passions, your way</h1>
                                <p className="mt-8 text-lg font-medium text-pretty text-font-clr sm:text-xl/8">Create a unique and beautiful blog easily.</p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    {posts.length === 0 ? (
                                        <Link to={'/signup'} className="capitalize rounded-md bg-primary-clr px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</Link>
                                    ) : (
                                        <Link to={'/add-post'} className="capitalize rounded-md bg-primary-clr px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Post</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-20 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
                            <div className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#008cff] to-[#01bbff] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                        </div>
                    </div>
                </Container>

                {posts.length === 0 ?
                    (
                    <>                   
                        <section className='w-full lg:py-25 py-10 bg-black overflow-hidden'>
                            <Container>
                                <div className='flex items-center lg:flex-row flex-col'>
                                    <div className='lg:w-1/2 lg:text-left text-center'>
                                        <h2 className='font-bold text-2xl lg:text-3xl capitalize mb-4'>Know your audience</h2>
                                        <p className='font-light text-font-clr' >Find out which posts are a hit with Blogger’s built-in analytics. You’ll see where your audience is coming from and what they’re interested in. You can even connect your blog directly to Google Analytics for a more detailed look.</p>
                                    </div>
                                    <div className='lg:w-1/2 relative lg:translate-x-[4em] lg:mt-0 mt-5'>
                                        <img src={assets.web_image} alt="website-image"/>
                                        <div className='absolute top-0 h-full w-full lg:bg-linear-to-r bg-linear-to-b from-transparent to-black'></div>
                                    </div>
                                </div>
                            </Container>
                        </section>

                        <section className='w-full lg:py-25 py-10 bg-black overflow-hidden'>
                            <Container>
                                <div className='flex items-center lg:flex-row-reverse flex-col'>
                                    <div className='lg:w-1/2 lg:text-left text-center'>
                                        <h2 className='font-bold text-2xl lg:text-3xl capitalize mb-4'>Hang onto your memories</h2>
                                        <p className='font-light text-font-clr' >Save the moments that matter. Blogger lets you safely store thousands of posts, photos, and more with Google.</p>
                                    </div>
                                    <div className='lg:w-1/2 relative lg:-translate-x-[4em] lg:mt-0 mt-5'>
                                        <img src={assets.audience_image} alt="website-image"/>
                                        <div className='absolute top-0 h-full w-full lg:bg-linear-to-l bg-linear-to-b from-transparent to-black'></div>
                                    </div>
                                </div>
                            </Container>
                        </section>

                        <section className="h-[40rem] w-full relative flex flex-col items-center justify-center antialiased">
                            <div className="max-w-7xl mx-auto p-4">
                                <h2 className="relative z-10 text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-4">
                                    Join millions of others
                                </h2>
                                <p></p>
                                <p className="mt-8 text-lg font-medium text-pretty text-font-clr sm:text-xl/8 max-w-xl mx-auto my-2 text-center relative z-10">
                                    Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.
                                </p>
                                <div className="flex items-center justify-center mt-7">
                                    <Link to={'/signup'} className="capitalize rounded-md bg-primary-clr px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 relative z-10">
                                        Get started
                                    </Link>
                                </div>
                            </div>
                            <BackgroundBeams />
                        </section>
                    </>
                    ) : (
                    <section className='w-full pt-25 min-h-[60vh]' id='post_section'>
                        <Container>
                            <h2 className="relative z-10 text-3xl lg:text-5xl leading-15 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-10">
                                Latest Blogs
                            </h2>
                            <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-3'>
                                {posts.slice(0, 8).map((post) => (
                                    <div key={post.$id}>
                                        <PostCard {...post} />
                                    </div>
                                ))}
                            </div>
                            {posts.slice(0, 8).length >= 8 ? 
                                (<div className='flex justify-center mt-7'>
                                    <Link to={'/all-posts'} className="capitalize rounded-md bg-primary-clr px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Read More Posts</Link>
                                </div>) : null
                            }
                        </Container>
                    </section>
                    )
                }
            </div>
        </>
    )
}

export default Home
