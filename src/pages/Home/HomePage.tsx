import { useEffect } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box, Container, Typography, Button, Card, CardContent, Chip, Divider,
} from '@mui/material';
import {
  Bolt as BoltIcon,
  LiveTv as LiveTvIcon,
  Link as LinkIcon,
  AutoAwesome as AutoIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { PATHS } from '@/routes/paths';
import { Footer } from '@/components/common/Footer';
import { PricingTiers } from '@/components/marketing/PricingTiers';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Faq } from '@/components/marketing/Faq';

/**
 * VideoSync Clips landing. Design: one orchestrated hero entrance; quiet,
 * disciplined sections after it. No scroll-triggered reveals, no single-word
 * headline accenting, sentence-case kickers throughout.
 */
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.08 * i, ease: 'easeOut' as const },
  }),
};

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
              ? 'radial-gradient(ellipse 90% 65% at 50% -10%, rgba(99,102,241,0.22), transparent)'
              : 'radial-gradient(ellipse 90% 65% at 50% -10%, rgba(99,102,241,0.10), transparent)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 7, md: 11 }, maxWidth: 780 }}>
            <motion.div variants={rise} initial="hidden" animate="show" custom={0}>
              <Chip
                label="Daily clip campaigns for Kick and Twitch"
                color="primary"
                variant="outlined"
                sx={{ mb: 3 }}
              />
            </motion.div>
            <motion.div variants={rise} initial="hidden" animate="show" custom={1}>
              <Typography
                variant="h2"
                gutterBottom
                sx={{ fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.08 }}
              >
                Streams go in. Shorts come out. Every day.
              </Typography>
            </motion.div>
            <motion.div variants={rise} initial="hidden" animate="show" custom={2}>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ lineHeight: 1.65, fontWeight: 400 }}>
                VideoSync Clips watches Kick VODs and Twitch streams, cuts the
                moments worth posting, and publishes them captioned and branded
                to your connected accounts.
              </Typography>
            </motion.div>
            <motion.div variants={rise} initial="hidden" animate="show" custom={3}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
                <Button variant="contained" size="large" component={RouterLink} to={PATHS.REGISTER}>
                  Start clipping
                </Button>
                <Button variant="outlined" size="large" component={RouterLink} to={PATHS.LOGIN}>
                  Sign in
                </Button>
              </Box>
            </motion.div>
            <motion.div variants={rise} initial="hidden" animate="show" custom={4}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5 }}>
                $199 a month. Unlimited campaigns. Render once, publish everywhere.
              </Typography>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
            Two services, one subscription
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Cover streamers and the channels that clip them — from the same $199 plan.
          </Typography>
          <Box sx={{ display: 'grid', gap: 2.5, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
            {[
              { Icon: BoltIcon, t: 'Kick Auto-Clipper', b: 'Point us at Kick streamers — or run a clipping channel. Fresh clips from their VODs every day: karaoke captions, logo, reaction zooms, outro cards.' },
              { Icon: LiveTvIcon, t: 'Twitch Clipping', b: 'Streamers get every broadcast turned into shorts. Clip channels get daily highlights from the biggest Twitch creators — captioned and posted.' },
            ].map((s) => (
              <Card key={s.t} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    <s.Icon sx={{ fontSize: 36 }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {s.t}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {s.b}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
            How it works
          </Typography>
          <HowItWorks
            steps={[
              { Icon: LinkIcon, title: 'Connect', body: 'Link your YouTube, TikTok, Instagram, and Facebook accounts — up to 20 on every plan. Point campaigns at Kick or Twitch sources.' },
              { Icon: AutoIcon, title: 'Brief', body: 'Describe the vibe once: funny moments, high-energy plays, chill highlights. Set the pace — up to 5 posts a day.' },
              { Icon: ScheduleIcon, title: 'Wake up to posts', body: 'AI renders each slot once and publishes it to every account you selected. Pause or cancel anytime.' },
            ]}
          />
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
            Pricing
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            One subscription covers both services and unlimited campaigns.
          </Typography>
          <PricingTiers
            tiers={[
              { id: 'base', name: 'Starter', price: '$199', accounts: 20, blurb: 'For creators and small clip pages.', featured: true },
              { id: 'agency50', name: 'Agency 50', price: '$499', accounts: 50, blurb: 'For growing clip networks.' },
              { id: 'agency150', name: 'Agency 150', price: '$999', accounts: 150, blurb: 'For large-scale operations.' },
            ]}
          />
        </Box>

        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
            Questions
          </Typography>
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

        <Box sx={{ mb: 8 }}>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
            Ready when your next stream ends
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
            Set up a campaign in minutes. Tomorrow's clips are already scheduled.
          </Typography>
          <Button variant="contained" size="large" component={RouterLink} to={PATHS.REGISTER}>
            Start clipping
          </Button>
        </Box>
      </Container>
      <Footer appName="VideoSync Clips" />
    </>
  );
}
