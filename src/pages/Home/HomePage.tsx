import { useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box, Container, Typography, Button, Card, CardContent, Grid,
  Chip, Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import {
  Bolt as BoltIcon,
  LiveTv as LiveTvIcon,
  AutoAwesome as AutoAwesomeIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { PATHS } from '@/routes/paths';
import { Footer } from '@/components/common/Footer';

/** Public landing for VideoSync Clips — Kick + Twitch daily clip campaigns. */
export function HomePage() {
  const [params] = useSearchParams();

  // Referral capture: ?ref={code} → stored for registration attribution.
  useEffect(() => {
    const ref = params.get('ref');
    if (ref) localStorage.setItem('vs_ref', ref);
  }, [params]);

  return (
    <>
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
        <Chip
          label="Daily AI clip campaigns for Kick & Twitch"
          color="primary"
          sx={{ mb: 2 }}
        />
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
          VideoSync Clips
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 720, mx: 'auto' }}>
          Turn streams into daily short-form content. Our AI watches Kick VODs and
          Twitch streams, cuts viral highlights with captions and branding, and
          auto-posts them to your connected social accounts.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
          <Button variant="contained" size="large" component={RouterLink} to={PATHS.REGISTER}>
            Start Clipping — $199/mo
          </Button>
          <Button variant="outlined" size="large" component={RouterLink} to={PATHS.LOGIN}>
            Sign In
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                <BoltIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                Kick Auto-Clipper
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Point us at Kick streamers (or run a clipping channel) — fresh clips
                from their VODs every day, with karaoke captions, logo, zooms, and outro.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List dense>
                {['Daily VOD monitoring', 'Viral-moment detection', 'Branded vertical edits', 'Auto-posting via connected accounts'].map((b) => (
                  <ListItem key={b} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ color: 'primary.main', mb: 1 }}>
                <LiveTvIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                Twitch Clipping
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Streamers get every broadcast turned into shorts; clip channels get
                daily highlights from the biggest Twitch creators — captioned and posted.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List dense>
                {['Stream + VOD sourcing', 'Clipper-channel support', 'Captions & thumbnails', 'Scheduled daily posting'].map((b) => (
                  <ListItem key={b} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
            <AutoAwesomeIcon color="primary" />
            <ScheduleIcon color="primary" />
          </Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
            $199/month
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            One subscription. Both services. Up to 20 connected accounts and 3
            posts a day. Cancel anytime.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to={PATHS.REGISTER}>
            Get Started
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Need more accounts? Agency 50 (50 accounts, $499/mo) and Agency 150
            (150 accounts, $999/mo) are available inside the app after signup.
          </Typography>
        </CardContent>
      </Card>
    </Container>
    <Footer appName="VideoSync Clips" />
  </>
  );
}
