'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Dashboard', href: '/' },
  { label: 'Discover Vendors', href: '/discover' },
  { label: 'My Vendors', href: '/vendors' },
  { label: 'Videos', href: '/videos' },
  { label: 'Social Accounts', href: '/social' },
];

export default function AppHeader() {
  const pathname = usePathname();
  const currentTab = tabs.findIndex((tab) => tab.href === pathname);

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
        borderBottom: '1px solid rgba(201, 169, 98, 0.3)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            💍 WeddingClip
          </Typography>

          <Tabs
            value={currentTab >= 0 ? currentTab : 0}
            sx={{
              flexGrow: 1,
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.href}
                label={tab.label}
                component={Link}
                href={tab.href}
                sx={{
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    color: 'primary.main',
                  },
                  fontWeight: 500,
                }}
              />
            ))}
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
