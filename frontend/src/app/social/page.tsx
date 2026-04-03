'use client';

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Chip,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { SOCIAL_ACCOUNTS_QUERY } from '@/graphql/queries';
import { CONNECT_SOCIAL_MUTATION, DISCONNECT_SOCIAL_MUTATION } from '@/graphql/mutations';
import { VENDORS_QUERY } from '@/graphql/queries';

const platformColors: Record<string, string> = {
  TIKTOK: '#ff0050',
  INSTAGRAM: '#e1306c',
  YOUTUBE: '#ff0000',
};

const platformLabels: Record<string, string> = {
  TIKTOK: 'TikTok',
  INSTAGRAM: 'Instagram',
  YOUTUBE: 'YouTube',
};

export default function SocialPage() {
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('TIKTOK');
  const [accountName, setAccountName] = useState('');

  const { data: vendorsData } = useQuery(VENDORS_QUERY);
  const { data: socialData, refetch } = useQuery(SOCIAL_ACCOUNTS_QUERY, {
    variables: { vendorId: '' },
    skip: true,
  });
  const [connectSocial] = useMutation(CONNECT_SOCIAL_MUTATION);
  const [disconnectSocial] = useMutation(DISCONNECT_SOCIAL_MUTATION);

  const handleConnect = async () => {
    if (!selectedVendorId || !selectedPlatform) return;
    try {
      await connectSocial({
        variables: {
          input: {
            vendorId: selectedVendorId,
            platform: selectedPlatform,
            accountName: accountName || undefined,
            // Note: In production, this would use OAuth flow
            accessToken: 'placeholder-access-token',
          },
        },
      });
      setConnectDialogOpen(false);
      setAccountName('');
    } catch (err) {
      console.error('Failed to connect social account:', err);
    }
  };

  const handleDisconnect = async (id: string) => {
    try {
      await disconnectSocial({ variables: { id } });
    } catch (err) {
      console.error('Failed to disconnect:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            Social Accounts
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Connect TikTok, Instagram, or YouTube to auto-post videos
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setConnectDialogOpen(true)}
        >
          Connect Account
        </Button>
      </Box>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 4 }}>
        Connect your social media accounts to automatically post generated videos. OAuth
        authentication is handled securely through each platform.
      </Alert>

      {/* Connected Accounts */}
      {!socialData?.socialAccounts?.length && (
        <Card sx={{ textAlign: 'center', py: 6 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              No connected accounts
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Connect TikTok, Instagram, or YouTube to start posting videos automatically
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setConnectDialogOpen(true)}
            >
              Connect Account
            </Button>
          </CardContent>
        </Card>
      )}

      {socialData?.socialAccounts && socialData.socialAccounts.length > 0 && (
        <Grid container spacing={3}>
          {socialData.socialAccounts.map((account: any) => (
            <Grid item xs={12} sm={6} md={4} key={account.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      {platformLabels[account.platform] || account.platform}
                    </Typography>
                    <Chip
                      label="Connected"
                      size="small"
                      sx={{
                        backgroundColor: `${platformColors[account.platform] || '#888'}20`,
                        color: platformColors[account.platform] || '#888',
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                  {account.accountName && (
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      @{account.accountName}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDisconnect(account.id)}
                  >
                    Disconnect
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Connect Dialog */}
      <Dialog open={connectDialogOpen} onClose={() => setConnectDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Connect Social Account</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Vendor</InputLabel>
              <Select
                value={selectedVendorId}
                label="Vendor"
                onChange={(e) => setSelectedVendorId(e.target.value)}
              >
                {vendorsData?.vendors?.map((v: any) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={selectedPlatform}
                label="Platform"
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <MenuItem value="TIKTOK">TikTok</MenuItem>
                <MenuItem value="INSTAGRAM">Instagram</MenuItem>
                <MenuItem value="YOUTUBE">YouTube</MenuItem>
              </Select>
            </FormControl>

            <Alert severity="warning">
              In production, this would redirect to OAuth flow. Placeholder token is used for development.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConnectDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConnect}
            disabled={!selectedVendorId}
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
