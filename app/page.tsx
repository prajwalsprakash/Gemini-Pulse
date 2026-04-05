'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Share2, ExternalLink, Github, Search, Zap } from 'lucide-react';
import styles from './page.module.css';

const TABS = ["All", "Models", "Research", "Enterprise"];

export default function GeminiHub() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      });
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter((item: any) => {
      const content = (item.title + item.description).toLowerCase();
      const matchesSearch = content.includes(search.toLowerCase());
      const matchesTab = activeTab === "All" || content.includes(activeTab.toLowerCase());
      return matchesSearch && matchesTab;
    });
  }, [news, search, activeTab]);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.header}>
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'}}>
            <Sparkles color="var(--accent)" /> Google AI News Hub
          </div>
          <a href="https://github.com/prajwalsprakash/Gemini-Pulse" target="_blank" style={{color: 'inherit'}}><Github /></a>
        </div>
      </nav>

      <header className={styles.hero}>
        <div className="container">
          <h1>The <span>Gemini</span> Pulse.</h1>
          <p style={{color: 'var(--text-muted)'}}>Real-time Google AI updates and model breakthroughs.</p>
        </div>
      </header>

      <main className="container">
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} style={{position: 'absolute', left: '12px', top: '12px', opacity: 0.5}} />
            <input 
              placeholder="Search news..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            {TABS.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 16px', 
                  borderRadius: '10px', 
                  border: '1px solid var(--border)',
                  background: activeTab === tab ? 'var(--accent)' : 'var(--bg)',
                  color: activeTab === tab ? 'white' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {loading ? (
            <p>Loading the latest from Google AI...</p>
          ) : (
            filteredNews.map((item: any, idx: number) => (
              <div key={idx} className={styles.card}>
                <div className={styles.cardMain}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span className={styles.sourceTag}>{item.source.name}</span>
                    <button 
                      onClick={() => {navigator.clipboard.writeText(item.url); alert('Copied!');}}
                      style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'}}
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                  <h3>{item.title}</h3>
                  <div className={styles.cardDesc}>{item.description}</div>
                </div>
                <div className={styles.cardFooter}>
                  <span style={{fontSize: '0.75rem', opacity: 0.6}}>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  <a href={item.url} target="_blank" style={{textDecoration: 'none', color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    Source <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <footer className={styles.footer}>
          <p>© TheGeminiPulse - Google AI News Hub - by <a href="https://github.com/prajwalsprakash" target="_blank" style={{color: 'var(--accent)', fontWeight: 'bold'}}>Prajwal</a> Powered by <a href="https://newsapi.org" target="_blank" style={{color: 'var(--accent)', fontWeight: 'bold'}}>newsapi.org</a></p>
      </footer>
    </div>
  );
}
