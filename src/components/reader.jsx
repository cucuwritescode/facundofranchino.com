import React, { useState, useEffect } from "react";
import { List, Button, Frame } from "@react95/core";
import { Mshtml32534 } from "@react95/icons";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import * as S from "./layoutStyling";
import readerData from "../data/readerPosts.json";



function Reader({ closeReader, isMobile }) {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);

  // Parse URL hash on mount to enable deep linking
  useEffect(() => {
    const hash = window.location.hash;
    // Expected format: #reader/category-slug/post-slug
    const match = hash.match(/^#reader\/([^/]+)\/([^/]+)$/);
    if (match) {
      const [, categorySlug, postSlug] = match;
      const category = readerData.categories.find(c => c.slug === categorySlug);
      if (category) {
        const post = category.posts.find(p => p.slug === `${categorySlug}/${postSlug}`);
        if (post) {
          setCurrentCategory(category);
          setCurrentPost(post);
          return;
        }
      }
    }
    // Check for category-only link: #reader/category-slug
    const categoryMatch = hash.match(/^#reader\/([^/]+)$/);
    if (categoryMatch) {
      const [, categorySlug] = categoryMatch;
      const category = readerData.categories.find(c => c.slug === categorySlug);
      if (category) {
        setCurrentCategory(category);
      }
    }
  }, []);

  // Update URL hash when navigating
  const updateHash = (category, post) => {
    if (post) {
      window.location.hash = `reader/${post.slug}`;
    } else if (category) {
      window.location.hash = `reader/${category.slug}`;
    } else {
      window.location.hash = 'reader';
    }
  };

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    setCurrentPost(null);
    updateHash(category, null);
  };

  const handlePostClick = (post) => {
    setCurrentPost(post);
    updateHash(currentCategory, post);
  };

  const handleBackToCategories = () => {
    setCurrentCategory(null);
    setCurrentPost(null);
    updateHash(null, null);
  };

  const handleBackToPosts = () => {
    setCurrentPost(null);
    updateHash(currentCategory, null);
  };


  // Show individual post
  if (currentPost) {
    const isIframe = !!currentPost.iframeSrc;
    return (
      <S.layoutMain
        isMobile={isMobile}
        title={`${currentPost.title} - The Reader`}
        closeModal={closeReader}
        height="100%"
        icon={<Mshtml32534 variant="32x32_4" />}
        menu={[
          {
            name: "File",
            list: (
              <List>
                <List.Item onClick={closeReader}>Close</List.Item>
                {isIframe && (
                  <List.Item onClick={() => window.open(currentPost.iframeSrc, '_blank')}>
                    Open in New Tab
                  </List.Item>
                )}
              </List>
            ),
          },
        ]}
      >
        <S.layoutMainContent bg="white" boxShadow="in" fullWidth={isIframe}>
          {currentPost.iframeSrc ? (
            <div style={{ width: '100%', margin: 0, padding: 0 }}>
              <div style={{ padding: '10px 20px', display: 'flex', gap: '10px' }}>
                <Button onClick={handleBackToPosts}>← Back to Posts</Button>
                <Button onClick={handleBackToCategories}>All Categories</Button>
              </div>
              <iframe
                src={currentPost.iframeSrc}
                title={currentPost.title}
                style={{
                  width: '100%',
                  height: 'calc(100vh - 180px)',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          ) : (
            <S.textModal style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <Button onClick={handleBackToPosts}>← Back to Posts</Button>
                <Button onClick={handleBackToCategories}>All Categories</Button>
              </div>
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {currentPost.content}
                </ReactMarkdown>
              </div>

              {currentPost.location && (
                <div style={{
                  textAlign: 'right',
                  marginTop: '40px',
                  fontStyle: 'italic',
                  fontSize: '0.9em',
                  color: '#666'
                }}>
                  {currentPost.location}
                  {currentPost.date && `, ${new Date(currentPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}`}
                </div>
              )}
            </S.textModal>
          )}
        </S.layoutMainContent>
      </S.layoutMain>
    );
  }

  // Show posts in category
  if (currentCategory) {
    return (
      <S.layoutMain
        isMobile={isMobile}
        title={`${currentCategory.name} - The Reader`}
        closeModal={closeReader}
        height="100%"
        icon={<Mshtml32534 variant="32x32_4" />}
        menu={[
          {
            name: "File",
            list: (
              <List>
                <List.Item onClick={closeReader}>Close</List.Item>
              </List>
            ),
          },
        ]}
      >
        <S.layoutMainContent bg="white" boxShadow="in">
          <S.textModal>
            <div style={{ marginBottom: '20px' }}>
              <Button onClick={handleBackToCategories}>← Back to Categories</Button>
            </div>
            <h1>{currentCategory.name}</h1>
            <List>
              {currentCategory.posts?.map((post, idx) => (
                <List.Item key={idx} onClick={() => handlePostClick(post)}>
                  📄 {post.title}
                </List.Item>
              ))}
            </List>
          </S.textModal>
        </S.layoutMainContent>
      </S.layoutMain>
    );
  }

  // Show main categories directory
  return (
    <S.layoutMain
      isMobile={isMobile}
      title="The Reader"
      closeModal={closeReader}
      height="100%"
      icon={<Mshtml32534 variant="32x32_4" />}
      menu={[
        {
          name: "File",
          list: (
            <List>
              <List.Item onClick={closeReader}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <S.textModal>
          <h1>The Facundo Franchino Reader</h1>
          <p style={{ marginBottom: '20px' }}>
            Musings on the nature of sound, machines, and their curious conversation.
          </p>

          <h2>Categories</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '15px',
            marginTop: '20px'
          }}>
            {readerData.categories.map(category => (
              <Frame
                key={category.slug}
                bg="white"
                boxShadow="out"
                style={{
                  padding: '15px',
                  cursor: 'pointer',
                  '&:hover': { background: '#e6e6e6' }
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <div>
                  <strong>📁 {category.name}</strong>
                  <br />
                  <small>{category.posts?.length || 0} post{(category.posts?.length || 0) !== 1 ? 's' : ''}</small>
                </div>
              </Frame>
            ))}
          </div>
        </S.textModal>
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default Reader;