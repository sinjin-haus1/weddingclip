'use client';

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import {
  VideoLibrary as VideoIcon,
  Store as VendorIcon,
  Share as SocialIcon,
  PlayArrow as GenerateIcon,
} from '@mui/icons-material';
import Link from 'next/link';

// Mock stats for initial display
const stats = [
  { label: 'Total Vendors', value: '0', icon: <VendorIcon fontSize="large" />, color: '#c9a962' },
  { label: 'Videos Generated', value: '0', icon: <VideoIcon fontSize="large" />, color: '#e056fd' },
  { label: 'Social Posts', value: '0', icon: <SocialIcon fontSize="large" />, color: '#00d4aa' },
];

const quickActions = [
  { label: 'Discover Vendors', href: '/discover', description: 'Find wedding vendors via Google Places' },
  { label: 'Generate Video', href: '/videos', description: 'Create a new video from a review' },
  { label: 'Connect Social', href: '/social', description: 'Link TikTok, Instagram, or YouTube' },
];

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Welcome to WeddingClip — transform Google reviews into elegant social videos
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    backgroundColor: `${stat.color}15`,
                  }}
                >
                  {stat.icon}
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={4} key={action.label}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: 'primary.main',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {action.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {action.description}
                </Typography>
                <Button
                  variant="outlined"
                  component={Link}
                  href={action.href}
                  sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                >
                  Go →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        How It Works
      </Typography>
      <Grid container spacing={2}>
        {[
          { step: '1', title: 'Discover Vendors', desc: 'Search for wedding vendors by location using Google Places API' },
          { step: '2', title: 'Import Reviews', desc: 'Pull in Google reviews for each vendor automatically' },
          { step: '3', title: 'Generate Videos', desc: 'Create elegant 15-30s clips with TTS and wedding-style templates' },
          { step: '4', title: 'Post to Social', desc: 'Publish directly to TikTok, Instagram Reels, or YouTube Shorts' },
        ].map((item) => (
          <Grid item xs={12} sm={6} key={item.step}>
            <Card>
              <CardContent sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  label={item.step}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'secondary.main',
                    fontWeight: 700,
                    fontSize: '1rem',
                    minWidth: 36,
                    height: 36,
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
