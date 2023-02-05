interface UserProfile {
    _id: string;
    emailVerified: boolean;
    profilePicture: string;
    email: string;
    name: string;
    username: string;
    bio: string;
}

export default UserProfile;