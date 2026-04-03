import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { ApolloWrapper } from '@/lib/apollo-provider';
import AppHeader from '@/components/AppHeader';

export const metadata: Metadata = {
  title: 'WeddingClip - AI Video Generator for Wedding Vendors',
  description: 'Transform Google reviews into elegant TikTok and Shorts videos for wedding vendors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ThemeRegistry>
            <AppHeader />
            <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
              {children}
            </main>
          </ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
