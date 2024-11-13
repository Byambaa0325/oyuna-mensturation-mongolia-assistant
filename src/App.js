import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner'; // Make sure this is imported
import './resources/i18n';

// Lazy load all pages for better initial load performance
const ChatPage = lazy(() => import('./pages/ChatPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));

const App = () => {
    return (
        <Router>
            <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<ChatPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/help" element={<HelpPage />} />
                    </Routes>
                </Suspense>
            </Layout>
        </Router>
    );
};

export default App;
