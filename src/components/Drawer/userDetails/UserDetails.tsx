import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  IconButton,

} from '@mui/material';
import { Close, Email, Person, CalendarToday, LocationOn, Phone, Security } from '@mui/icons-material';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

interface UserDetailsProps {
  userId: string;
  onClose?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  verified: boolean | null;
  profileImageUrl: string;
  dateOfBirth: string | null;
  provider: string;
  location: string | null;
  phones: string[];
  createdAt: string;
  updatedAt: string;
  authorities: {
    userId: string;
    authorities: {
      ROLE: string[];
      PERMISSION: string[];
    };
    authoritiesClear: {
      ROLE: string[];
      PERMISSION: string[];
    };
  };
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await JC_Services('JAPPCARE', `user/by-id/${userId}`, 'GET', '', connectedUsers.accessToken);
      console.log('Response from user details:', response);

      if (response && response.body.meta.statusCode === 200) {
        setUserData(response.body.data);
      } else if (response && response.body.meta.statusCode === 401) {
        setError('Unauthorized to view user details');
      } else {
        setError('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Network error occurred while fetching user details');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRoleName = (role: string) => {
    return role.replace('ROLE_', '').replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          onClose && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {error}
      </Alert>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No user data available</Typography>
      </Box>
    );
  }

  return (
    <Box >


      {/* User Profile Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          // src={userData.profileImageUrl}
          sx={{
            width: 128,
            height: 128,
            bgcolor: 'black',
            border: '4px solid #FB7C37',
            boxShadow: 'inset 0 0 0 4px rgb(255, 255, 255)',
          }}
        >
          <Typography sx={{ color: '#FB7C37', fontSize: '24px', fontWeight: 600 }}>
            {userData.name.charAt(0).toUpperCase()}
          </Typography>
        </Avatar>

        <Typography variant="h5" fontWeight="bold" textAlign="center">
          {userData.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          ROLE: {(userData.authorities?.authoritiesClear?.ROLE)}
        </Typography>

        {userData.verified !== null && (
          <Chip
            label={userData.verified ? 'Verified' : 'Unverified'}
            color={userData.verified ? 'success' : 'warning'}
            size="small"
          />
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Contact Information */}
      <Box sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Person sx={{ mr: 1 }} />
          Contact Information
        </Typography>

        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Email sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1">{userData.email}</Typography>
            </Box>
          </Box>

          {userData.phones && userData.phones.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Phone Numbers</Typography>
                {userData.phones.map((phone, index) => (
                  <Typography key={index} variant="body1">{phone}</Typography>
                ))}
              </Box>
            </Box>
          )}

          {userData.location && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Location</Typography>
                <Typography variant="body1">{userData.location}</Typography>
              </Box>
            </Box>
          )}

          {userData.dateOfBirth && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarToday sx={{ mr: 2, color: 'text.secondary' }} />
              <Box>
                <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
                <Typography variant="body1">{formatDate(userData.dateOfBirth)}</Typography>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>

      {/* Account Information */}
      <Box sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Account Information
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">Provider</Typography>
            <Chip label={userData.provider} variant="outlined" size="small" color='secondary' />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">Created At</Typography>
            <Typography variant="body1">{formatDate(userData.createdAt)}</Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">Last Updated</Typography>
            <Typography variant="body1">{formatDate(userData.updatedAt)}</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Roles and Permissions */}
      {userData.authorities && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Security sx={{ mr: 1 }} />
            Roles & Permissions
          </Typography>

          {userData.authorities.authorities.ROLE && userData.authorities.authorities.ROLE.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Roles ({userData.authorities.authorities.ROLE.length})
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {userData.authorities.authorities.ROLE.map((role, index) => (
                  <Chip
                    key={index}
                    label={formatRoleName(role)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}

          {userData.authorities.authorities.PERMISSION && userData.authorities.authorities.PERMISSION.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Permissions ({userData.authorities.authorities.PERMISSION.length})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This user has {userData.authorities.authorities.PERMISSION.length} permission(s) assigned
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                {userData.authorities?.authoritiesClear?.PERMISSION.map((permission, index) => (
                  <Chip
                    key={index}
                    label={formatRoleName(permission)}
                    color="secondary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;