import { iUsersAction, iUsersConnected } from "../../interfaces/UsersInterface";

const initialState: iUsersConnected = {
    accessTokenExpiry: 0,
    refreshTokenExpiry: 0,
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
    name: '',
    email: '',
    verified: false,
    profileImageId: '',
    profileImageUrl: '',
    id: '',
    authorities: [
        {
            userId: '',
            authorities: [
                {
                    ROLE: [],
                    PERMISSION: [],
                },
            ],
            authoritiesClear: [
                {
                    ROLE: [],
                    PERMISSION: [],
                },
            ],
        },
    ],
};



const users = (state: iUsersConnected = initialState, action: iUsersAction): iUsersConnected => {

    let nextstate = initialState;

    switch (action.type) {
        case "LOGIN":
            // Assuming action.users contains the updated user information after login
            nextstate = {
                ...state,
                ...action.users,
                isAuthenticated: true
            };

            return nextstate || state;

        //    case "UPDATE-USER":
        //         nextstate = {
        //             ...state,
        //             ...action.users,
        //             isAuthenticated: true
        //         };

        case "LOGOUT":
            return initialState;

        default:
            return nextstate || state;
    }
};

export default users;
