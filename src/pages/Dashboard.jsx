import React, { useState, useEffect } from 'react';
import authService from '../appwrite/auth';
import DashboardSidebar from '../components/DashboardSidebar';
import AuthProfile from '../components/AuthProfile';
import AuthPosts from '../components/AuthPosts';
import { Container, Spinner } from '../components';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [pageloading, setPageLoading] = useState(true)

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await authService.getCurrentUser();
                setUser(userDetails);
            } catch (error) {
                console.log("Appwrite service :: fetchUserDetail :: error", error);
            } finally {
                setPageLoading(false)
            }
        };
        fetchUserDetails();
    }, []);
    
    if (pageloading) {
        return (
            <Spinner />
        )
    }

    if (!user) {
        return null;
    }


    return (
        <div className="w-full min-h-[60vh]">
            <Container>
                <div className="w-full py-25 min-h-[60vh]">
                    <DashboardSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
                    {activeTab === 'profile' &&
                        <AuthProfile user={user} setUser={setUser} />
                    }
                    {activeTab === 'posts' &&
                        <AuthPosts user={user} />
                    }
                </div>
            </Container>
        </div>
    );
}

export default Dashboard;
