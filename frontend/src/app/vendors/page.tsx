'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Rating,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Language as WebsiteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { VENDORS_QUERY } from '@/graphql/queries';
import Link from 'next/link';

const categoryColors: Record<string, string> = {
  PHOTOGRAPHER: '#c9a962',
  DJ: '#e056fd',
  VENUE: '#00d4aa',
  OFFICIANT: '#ff6b6b',
  CATERER: '#feca57',
  FLORIST: '#ff9ff3',
};

export default function VendorsPage() {
  const { data, loading, error } = useQuery(VENDORS_QUERY);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            My Vendors
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Manage your imported wedding vendors
          </Typography>
        </Box>
        <Button variant="contained" component={Link} href="/discover">
          + Discover Vendors
        </Button>
      </Box>

      {loading && <Typography>Loading vendors...</Typography>}
      {error && <Typography color="error">Error loading vendors: {error.message}</Typography>}

      {!loading && !error && data?.vendors?.length === 0 && (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No vendors yet
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Discover and import wedding vendors to start creating videos
            </Typography>
            <Button variant="contained" component={Link} href="/discover">
              Discover Vendors →
            </Button>
          </CardContent>
        </Card>
      )}

      {data?.vendors && data.vendors.length > 0 && (
        <Grid container spacing={3}>
          {data.vendors.map((vendor: any) => (
            <Grid item xs={12} sm={6} md={4} key={vendor.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {vendor.name}
                    </Typography>
                    <Chip
                      label={vendor.category}
                      size="small"
                      sx={{
                        backgroundColor: `${categoryColors[vendor.category] || '#888'}20`,
                        color: categoryColors[vendor.category] || '#888',
                        fontWeight: 600,
                        fontSize: '0.65rem',
                      }}
                    />
                  </Box>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {vendor.location?.city}, {vendor.location?.state}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {vendor.website && (
                      <IconButton
                        size="small"
                        href={vendor.website}
                        target="_blank"
                        sx={{ color: 'text.secondary' }}
                      >
                        <WebsiteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<VideoIcon />}
                    component={Link}
                    href={`/videos?vendorId=${vendor.id}`}
                    sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                  >
                    Create Video
                  </Button>
                  <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
