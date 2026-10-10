import { useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Button, Chip, Card, CardContent } from '@mui/material';
import {
  Bolt as BoltIcon,
  LiveTv as LiveTvIcon,
  Link as LinkIcon,
  AutoAwesome as AutoIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { PATHS } from '@/routes/paths';
import { Footer } from '@/components/common/Footer';
import { Reveal } from '@/components/marketing/Reveal';
import { PricingTiers } from '@/components/marketing/PricingTiers';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Faq } from '@/components/marketing/Faq';

/** VideoSync Clips — public landing. */
export function HomePage() {
  const [params] = useSearchParams();

  useEffect(() => {
    const ref = params.get('ref');
    if (ref) localStorage.setItem('vs_ref', ref);
  }, [params]);

  return (
    <>
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.25), transparent), radial-gradient(ellipse 60% 50% at 80% 10%, rgba(56,189,248,0.12), transparent)'
              : 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.12), transparent), radial-gradient(ellipse 60% 50% at 80% 10%, rgba(56,189,248,0.06), transparent)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
            <Reveal>
              <Chip
                label="Daily AI clip campaigns for Kick & Twitch"
                color="primary"
                variant="outlined"
                sx={{ mb: 2.5, backdropFilter: 'blur(8px)' }}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                VideoSync Clips
              </Typography>
            </Reveal>
            <Reveal delay={0.16}>
              <Typography variant="h5" color="text.secondary" paragraph sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
                Turn streams into daily short-form content. Our AI watches Kick
                VODs and Twitch streams, cuts viral highlights with captions
                and branding, and auto-posts them to your connected accounts.
              </Typography>
            </Reveal>
            <Reveal delay={0.24}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
                <Button variant="contained" size="large" component={RouterLink} to={PATHS.REGISTER}>
                  Start Clipping — $199/mo
                </Button>
                <Button variant="outlined" size="large" component={RouterLink} to={PATHS.LOGIN}>
                  Sign In
                </Button>
              </Box>
            </Reveal>
            <Reveal delay={0.32}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                One subscription. Unlimited campaigns. Render once, publish everywhere.
              </Typography>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Reveal>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
              Two services, one subscription
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Cover streamers and the channels that clip them — from the same $199 plan.
            </Typography>
          </Reveal>
          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {[
              { Icon: BoltIcon, t: 'Kick Auto-Clipper', b: 'Point us at Kick streamers — or run a clipping channel. Fresh clips from their VODs every day: karaoke captions, logo, reaction zooms, outro cards.' },
              { Icon: LiveTvIcon, t: 'Twitch Clipping', b: 'Streamers get every broadcast turned into shorts. Clip channels get daily highlights from the biggest Twitch creators — captioned and posted.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.08}>
                <Card sx={{ height: '100%', backdropFilter: 'blur(10px)' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      <s.Icon sx={{ fontSize: 38 }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {s.t}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {s.b}
                    </Typography>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Reveal>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
              How it works
            </Typography>
          </Reveal>
          <HowItWorks
            steps={[
              { Icon: LinkIcon, title: 'Connect', body: 'Link your YouTube, TikTok, Instagram, and Facebook accounts — up to 20 on every plan. Point campaigns at Kick or Twitch sources.' },
              { Icon: AutoIcon, title: 'Brief', body: 'Describe the vibe once: funny moments, high-energy plays, chill highlights. Set the pace — up to 5 posts a day.' },
              { Icon: ScheduleIcon, title: 'Wake up to posts', body: 'AI renders each slot once and publishes it to every account you selected. Pause or cancel anytime.' },
            ]}
          />
        </Box>

        <Box sx={{ mb: 8 }}>
          <Reveal>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
              Pricing
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              One subscription covers both services and unlimited campaigns.
            </Typography>
          </Reveal>
          <PricingTiers
            tiers={[
              { id: 'base', name: 'Starter', price: '$199', accounts: 20, blurb: 'For creators and small clip pages.', featured: true },
              { id: 'agency50', name: 'Agency 50', price: '$499', accounts: 50, blurb: 'For growing clip networks.' },
              { id: 'agency150', name: 'Agency 150', price: '$999', accounts: 150, blurb: 'For large-scale operations.' },
            ]}
          />
        </Box>

        <Box sx={{ mb: 8 }}>
          <Reveal>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
              Questions
            </Typography>
          </Reveal>
          <Faq
            items={[
              { q: 'How many campaigns can I run?', a: 'As many as you want. Your subscription covers the app, not the campaign.' },
              { q: 'How many accounts can I connect?', a: '20 across YouTube, TikTok, Instagram, and Facebook on Starter. Agency tiers raise it to 50 or 150.' },
              { q: 'Is it really 5 posts a day?', a: 'Yes — up to 5 fresh renders daily, each published to all your selected accounts. A 4-account campaign publishes 20 posts from 5 renders.' },
              { q: 'Do I keep the videos?', a: 'Every render is downloadable from your dashboard, forever — whether or not you stay subscribed.' },
              { q: 'What if a platform blocks a post?', a: 'Missed posts re-queue automatically. Chronic blocks pause that account (never the whole campaign) and tell you why.' },
              { q: 'Can I cancel?', a: 'Anytime, in one click. Content already posted stays posted; renders stop at period end. See the Refund Policy.' },
            ]}
          />
        </Box>
      </Container>
      <Footer appName="VideoSync Clips" />
    </>
  );
}
