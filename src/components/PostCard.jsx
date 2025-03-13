import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/configure'
import { Link } from 'react-router-dom'
import parse from "html-react-parser"

function PostCard({$id, title, content, featuredImage, userName}) {

  const extractPara = (content) => {
    const paraContent = content.match(/<p[^>]*>(.*?)<\/p>/g);
    return paraContent ? paraContent.join('') : '';
  }

  const filteredContent = extractPara(content);

  function generateAvatarUrl(name) {
    if (!name) return 'https://cloud.appwrite.io/v1/avatars/initials?name=Anonymous&width=80&height=80';
    const formattedName = name.trim().replace(/\s+/g, ' ');
    return `https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(formattedName)}&width=80&height=80`;
  }

  return (
    <Link to={`/post/${$id}`}>
      <div className="group w-full bg-dark-clr rounded-lg hover:rounded-xl transition-all scale-[0.98] hover:scale-100">
        <div className="w-full justify-center">
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='group-hover:rounded-xl rounded-lg w-full lg:h-45 sm:h-40 object-cover transition-all bg-light-grey' />
        </div>
        <div className="px-5 py-4">
          <h2 className='group-hover:text-primary-clr text-xl transition-all mb-3 line-clamp-2'>{title}</h2>
          <div className="browser-css text-sm text-font-clr line-clamp-2">
              {parse(filteredContent)}
          </div>
          <div className='flex items-center mt-3'>
              <img
                src={generateAvatarUrl(userName)}
                alt={userName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="group-hover:text-primary-clr transition-all">{userName}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
