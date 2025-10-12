import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { GlobalStyle, ThemeProvider, List } from "@react95/core";
import { Mshtml32534 } from "@react95/icons";
import * as S from "./layoutStyling";
import blogPosts from "../data/blogPosts.json";
import faustHotReloadUI from "../faust-hot-reload-ui.png";

function BlogPost() {
  const { slug } = useParams();
  const history = useHistory();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <ThemeProvider theme="millenium">
        <GlobalStyle />
        <div style={{ 
          background: '#008080', 
          minHeight: '100vh', 
          padding: '20px',
          fontFamily: 'MS Sans Serif'
        }}>
          <S.layoutMain
            title="404 - Post Not Found"
            closeModal={() => history.push('/')}
            height="300px"
            width="400px"
            icon={<Mshtml32534 variant="32x32_4" />}
            menu={[
              {
                name: "Options",
                list: (
                  <List>
                    <List.Item onClick={() => history.push('/')}>
                      Back to Desktop
                    </List.Item>
                  </List>
                ),
              },
            ]}
          >
            <S.layoutMainContent bg="white" boxShadow="in">
              <S.textModal>
                <h1>404 - Post Not Found</h1>
                <p>The blog post you're looking for doesn't exist.</p>
                <button
                  onClick={() => history.push('/')}
                  style={{
                    background: "#c0c0c0",
                    border: "2px outset #c0c0c0",
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: "11px"
                  }}
                >
                  Back to Desktop
                </button>
              </S.textModal>
            </S.layoutMainContent>
          </S.layoutMain>
        </div>
      </ThemeProvider>
    );
  }

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

  return (
    <ThemeProvider theme="millenium">
      <GlobalStyle />
      <div style={{ 
        background: '#008080', 
        minHeight: '100vh', 
        padding: '20px',
        fontFamily: 'MS Sans Serif'
      }}>
        <S.layoutMain
          title={post.title}
          closeModal={() => history.push('/')}
          height="100%"
          icon={<Mshtml32534 variant="32x32_4" />}
          menu={[
            {
              name: "View",
              list: (
                <List>
                  <List.Item onClick={() => history.push('/')}>
                    Back to Desktop
                  </List.Item>
                  <List.Divider />
                  <List.Item 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }}
                  >
                    Copy Link
                  </List.Item>
                </List>
              ),
            },
          ]}
        >
          <S.layoutMainContent bg="white" boxShadow="in">
            <S.textModal>
              <div style={{ 
                marginBottom: "20px", 
                paddingBottom: "10px", 
                borderBottom: "1px inset #c0c0c0" 
              }}>
                <button
                  onClick={() => history.push('/')}
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
                  ← Back to Desktop
                </button>
                <p style={{ 
                  margin: "0", 
                  fontSize: "12px", 
                  color: "#666",
                  fontFamily: "monospace"
                }}>
                  Published: {formatDate(post.date)}
                </p>
              </div>
              
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: renderMarkdown(post.content) 
                }}
                style={{
                  lineHeight: "1.6",
                  fontSize: "14px"
                }}
              />
            </S.textModal>
          </S.layoutMainContent>
        </S.layoutMain>
      </div>
    </ThemeProvider>
  );
}

export default BlogPost;