'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Star as StarIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DISCOVER_VENDORS_QUERY } from '@/graphql/queries';
import { IMPORT_VENDOR_MUTATION } from '@/graphql/mutations';

const categories = [
  { value: 'PHOTOGRAPHER', label: 'Photographer' },
  { value: 'DJ', label: 'DJ / Band' },
  { value: 'VENUE', label: 'Wedding Venue' },
  { value: 'OFFICIANT', label: 'Officiant' },
  { value: 'CATERER', label: 'Caterer' },
  { value: 'FLORIST', label: 'Florist' },
];

export default function DiscoverPage() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('PHOTOGRAPHER');

  const [discoverVendors, { data, loading, error }] = useLazyQuery(DISCOVER_VENDORS_QUERY);
  const [importVendor] = useMutation(IMPORT_VENDOR_MUTATION);

  const handleSearch = () => {
    if (!location.trim()) return;
    discoverVendors({
      variables: {
        input: { location, category, radius: 25000 },
      },
    });
  };

  const handleImport = async (placeId: string) => {
    try {
      await importVendor({
        variables: { placeId, category },
      });
    } catch (err) {
      console.error('Import failed:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Discover Vendors
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Search for wedding vendors using Google Places API
      </Typography>

      {/* Search Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end">
            <TextField
              label="Location"
              placeholder="e.g., Los Angeles, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              helperText="City and state or zip code"
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
              onClick={handleSearch}
              disabled={loading || !location.trim()}
              sx={{ minWidth: 140 }}
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to search vendors: {error.message}
        </Alert>
      )}

      {/* Results */}
      {data?.discoverVendors?.vendors?.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Found {data.discoverVendors.totalResults} vendors
          </Typography>
          <Grid container spacing={3}>
            {data.discoverVendors.vendors.map((vendor: any) => (
              <Grid item xs={12} sm={6} md={4} key={vendor.placeId}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {vendor.name}
                      </Typography>
                      <Chip
                        label={category}
                        size="small"
                        sx={{ backgroundColor: 'primary.main', color: 'secondary.main', fontSize: '0.65rem' }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {vendor.city}, {vendor.state}
                      </Typography>
                    </Box>

                    {vendor.rating && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating
                          value={vendor.rating}
                          max={5}
                          size="small"
                          readOnly
                          icon={<StarIcon sx={{ color: 'primary.main' }} />}
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          ({vendor.reviewCount} reviews)
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => handleImport(vendor.placeId)}
                      sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                    >
                      Import
                    </Button>
                    {vendor.website && (
                      <Button
                        size="small"
                        variant="text"
                        href={vendor.website}
                        target="_blank"
                        sx={{ color: 'text.secondary' }}
                      >
                        Website →
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {data?.discoverVendors?.vendors?.length === 0 && (
        <Alert severity="info">No vendors found. Try a different location or category.</Alert>
      )}
    </Box>
  );
}
