import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harish R — Machine Learning Engineer & AI Researcher',
  description:
    'Harish R is a Machine Learning Engineer based in Coimbatore, Tamil Nadu, pursuing B.Tech AI & ML. Specializing in Deep Learning, Computer Vision, NLP, and Multimodal AI.',
  keywords: [
    'Harish R',
    'Machine Learning Engineer',
    'AI Researcher',
    'Coimbatore',
    'Sri Shakthi Institute of Engineering and Technology',
    'Deep Learning',
    'Computer Vision',
    'Multimodal AI',
  ],
  authors: [{ name: 'Harish R' }],
  openGraph: {
    title: 'Harish R — Machine Learning Engineer & AI Researcher',
    description: 'Interactive AI Research Laboratory & Digital Universe Portfolio for Harish R.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-bg-void text-text-primary antialiased selection:bg-cyan-accent/30 selection:text-cyan-accent">
        {children}
      </body>
    </html>
  );
}
