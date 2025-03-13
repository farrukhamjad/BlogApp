import React, { useEffect, useState } from 'react'
import { Container, PostForm, Spinner } from '../components'
import appwriteService from "../appwrite/configure"
import { useNavigate,  useParams } from 'react-router-dom'

function EditPost() {

    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [pageloading, setPageLoading] = useState(true)

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
            .then((fetchedPost) => {
                if (fetchedPost) {
                    setPosts(fetchedPost)
                } else {
                    navigate('/')
                }
            }).catch((error) => {
                console.error('Error Fetching posts:', error);
                navigate('/')
            })
            .finally(() => setPageLoading(false))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (pageloading) {
        return (
          <Spinner />
        )
    }

    if (!post) {
        return null;
    }


    return post ? (
        <>
            <div className='w-full py-25 min-h-[60vh]'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        </>
    ) : null
}

export default EditPost
