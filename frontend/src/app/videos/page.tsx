'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow as GenerateIcon,
  Share as ShareIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { VIDEOS_QUERY, VENDORS_QUERY, REVIEWS_QUERY } from '@/graphql/queries';
import { GENERATE_VIDEO_MUTATION, POST_TO_SOCIAL_MUTATION } from '@/graphql/mutations';

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  PENDING: 'default',
  PROCESSING: 'info',
  COMPLETED: 'success',
  FAILED: 'error',
};

const templateLabels: Record<string, string> = {
  ELEGANT: '✨ Elegant',
  RUSTIC: '🌿 Rustic',
  MODERN: '💎 Modern',
  CLASSIC: '📜 Classic',
  FLORAL: '💐 Floral',
};

export default function VideosPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideosPage />
    </Suspense>
  );
}

function VideosPage() {
  const searchParams = useSearchParams();
  const initialVendorId = searchParams.get('vendorId') || '';

  const [selectedVendorId, setSelectedVendorId] = useState(initialVendorId);
  const [selectedReviewId, setSelectedReviewId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('ELEGANT');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const { data: vendorsData } = useQuery(VENDORS_QUERY);
  const { data: reviewsData, refetch: refetchReviews } = useQuery(REVIEWS_QUERY, {
    variables: { vendorId: selectedVendorId },
    skip: !selectedVendorId,
  });
  const { data: videosData, refetch: refetchVideos } = useQuery(VIDEOS_QUERY, {
    variables: { vendorId: selectedVendorId || undefined },
  });
  const [generateVideo, { loading: generating }] = useMutation(GENERATE_VIDEO_MUTATION);
  const [postToSocial, { loading: posting }] = useMutation(POST_TO_SOCIAL_MUTATION);

  const handleCreateVideo = async () => {
    if (!selectedVendorId || !selectedReviewId) return;
    try {
      await generateVideo({
        variables: {
          input: {
            vendorId: selectedVendorId,
            reviewId: selectedReviewId,
            templateStyle: selectedTemplate,
            duration: 15,
          },
        },
      });
      refetchVideos();
      setCreateDialogOpen(false);
    } catch (err) {
      console.error('Failed to generate video:', err);
    }
  };

  const handlePostToSocial = async (accountId: string, platform: string) => {
    try {
      await postToSocial({
        variables: {
          videoId: selectedVideoId,
          input: { accountId, platform },
        },
      });
      refetchVideos();
      setPostDialogOpen(false);
    } catch (err) {
      console.error('Failed to post:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Videos
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Generate and manage wedding review videos
      </Typography>

      {/* Create Video Button */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end">
            <FormControl sx={{ minWidth: 200 }} fullWidth>
              <InputLabel>Vendor</InputLabel>
              <Select
                value={selectedVendorId}
                label="Vendor"
                onChange={(e) => {
                  setSelectedVendorId(e.target.value);
                  setSelectedReviewId('');
                }}
              >
                <MenuItem value="">
                  <em>Select vendor...</em>
                </MenuItem>
                {vendorsData?.vendors?.map((v: any) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<GenerateIcon />}
              onClick={() => setCreateDialogOpen(true)}
              disabled={!selectedVendorId || !reviewsData?.reviews?.length}
            >
              Generate Video
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      {videosData?.videos?.length === 0 && (
        <Alert severity="info">
          No videos yet. Select a vendor and generate your first video!
        </Alert>
      )}

      {videosData?.videos && videosData.videos.length > 0 && (
        <Grid container spacing={3}>
          {videosData.videos.map((video: any) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip
                      label={video.status}
                      size="small"
                      color={statusColors[video.status]}
                    />
                    <Chip
                      label={templateLabels[video.templateStyle] || video.templateStyle}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {video.status === 'PROCESSING' && <LinearProgress sx={{ mb: 2 }} />}

                  {video.status === 'COMPLETED' && video.outputUrl && (
                    <Box sx={{ mb: 2 }}>
                      <video
                        src={video.outputUrl}
                        style={{ width: '100%', borderRadius: 8 }}
                        controls
                      />
                    </Box>
                  )}

                  {video.status === 'FAILED' && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {video.error || 'Video generation failed'}
                    </Alert>
                  )}

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {video.duration}s •{' '}
                    {video.socialPostUrls?.length || 0} social posts
                  </Typography>
                </CardContent>

                {video.status === 'COMPLETED' && (
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ShareIcon />}
                      onClick={() => {
                        setSelectedVideoId(video.id);
                        setPostDialogOpen(true);
                      }}
                      sx={{ borderColor: 'primary.main', color: 'primary.main' }}
                    >
                      Post to Social
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Video Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate New Video</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Select Review</InputLabel>
              <Select
                value={selectedReviewId}
                label="Select Review"
                onChange={(e) => setSelectedReviewId(e.target.value)}
              >
                {reviewsData?.reviews?.map((r: any) => (
                  <MenuItem key={r.id} value={r.id}>
                    "{r.text.substring(0, 50)}..." - {r.reviewerName} ({r.rating}★)
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Template Style</InputLabel>
              <Select
                value={selectedTemplate}
                label="Template Style"
                onChange={(e) => setSelectedTemplate(e.target.value)}
              >
                {Object.entries(templateLabels).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateVideo}
            disabled={generating || !selectedReviewId}
            startIcon={generating ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {generating ? 'Generating...' : 'Generate'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Post to Social Dialog */}
      <Dialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Post to Social</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Select a platform to post this video
          </Typography>
          <Stack spacing={2}>
            {['TIKTOK', 'INSTAGRAM', 'YOUTUBE'].map((platform) => (
              <Button
                key={platform}
                variant="outlined"
                onClick={() => handlePostToSocial('default-account-id', platform)}
                disabled={posting}
                fullWidth
              >
                {platform === 'TIKTOK' && '📱 '}
                {platform === 'INSTAGRAM' && '📸 '}
                {platform === 'YOUTUBE' && '▶️ '}
                {platform.charAt(0) + platform.slice(1).toLowerCase()}
              </Button>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPostDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
