export interface OrderInterface {
        user: {
          name: string,
          email: string,
          password: string,
          verified: string,
          passwordExpiry: string,
          dateOfBirth: string,
          provider: string,
          phones: [
            {
              code: string,
              number: string,
              user: string,
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          roles: [
            {
              user: string,
              role: {
                definition: string,
                id: string,
                createdAt: string,
                updatedAt: string,
                createdBy: string,
                updatedBy: string,
                expired: string
              },
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          permissions: [
            {
              user: string,
              permission: {
                definition: string,
                id: string,
                createdAt: string,
                updatedAt: string,
                createdBy: string,
                updatedBy: string,
                expired: string
              },
              itemId: string,
              itemType: string,
              expiration: string,
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          garages: [
            {
              name: string,
              location: {
                latitude: number,
                longitude: number,
                description: string,
                id: string,
                createdAt: string,
                updatedAt: string,
                createdBy: string,
                updatedBy: string
              },
              owner: string,
              strings: [
                {
                  name: string,
                  vin: string,
                  description: string,
                  garage: string,
                  detail: {
                    string: string,
                    make: string,
                    model: string,
                    year: string,
                    trim: string,
                    transmission: string,
                    driveTrain: string,
                    power: string,
                    bodyType: string,
                    dataType: string,
                    data: string,
                    id: string,
                    createdAt: string,
                    updatedAt: string,
                    createdBy: string,
                    updatedBy: string
                  },
                  media: [
                    {
                      type: string,
                      source: string,
                      string: string,
                      product: string,
                      items: [
                        {
                          sourceUrl: string,
                          capturedUrl: string,
                          type: string,
                          media: string,
                          file: {
                            name: string,
                            type: string,
                            size: number,
                            container: string,
                            id: string,
                            createdAt: string,
                            updatedAt: string,
                            createdBy: string,
                            updatedBy: string
                          },
                          id: string,
                          createdAt: string,
                          updatedAt: string,
                          createdBy: string,
                          updatedBy: string
                        }
                      ],
                      id: string,
                      createdAt: string,
                      updatedAt: string,
                      createdBy: string,
                      updatedBy: string
                    }
                  ],
                  id: string,
                  createdAt: string,
                  updatedAt: string,
                  createdBy: string,
                  updatedBy: string
                }
              ],
              image: {
                name: string,
                type: string,
                size: number,
                container: string,
                id: string,
                createdAt: string,
                updatedAt: string,
                createdBy: string,
                updatedBy: string
              },
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          verificationCodes: [
            {
              code: string,
              user: string,
              expiryDate: string,
              complete: string,
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          paymentOptions: [
            {
              user: string,
              paymentMethod: string,
              approved: string,
              mobileMoney: {
                mobileWstringetNumber: string
              },
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            }
          ],
          profileImage: {
            name: string,
            type: string,
            size: number,
            container: string,
            id: string,
            createdAt: string,
            updatedAt: string,
            createdBy: string,
            updatedBy: string
          },
          id: string,
          createdAt: string,
          updatedAt: string,
          createdBy: string,
          updatedBy: string
        },
        totalPrice: {
          amount: number,
          currency: string
        },
        items: [
          {
            product: {
              name: string,
              description: string,
              price: {
                amount: number,
                currency: string
              },
              stockQuantity: number,
              active: true,
              media: [
                {
                  type: string,
                  source: string,
                  string: string,
                  product: string,
                  items: [
                    {
                      sourceUrl: string,
                      capturedUrl: string,
                      type: string,
                      media: string,
                      file: {
                        name: string,
                        type: string,
                        size: number,
                        container: string,
                        id: string,
                        createdAt: string,
                        updatedAt: string,
                        createdBy: string,
                        updatedBy: string
                      },
                      id: string,
                      createdAt: string,
                      updatedAt: string,
                      createdBy: string,
                      updatedBy: string
                    }
                  ],
                  id: string,
                  createdAt: string,
                  updatedAt: string,
                  createdBy: string,
                  updatedBy: string
                }
              ],
              id: string,
              createdAt: string,
              updatedAt: string,
              createdBy: string,
              updatedBy: string
            },
            quantity: number,
            unitPrice: {
              amount: number,
              currency: string
            },
            order: string,
            id: string,
            createdAt: string,
            updatedAt: string,
            createdBy: string,
            updatedBy: string,
            totalPrice: {
              amount: number,
              currency: string
            }
          }
        ],
        id: string,
        createdAt: string,
        updatedAt: string,
        createdBy: string,
        updatedBy: string
      
}