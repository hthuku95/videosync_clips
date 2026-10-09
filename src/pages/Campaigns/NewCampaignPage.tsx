import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Card, CardContent, MenuItem, Alert,
  FormGroup, FormControlLabel, Checkbox, CircularProgress,
} from '@mui/material';
import { api } from '@/services/api';
import { campaignService } from '@/services/campaign.service';

const SERVICES = [
  { value: 'kick_auto_clipper', label: 'Kick Auto-Clipper', hint: 'Kick streamer VODs or clip channels' },
  { value: 'twitch_clipping', label: 'Twitch Clipping', hint: 'Twitch channels or clip pages' },
] as const;

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function NewCampaignPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState<'kick_auto_clipper' | 'twitch_clipping'>('kick_auto_clipper');
  const [brief, setBrief] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState<Array<{ id: string; platform: string; account_name: string; is_active: boolean; profile_id?: string | null }>>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [accountsLoading, setAccountsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/social/my-accounts')
      .then((r) => setAccounts((r.data.accounts || []).filter((a: any) => a.is_active !== false)))
      .catch(() => {})
      .finally(() => setAccountsLoading(false));
  }, []);

  const toggleAccount = (id: string) =>
    setSelectedAccounts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const [connecting, setConnecting] = useState<string | null>(null);

  const connectPlatform = async (platform: string) => {
    setConnecting(platform);
    setError('');
    try {
      const res = await api.post('/api/social/my-connect-url', {
        platform,
        app: 'clips',
        redirect_url: window.location.href,
      });
      if (res.data?.success && res.data?.authUrl) {
        window.location.href = res.data.authUrl;
      } else {
        setError(res.data?.error || 'Could not start connection');
      }
    } catch (e: any) {
      setError(e?.response?.data?.error || e.message || 'Could not start connection');
    } finally {
      setConnecting(null);
    }
  };

  const submit = async () => {
    if (!name || !brief) {
      setError('Name and brief are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const targets = accounts.filter((a) => selectedAccounts.includes(a.id));
      const platforms = targets.map((a) => ({ platform: a.platform, account_id: a.id }));
      const profileId = targets.find((a) => a.profile_id)?.profile_id;
      const res = await campaignService.create({
        name,
        service_type: serviceType,
        brief,
        source_url: sourceUrl || undefined,
        schedule: [
          { time: '08:00', platform: 'youtube' },
          { time: '12:00', platform: 'tiktok' },
          { time: '17:00', platform: 'youtube' },
        ],
        platforms,
        posts_per_day: 3,
        start_date: new Date(todayStr()).toISOString(),
        end_date: new Date(todayStr(30)).toISOString(),
        zernio_profile_id: profileId,
      });
      if (res.success && res.id) navigate(`/campaigns/${res.id}`);
      else setError(res.error || 'Failed to create campaign');
    } catch (e: any) {
      setError(e?.response?.data?.error || e.message || 'Failed to create campaign');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 720, mx: 'auto' }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        New Clip Campaign
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        One $199/mo subscription covers everything here. 3 posts a day, auto-rendered and posted.
      </Typography>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            select
            label="Service"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as typeof serviceType)}
            fullWidth
          >
            {SERVICES.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                <Box>
                  <Typography variant="body2" fontWeight={600}>{s.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.hint}</Typography>
                </Box>
              </MenuItem>
            ))}
          </TextField>
          <TextField label="Campaign name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required placeholder="e.g. Daily Neon clips" />
          <TextField
            label="Brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            fullWidth
            required
            multiline
            minRows={3}
            placeholder="What should the AI clip and how should it feel? e.g. Funniest moments, high energy, karaoke captions…"
          />
          <TextField
            label="Source URL (channel or VOD)"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            fullWidth
            placeholder="https://kick.com/neon or https://twitch.tv/jynxzi"
          />
          <Box>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
              Post to these accounts ({selectedAccounts.length} selected)
            </Typography>
            {accountsLoading ? (
              <Box sx={{ display: 'flex', py: 1 }}>
                <CircularProgress size={18} />
              </Box>
            ) : accounts.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No social accounts connected yet. Renders will still run — connect
                accounts in Settings to enable auto-posting.
              </Typography>
            ) : (
              <FormGroup>
                {accounts.map((a) => (
                  <FormControlLabel
                    key={a.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={selectedAccounts.includes(a.id)}
                        onChange={() => toggleAccount(a.id)}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {a.account_name}{' '}
                        <Typography component="span" variant="caption" color="text.secondary">
                          ({a.platform})
                        </Typography>
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            )}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {['youtube', 'tiktok', 'instagram', 'facebook'].map((p) => (
                <Button
                  key={p}
                  size="small"
                  variant="outlined"
                  disabled={connecting !== null}
                  onClick={() => connectPlatform(p)}
                >
                  {connecting === p ? 'Opening…' : `+ Connect ${p[0].toUpperCase() + p.slice(1)}`}
                </Button>
              ))}
            </Box>
          </Box>
          <Button variant="contained" size="large" onClick={submit} disabled={submitting}>
            {submitting ? 'Creating…' : 'Create Campaign'}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
