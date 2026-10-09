import { useCallback, useEffect, useState } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Chip, CircularProgress,
  Alert, Avatar, Divider,
} from '@mui/material';
import { Refresh as RefreshIcon, Add as AddIcon } from '@mui/icons-material';
import { api } from '@/services/api';

interface SocialAccount {
  id: string;
  platform: string;
  account_name: string;
  display_name?: string | null;
  username?: string | null;
  avatar_url?: string | null;
  status?: string;
  is_active?: boolean;
}

const PLATFORMS = ['youtube', 'tiktok', 'instagram', 'facebook'];

/** Connected social accounts — the only place all of them are listed. */
export default function SocialAccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async (doSync: boolean) => {
    if (doSync) {
      setSyncing(true);
      try {
        await api.post('/api/social/sync-accounts');
      } catch {
        /* fall through to cached list */
      } finally {
        setSyncing(false);
      }
    }
    try {
      const res = await api.get('/api/social/my-accounts');
      setAccounts(res.data.accounts || []);
    } catch (e: any) {
      setError(e?.response?.data?.error || e.message || 'Failed to load accounts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-sync on mount: OAuth returns here after connecting, and the DB cache
  // only refreshes via sync — without this, newly connected accounts stay
  // invisible until someone manually syncs.
  useEffect(() => {
    load(true);
  }, [load]);

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

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1 }}>
          Connected Accounts
        </Typography>
        <Button
          variant="outlined"
          startIcon={syncing ? <CircularProgress size={14} /> : <RefreshIcon />}
          onClick={() => load(true)}
          disabled={syncing}
        >
          {syncing ? 'Syncing…' : 'Sync'}
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : accounts.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h6" gutterBottom>
              No accounts connected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connect YouTube, TikTok, Instagram, or Facebook below — campaigns
              post to the accounts you select.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {accounts.map((a) => (
              <Box key={a.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar src={a.avatar_url || undefined} sx={{ width: 36, height: 36 }}>
                  {(a.account_name || a.platform)?.[0]?.toUpperCase()}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography variant="body1" fontWeight={600} noWrap>
                    {a.account_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {a.platform}
                    {a.username ? ` · @${a.username}` : ''}
                  </Typography>
                </Box>
                <Chip
                  label={a.is_active === false ? 'needs reconnect' : a.status || 'connected'}
                  size="small"
                  color={a.is_active === false ? 'warning' : 'success'}
                  variant="outlined"
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
      <Divider sx={{ my: 2 }} />
      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
        Connect a new account
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {PLATFORMS.map((p) => (
          <Button
            key={p}
            variant="outlined"
            startIcon={<AddIcon />}
            disabled={connecting !== null}
            onClick={() => connectPlatform(p)}
          >
            {connecting === p ? 'Opening…' : p[0].toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
        Up to 20 accounts per subscription. Agency tiers raise the limit.
      </Typography>
    </Box>
  );
}
