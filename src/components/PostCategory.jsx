import React, { useEffect, useState, useRef } from 'react';
import appwriteService from '../appwrite/configure';
import { categories } from '../components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

function PostCategory({ setSelectedCategory, selectedCategory }) {
    const [post, setPost] = useState([]);
    const tabsBoxRef = useRef(null);
    const arrowLeftRef = useRef(null);
    const arrowRightRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        appwriteService.getPost([]).then((response) => {
            if (response && response.documents) {
                setPost(response.documents);
            }
        }).catch((error) => {
            console.error('Error Fetching posts:', error);
        });

        handleIcons(tabsBoxRef.current.scrollLeft);
    }, []);

    const handleIcons = (scrollVal) => {
        const maxScrollableWidth = tabsBoxRef.current.scrollWidth - tabsBoxRef.current.clientWidth;
        arrowLeftRef.current.style.display = scrollVal <= 0 ? 'none' : 'flex';
        arrowRightRef.current.style.display = maxScrollableWidth - scrollVal <= 1 ? 'none' : 'flex';
    };

    const handleArrowClick = (direction) => {
        const scrollWidth = tabsBoxRef.current.scrollLeft += direction === 'left' ? -340 : 340;
        tabsBoxRef.current.scrollLeft = scrollWidth;
        handleIcons(scrollWidth);
    };

    const handleTabClick = (category) => {
        setSelectedCategory(category);
    };

    const handleAllPostsClick = () => {
        setSelectedCategory('');
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        tabsBoxRef.current.classList.add('dragging');
        tabsBoxRef.current.scrollLeft -= e.movementX;
        handleIcons(tabsBoxRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        tabsBoxRef.current.classList.remove('dragging');
    };

    return (
        <div className="w-full p-5 bg-dark-clr text-white rounded-lg mb-10">
            <div className="wrapper">
                <div
                    ref={arrowLeftRef}
                    className="icon"
                    onClick={() => handleArrowClick('left')}
                    style={{ display: 'none' }}
                >
                    <FaAngleLeft />
                </div>

                <ul
                    ref={tabsBoxRef}
                    className="tabs-box"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <li
                        className={`tab bg-black cursor-pointer whitespace-nowrap py-3 px-4.5 rounded-4xl border border-light-grey hover:bg-light-grey transition-all
                            ${selectedCategory === '' ? 'bg-primary-clr hover:bg-primary-clr text-black font-bold' : ''}
                        `}
                        onClick={handleAllPostsClick}
                    >
                        All Posts
                    </li>
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className={`tab bg-black cursor-pointer whitespace-nowrap py-3 px-4.5 rounded-4xl border border-light-grey hover:bg-light-grey transition-all
                                ${category === selectedCategory ? 'bg-primary-clr hover:bg-primary-clr text-black font-bold' : ''}
                            `}
                            onClick={() => handleTabClick(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <div
                    ref={arrowRightRef}
                    className="icon"
                    onClick={() => handleArrowClick('right')}
                    style={{ display: 'none' }}
                >
                    <FaAngleRight />
                </div>
            </div>
        </div>
    );
}

export default PostCategory;
