'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const res = await fetch('https://api.narrativesbytopher.com/api/get-portfolio.php');
    if (!res.ok) return [];
    const items = await res.json() as { id: string }[];
    return items.filter(i => i.id).map(i => ({ id: String(i.id) }));
  } catch {
    return [];
  }
}
import Link from 'next/link';
import CustomVideoPlayer from '../../components/CustomVideoPlayer';
import './page.css';

type PortfolioItem = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  client?: string;
  year?: string;
  category?: string;
  services?: string[];
  tags?: string[];
  is_nda: boolean;
  is_featured: boolean;
  thumbnail?: string;
  video: string | null;
};

const sectionStyle = {
  backgroundColor: '#09090b',
  backgroundImage: `
    linear-gradient(45deg, #0f0f12 25%, transparent 25%),
    linear-gradient(-45deg, #0f0f12 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #0f0f12 75%),
    linear-gradient(-45deg, transparent 75%, #0f0f12 75%)
  `,
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
  backgroundAttachment: 'fixed' as const,
};

export default function PortfolioItemPage() {
  const params  = useParams();
  const router  = useRouter();
  const id      = params?.id as string;

  const [item,    setItem]    = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.narrativesbytopher.com/api/get-portfolio-item.php?id=${encodeURIComponent(id)}`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then((data: PortfolioItem | PortfolioItem[]) => {
        const item = Array.isArray(data) ? data[0] : data;
        if (!item) { router.replace('/404'); return; }
        setItem(item);
      })
      .catch(() => router.replace('/404'))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) {
    return (
      <main className="portfolio-detail-page" style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', animation: 'spin 1s linear infinite' }} />
        </div>
      </main>
    );
  }

  if (!item) return null;

  const metaTags: { label: string; href: string }[] = [
    item.category && { label: item.category, href: `/portfolio?category=${encodeURIComponent(item.category)}` },
    item.year     && { label: item.year,      href: `/portfolio?year=${encodeURIComponent(item.year)}` },
    item.client   && { label: item.client,    href: `/portfolio?search=${encodeURIComponent(item.client)}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <main className="portfolio-detail-page" style={sectionStyle}>
      <div className="portfolio-detail-shell">

        <Link href="/portfolio" className="portfolio-detail-back">← All Projects</Link>

        <header className="portfolio-detail-header">
          {item.is_featured && <span className="detail-featured-badge">★ Featured</span>}
          <h1>{item.title}</h1>
          {item.subtitle && <p className="detail-subtitle">{item.subtitle}</p>}

          {metaTags.length > 0 && (
            <div className="portfolio-detail-meta">
              {metaTags.map(tag => (
                <Link key={tag.label} href={tag.href} className="meta-tag">
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
        </header>

        {item.is_nda || !item.video ? (
          <div className="nda-locked">
            <div className="nda-lock-icon">🔒</div>
            <p className="nda-lock-title">This project is under NDA</p>
            <p className="nda-lock-sub">The video for this project is confidential and cannot be shared publicly.</p>
          </div>
        ) : (
          <CustomVideoPlayer src={item.video} poster={item.thumbnail} title={item.title} />
        )}

        {item.description && (
          <section className="portfolio-detail-description">
            <p>{item.description}</p>
          </section>
        )}

        {(item.services?.length || item.tags?.length) ? (
          <div className="detail-extra-meta">
            {item.services && item.services.length > 0 && (
              <div className="detail-meta-group">
                <span className="detail-meta-label">Services</span>
                <div className="detail-tag-row">
                  {item.services.map(s => <span key={s} className="detail-tag">{s}</span>)}
                </div>
              </div>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="detail-meta-group">
                <span className="detail-meta-label">Tags</span>
                <div className="detail-tag-row">
                  {item.tags.map(t => <span key={t} className="detail-tag">{t}</span>)}
                </div>
              </div>
            )}
          </div>
        ) : null}

      </div>
    </main>
  );
}
