import React, { useEffect, useState } from 'react'
import { Container, PostForm, Spinner } from '../components'

function AddPost() {

  const [pageloading, setPageLoading] = useState(true)

  useEffect(() => {
    setPageLoading(false)
  }, [])

  if (pageloading) {
      return (
        <Spinner />
      )
  }

  return (
    <div className='w-full py-25 min-h-[60vh]'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
