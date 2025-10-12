import React, { useState, useEffect } from "react";
import { List } from "@react95/core";
import { Mshtml32534 } from "@react95/icons";
import * as S from "./layoutStyling";
import blogPosts from "../data/blogPosts.json";
import faustHotReloadUI from "../faust-hot-reload-ui.png";

function Blog({ closeBlog, isMobile }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [view, setView] = useState("list"); // "list" or "post"

  // Check for hash-based post links when blog opens
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#blog/')) {
      const slug = hash.replace('#blog/', '');
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        setSelectedPost(post);
        setView("post");
      }
    }
  }, []);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const renderMarkdown = (content) => {
    return content
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code style="background: #f0f0f0; padding: 2px 4px; font-family: monospace;">$1</code>')
      .replace(/```\n([\s\S]*?)\n```/g, '<pre style="background: #f0f0f0; padding: 10px; border: 1px inset #c0c0c0; font-family: monospace; overflow-x: auto;"><code>$1</code></pre>')
      .replace(/!\[([^\]]*)\]\(faust-hot-reload-ui\.png\)/g, `<img src="${faustHotReloadUI}" alt="$1" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin: 10px 0;" />`)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin: 10px 0;" />')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, (match) => {
        if (match.startsWith('<h') || match.startsWith('<li') || match.startsWith('<img') || match.startsWith('<pre') || match.trim() === '') {
          return match;
        }
        return `<p>${match}</p>`;
      })
      .replace(/<li>/g, '<ul><li>')
      .replace(/<\/li>(?![\s\S]*<li>)/g, '</li></ul>');
  };

  const showPost = (post) => {
    // Create shareable URL with hash
    const shareUrl = `${window.location.origin}${window.location.pathname}#blog/${post.slug}`;
    window.open(shareUrl, '_blank');
  };

  const showPostInModal = (post) => {
    setSelectedPost(post);
    setView("post");
    // Update URL to shareable link
    window.history.pushState({}, '', `#blog/${post.slug}`);
  };

  const showList = () => {
    setSelectedPost(null);
    setView("list");
    // Set URL to general blog
    window.history.pushState({}, '', '#blog');
  };

  return (
    <S.layoutMain
      isMobile={isMobile}
      title={view === "list" ? "Blog.exe" : selectedPost?.title}
      closeModal={closeBlog}
      height="100%"
      icon={<Mshtml32534 variant="32x32_4" />}
      menu={[
        {
          name: "View",
          list: (
            <List>
              <List.Item onClick={showList} disabled={view === "list"}>
                Post List
              </List.Item>
              {view === "post" && selectedPost && (
                <>
                  <List.Divider />
                  <List.Item onClick={() => showPost(selectedPost)}>
                    Open in New Tab
                  </List.Item>
                  <List.Item onClick={() => {
                    const shareUrl = `${window.location.origin}${window.location.pathname}#blog/${selectedPost.slug}`;
                    navigator.clipboard.writeText(shareUrl);
                    alert('Direct link copied to clipboard!');
                  }}>
                    Copy Direct Link
                  </List.Item>
                </>
              )}
              <List.Divider />
              <List.Item onClick={closeBlog}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <S.textModal>
          {view === "list" ? (
            <div>
              <h1>Blog Posts</h1>
              <p>Musings on the nature of sound, machines, and their curious conversation.</p>
              <hr style={{ margin: "20px 0", border: "1px inset #c0c0c0" }} />
              
              {blogPosts
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                  <div 
                    key={post.id} 
                    style={{ 
                      marginBottom: "25px", 
                      cursor: "pointer",
                      padding: "10px",
                      border: "1px outset #c0c0c0",
                      backgroundColor: "#f0f0f0"
                    }}
                    onClick={() => showPostInModal(post)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#e0e0e0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#f0f0f0";
                    }}
                  >
                    <h3 style={{ 
                      margin: "0 0 8px 0", 
                      color: "#000080",
                      textDecoration: "underline"
                    }}>
                      {post.title}
                    </h3>
                    <p style={{ 
                      margin: "0 0 8px 0", 
                      fontSize: "12px", 
                      color: "#666",
                      fontFamily: "monospace"
                    }}>
                      {formatDate(post.date)} | {post.location}
                    </p>
                    <p style={{ margin: "0", lineHeight: "1.4" }}>
                      {post.excerpt}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <div style={{ 
                marginBottom: "20px", 
                paddingBottom: "10px", 
                borderBottom: "1px inset #c0c0c0" 
              }}>
                <button
                  onClick={showList}
                  style={{
                    background: "#c0c0c0",
                    border: "2px outset #c0c0c0",
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: "11px",
                    marginBottom: "10px"
                  }}
                  onMouseDown={(e) => {
                    e.target.style.border = "2px inset #c0c0c0";
                  }}
                  onMouseUp={(e) => {
                    e.target.style.border = "2px outset #c0c0c0";
                  }}
                >
                  ← Back to Posts
                </button>
                <p style={{ 
                  margin: "0", 
                  fontSize: "12px", 
                  color: "#666",
                  fontFamily: "monospace"
                }}>
                  Published: {formatDate(selectedPost.date)} | {selectedPost.location}
                </p>
              </div>
              
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: renderMarkdown(selectedPost.content) 
                }}
                style={{
                  lineHeight: "1.6",
                  fontSize: "14px"
                }}
              />
            </div>
          )}
        </S.textModal>
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default Blog;