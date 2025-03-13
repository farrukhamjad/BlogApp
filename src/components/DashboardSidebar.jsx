import React from 'react';

function DashboardSidebar({ setActiveTab, activeTab }) {
    return (
        <div className="max-w-[28rem] mx-auto p-5 bg-dark-clr text-white rounded-lg mb-5">
            <ul className='grid grid-cols-2 gap-4'>
                <li>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`block w-full text-center rounded-lg px-3 py-2 cursor-pointer transition-all border border-border-clr
                            ${activeTab === 'profile' ? 'bg-primary-clr text-black font-bold border-primary-clr' : ''} 
                        `}>
                        My Profile
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`block w-full text-center rounded-lg px-3 py-2 cursor-pointer transition-all border border-border-clr
                            ${activeTab === 'posts' ? 'bg-primary-clr text-black font-bold border-primary-clr' : ''} 
                        `}>
                        My Posts
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default DashboardSidebar;
