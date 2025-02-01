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

}


export interface iUsersAction {
    type: string
    users: iUsersConnected | any
}