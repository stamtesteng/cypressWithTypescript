interface User {
    user: {
        _id: string;
        email: string;
        name: string;
        username: string;
        emailVerified: boolean;
        bio: string;
        profilePicture: string;
    }
}
export default User;