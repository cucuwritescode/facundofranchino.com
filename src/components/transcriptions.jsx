import React, { useState, useEffect } from "react";
import { List, Frame, Button } from "@react95/core";
import { Mshtml32534 } from "@react95/icons";
import * as S from "./layoutStyling";
import transcriptionsData from "../data/transcriptions.json";

function Transcriptions({ closeTranscriptions, isMobile }) {
  const [currentTranscription, setCurrentTranscription] = useState(null);
  const [selectedTranscriptionId, setSelectedTranscriptionId] = useState(null);

  // Check for hash URLs on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#transcriptions/')) {
      const slug = hash.replace('#transcriptions/', '');
      const transcription = transcriptionsData.find(t => t.slug === slug);
      if (transcription) {
        setCurrentTranscription(transcription);
        setSelectedTranscriptionId(transcription.id);
      }
    }
  }, []);

  const handleTranscriptionClick = (transcription) => {
    setCurrentTranscription(transcription);
    setSelectedTranscriptionId(transcription.id);
    // Update URL with transcription slug
    window.history.pushState({}, '', `#transcriptions/${transcription.slug}`);
  };

  const handleBackToList = () => {
    setCurrentTranscription(null);
    setSelectedTranscriptionId(null);
    // Update URL to just transcriptions
    window.history.pushState({}, '', '#transcriptions');
  };

  const handlePDFDownload = (pdfFile) => {
    window.open(`/${pdfFile}`, '_blank');
  };

  if (currentTranscription) {
    return (
      <S.layoutMain
        isMobile={isMobile}
        title={`${currentTranscription.title} - Transcriptions`}
        closeModal={closeTranscriptions}
        height="100%"
        icon={<Mshtml32534 variant="32x32_4" />}
        menu={[
          {
            name: "Options",
            list: (
              <List>
                <List.Item onClick={handleBackToList}>← Back to List</List.Item>
                <List.Item onClick={() => handlePDFDownload(currentTranscription.pdfFile)}>
                  📄 Download PDF
                </List.Item>
                <List.Item onClick={closeTranscriptions}>Close</List.Item>
              </List>
            ),
          },
        ]}
      >
        <S.layoutMainContent bg="white" boxShadow="in">
          <S.textModal>
            <div style={{ marginBottom: '20px' }}>
              <Button onClick={handleBackToList} style={{ marginBottom: '15px' }}>
                ← Back to Transcriptions
              </Button>
            </div>
            
            <h1>{currentTranscription.title}</h1>
            
            <div style={{ marginBottom: '20px', color: '#666' }}>
              <p><strong>Composer:</strong> {currentTranscription.composer}</p>
              {currentTranscription.arranger && (
                <p><strong>Arranger:</strong> {currentTranscription.arranger}</p>
              )}
              <p><strong>Transcribed:</strong> {currentTranscription.date}</p>
              <p><strong>Instrumentation:</strong> {currentTranscription.instrumentation}</p>
              <p><strong>Difficulty:</strong> {currentTranscription.difficulty}</p>
              <p><strong>Key:</strong> {currentTranscription.keySignature} | <strong>Time:</strong> {currentTranscription.timeSignature} | <strong>Tempo:</strong> {currentTranscription.tempo}</p>
              <p><strong>Pages:</strong> {currentTranscription.pages}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Button 
                onClick={() => handlePDFDownload(currentTranscription.pdfFile)}
                style={{ marginRight: '10px' }}
              >
                📄 View/Download PDF
              </Button>
            </div>

            <h3>About this transcription</h3>
            <p>{currentTranscription.description}</p>
            
            {currentTranscription.notes && (
              <>
                <h3>Transcription Notes</h3>
                <p>{currentTranscription.notes}</p>
              </>
            )}

            {currentTranscription.tags && (
              <div style={{ marginTop: '20px' }}>
                <h4>Tags</h4>
                <div>
                  {currentTranscription.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#c0c0c0',
                        padding: '2px 6px',
                        marginRight: '5px',
                        fontSize: '12px',
                        border: '1px solid #808080'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </S.textModal>
        </S.layoutMainContent>
      </S.layoutMain>
    );
  }

  return (
    <S.layoutMain
      isMobile={isMobile}
      title="Transcriptions"
      closeModal={closeTranscriptions}
      height="100%"
      icon={<Mshtml32534 variant="32x32_4" />}
      menu={[
        {
          name: "Options",
          list: (
            <List>
              <List.Item onClick={closeTranscriptions}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <S.layoutMainContent bg="white" boxShadow="in">
        <S.textModal>
          <h1>Transcriptions</h1>
          <p>
            A collection of musical transcriptions featuring jazz arrangements, 
            orchestral works, and various musical styles. Each transcription 
            includes detailed notation and performance notes.
          </p>
          
          <h2>Available Transcriptions</h2>
          
          <List>
            {transcriptionsData.map((transcription) => (
              <List.Item
                key={transcription.id}
                onClick={() => handleTranscriptionClick(transcription)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedTranscriptionId === transcription.id ? '#c0c0c0' : 'transparent',
                  padding: '10px',
                  margin: '5px 0',
                  border: '1px solid #808080'
                }}
              >
                <div>
                  <strong>{transcription.title}</strong>
                  <br />
                  <small style={{ color: '#666' }}>
                    {transcription.composer}
                    {transcription.arranger && ` (arr. ${transcription.arranger})`}
                    {' • '}
                    {transcription.instrumentation}
                    {' • '}
                    {transcription.pages} pages
                  </small>
                  <br />
                  <small style={{ color: '#888', fontStyle: 'italic' }}>
                    {transcription.description.substring(0, 100)}...
                  </small>
                </div>
              </List.Item>
            ))}
          </List>
          
          {transcriptionsData.length === 0 && (
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              No transcriptions available yet. Check back soon!
            </p>
          )}
        </S.textModal>
      </S.layoutMainContent>
    </S.layoutMain>
  );
}

export default Transcriptions;