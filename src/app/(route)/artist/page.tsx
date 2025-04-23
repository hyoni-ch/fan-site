"use client";

import { Box } from "@mui/material";
import ProfileHeader from "./(artistProfile)/profileHeader";
import ProfileInfo from "./(artistProfile)/profileInfo";
import ProfileTabs from "./(tabs)/profileTabs";

const Profile = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fafafa"
      paddingBottom={10}
    >
      <ProfileHeader />
      <ProfileInfo />
      <ProfileTabs />
    </Box>
  );
};

export default Profile;
