'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/navbar';
import FooterComponent from '../components/FooterComponent';
import './page.css';

const API         = 'https://api.narrativesbytopher.com/api/get-portfolio.php';
const FILTERS_API = 'https://api.narrativesbytopher.com/api/get-portfolio-filters.php';

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  is_featured: boolean;
  is_nda: boolean;
  thumbnail: string | null;
};

type Filters = {
  categories: string[];
  years: string[];
  clients: string[];
};

function PortfolioInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const [items,          setItems]          = useState<PortfolioItem[]>([]);
  const [filters,        setFilters]        = useState<Filters>({ categories: [], years: [], clients: [] });
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState(searchParams.get('search')   ?? '');
  const [sort,           setSort]           = useState(searchParams.get('sort')     ?? 'featured');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? '');
  const [activeYear,     setActiveYear]     = useState(searchParams.get('year')     ?? '');

  useEffect(() => {
    fetch(FILTERS_API)
      .then(r => r.json())
      .then((data: Filters) => setFilters(data))
      .catch(() => {});
  }, []);

  const fetchItems = useCallback(() => {
    setLoading(true);
    const q = new URLSearchParams();
    if (activeCategory) q.set('category', activeCategory);
    if (activeYear)     q.set('year',     activeYear);
    if (search)         q.set('search',   search);
    if (sort)           q.set('sort',     sort);
    fetch(`${API}?${q}`)
      .then(r => r.json())
      .then((data: PortfolioItem[]) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory, activeYear, search, sort]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const clearFilters = () => {
    setActiveCategory('');
    setActiveYear('');
    setSearch('');
    setSort('featured');
  };

  const hasActiveFilter   = !!(activeCategory || activeYear || search);
  const activeFilterLabel = [activeCategory, activeYear, search ? `"${search}"` : ''].filter(Boolean).join(' · ');

  return (
    <>
      <Navbar />
      <section className="portfolio-section" id="work">
        <div className="portfolio-container">

          {/* Search + Sort */}
          <div className="portfolio-toolbar">
            <input
              className="portfolio-search"
              type="text"
              placeholder="Search projects or clients…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select className="portfolio-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured first</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          {/* Category pills */}
          <div className="portfolio-filter-bar">
            <button className={`filter-item ${!activeCategory ? 'active' : ''}`} onClick={() => setActiveCategory('')}>
              <span className="filter-text">All</span>
              {!activeCategory && <motion.div layoutId="cat-line" className="filter-underline" />}
            </button>
            {filters.categories.map(cat => (
              <button
                key={cat}
                className={`filter-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(activeCategory === cat ? '' : cat)}
              >
                <span className="filter-text">{cat}</span>
                {activeCategory === cat && <motion.div layoutId="cat-line" className="filter-underline" />}
              </button>
            ))}
          </div>

          {/* Year pills */}
          {filters.years.length > 0 && (
            <div className="portfolio-year-bar">
              {filters.years.map(year => (
                <button
                  key={year}
                  className={`year-pill ${activeYear === year ? 'active' : ''}`}
                  onClick={() => setActiveYear(activeYear === year ? '' : year)}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {/* Active filter chip + count */}
          <div className="portfolio-meta-row">
            {hasActiveFilter && (
              <button className="active-filter-chip" onClick={clearFilters}>
                {activeFilterLabel} <span className="chip-x">×</span>
              </button>
            )}
            {!loading && (
              <span className="portfolio-count">
                {items.length} {items.length === 1 ? 'project' : 'projects'}
              </span>
            )}
          </div>

          {/* Grid */}
          <motion.div layout className="portfolio-grid">
            <AnimatePresence mode="popLayout">
              {loading && (
                <div key="loader" className="portfolio-loading">
                  <div className="portfolio-spinner" />
                </div>
              )}
              {!loading && items.length === 0 && (
                <p key="empty" className="portfolio-empty">No projects found.</p>
              )}
              {!loading && items.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="portfolio-card"
                  onClick={() => router.push(`/portfolio/${item.id}`)}
                >
                  {/* Video player */}
                  <div className="portfolio-img-wrapper">
                    <img src={item.thumbnail ?? '/images/img-1.jpeg'} alt={item.title} className="portfolio-img" />
                    <div className="portfolio-overlay">
                      <span>{item.is_nda ? 'NDA — Confidential' : 'View Project'}</span>
                    </div>
                    {item.is_featured && <span className="featured-badge">★ Featured</span>}
                    {item.is_nda      && <span className="nda-badge">🔒 NDA</span>}
                  </div>
                  <div className="portfolio-details">
                    <p className="item-category">
                      {[item.category, item.year].filter(Boolean).join(' · ')}
                    </p>
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-subtitle">{item.subtitle}</p>
                    <p className="item-description">{item.description}</p>

                    <div className="item-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="item-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="item-meta">
                      <div className="meta-row">
                        <span className="meta-label">Client</span>
                        <span className="meta-value">{item.client}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Year</span>
                        <span className="meta-value">{item.year}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-label">Services</span>
                        <span className="meta-value">{item.services.join(' · ')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
      <FooterComponent />
    </>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense>
      <PortfolioInner />
    </Suspense>
  );
}
