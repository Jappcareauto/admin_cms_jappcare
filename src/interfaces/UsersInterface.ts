export interface iUsersConnected {

    accessTokenExpiry: Number
    refreshTokenExpiry: Number
    accessToken: string
    refreshToken: string
    isAuthenticated: boolean
    authorities: [
        {
            userId: string,
            authorities: [
                {
                    ROLE: [],
                    PERMISSION: [],
                }
            ],
            authoritiesClear: [
                {
                    ROLE: [],
                    PERMISSION: [],
                }
            ]
        }
    ]
    name: string,
    email: string,
    verified: boolean,
    profileImageId: string,
    profileImageUrl: string,
    id: string,

}


export interface iUsersAction {
    type: string
    users: iUsersConnected | any
}