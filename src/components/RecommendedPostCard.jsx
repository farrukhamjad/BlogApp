import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/configure'
import { Link } from 'react-router-dom'
import parse from "html-react-parser"

function RecommendedPostCard({$id, title, content, featuredImage}) {

  const extractPara = (content) => {
    const paraContent = content.match(/<p[^>]*>(.*?)<\/p>/g);
    return paraContent ? paraContent.join('') : '';
  }

  const filteredContent = extractPara(content);

  return (
    <Link to={`/post/${$id}`}>
      <div className="group flex w-full p-2 bg-dark-clr rounded-lg hover:rounded-xl transition-all scale-[0.98] hover:scale-100">
        <div className="w-2/5 justify-center">
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='group-hover:rounded-xl rounded-lg w-full h-20 object-cover transition-all bg-light-grey' />
        </div>
        <div className="pl-5 pr-3 py-1 w-3/5">
          <h2 className='group-hover:text-primary-clr text-md transition-all mb-1 line-clamp-1'>{title}</h2>
          <div className="browser-css text-sm text-font-clr line-clamp-2">
              {parse(filteredContent)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecommendedPostCard
