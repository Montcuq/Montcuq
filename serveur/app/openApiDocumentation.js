module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'CanardEcarlate',
        description: 'Deux equipes, une bombe ! Que les meilleurs gagnent !',
        contact: {
            name: 'Ecarlate team',
            email: 'ecarlateec4@gmail.com',
        }
    },
    servers: [
        {
            url: 'http://localhost:3100/',
            description: 'Local server'
        }
    ],
    security: [
        {
            ApiKeyAuth: []
        }
    ],
    tags: [
        {
            name: 'Auth'
        },
        {
            name: 'Room'
        },
        {
            name: 'Game'
        }
    ],
    paths: {
        '/api/auth/pseudo/{id}' : {
            get:{
                tags: ['Auth'],
                description: 'Permet de récupérer le pseudo de l\'utilisateur',
                operationId: 'getPseudo',
                parameters: [
                    {
                        name: 'pseudo',
                        in: 'params',
                        required: true,
                        description: 'Pseudo choiced by the user'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Pseudo disponible ! :)'
                    },
                    '401': {
                        description: 'Pseudo non disponible ! :(',
                    }
                }
            }
        },
        '/api/auth/signup' : {
            post:{
                tags: ['Auth'],
                description: 'Sign up',
                operationId: 'signup',
                parameters: [
                    {
                        name: 'pseudo',
                        in: 'body',
                        required: true,
                        description: 'Pseudo choiced by the user'
                    },
                    {
                        name: 'email',
                        in: 'body',
                        required: true,
                        description: 'Email'
                    },
                    {
                        name: 'password',
                        in: 'body',
                        required: true,
                        description: 'Password choiced by the user'
                    }
                ],
                responses: {
                    '201': {
                        description: 'Utilisateur créé ! :)'
                    },
                    '400': {
                        description: 'Erreur technique save',
                    },
                    '500': {
                        description: 'Erreur technique hash',
                    }
                }
            }
        },
        '/api/auth/login' : {
            post:{
                tags: ['Auth'],
                description: 'Login : Permet de se connecter',
                operationId: 'login',
                parameters: [
                    {
                        name: 'pseudo',
                        in: 'body',
                        required: true,
                        description: 'Pseudo of the user'
                    },
                    {
                        name: 'password',
                        in: 'body',
                        required: true,
                        description: 'Password of the user'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Utilisateur connecté ! :)',
                        content: {
                            'application/json' : {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type : "string",
                                            description : "userId"
                                        },pseudo: {
                                            type : "string",
                                            description : "pseudo"
                                        },
                                        token: {
                                            type : "string",
                                            description : "jwt"
                                        }
                                    }
                                }
                            }
                        },
                    },
                    '401': {
                        description: 'Utilisateur non trouvé ou mot de passe incorrect',
                    },
                    '500': {
                        description: 'Erreur technique',
                    }
                }
            }
        },
        '/api/room/create' : {
            post:{
                tags: ['Room'],
                description: 'Créer salle',
                operationId: 'createRoom',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'The JWT with pseudo and role'
                    },
                    {
                        name: 'room',
                        in: 'body',
                        required: true,
                        description: 'The new room, with room.name, room.nbOfPlayers et room.userId'
                    }
                ],
                responses: {
                    '201': {
                        description: 'Salle créée'
                    },
                    '400': {
                        description: 'Erreur dans la sauvegarde',
                    }
                }
            }
        },
        '/api/room/delete/{roomName}' : {
            delete:{
                tags: ['Room'],
                description: 'Supprimer une salle',
                operationId: 'deleteRoom',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'The JWT with pseudo and role'
                    },
                    {
                        name: 'roomName',
                        in: 'params',
                        required: true,
                        description: 'Nom de la salle'
                    }
                ],
                responses: {
                    '200': {
                        description: 'Salle supprimée'
                    },
                    '401': {
                        description: 'Erreur suppression salle',
                    }
                }
            }
        },
        '/api/game/getPlayer/{userId}' : {
            get:{
                tags: ['Game'],
                description: 'Récupère le joueur',
                operationId: 'getPlayer',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'The JWT with pseudo and role'
                    },
                    {
                        name: 'userId',
                        in: 'params',
                        required: true,
                        description: 'userId'
                    }
                ],
                responses: {
                    '200': {
                        description: 'The player',
                        content: {
                            'application/json' : {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type : "string",
                                            description : "userId"
                                        },pseudo: {
                                            type : "string",
                                            description : "pseudo"
                                        },
                                        activeRoomName: {
                                            type : "string",
                                            description : "activeRoomName"
                                        },
                                        role: {
                                            type : "string",
                                            description : "role"
                                        },
                                        hand: {
                                            type : "list",
                                            description : "hand list cards"
                                        },
                                        isConnected: {
                                            type : "boolean",
                                            description : "isConnected"
                                        },
                                        date: {
                                            type : "string",
                                            description : "date"
                                        }
                                    }
                                }
                            }
                        },

                    }
                }
            }
        },
        '/api/game/selectedPlayer/{pseudo}' : {
            get:{
                tags: ['Game'],
                description: 'Tirer une carte dans le joueur selectionné',
                operationId: 'seletedPlayer',
                parameters: [
                    {
                        name: 'token',
                        in: 'header',
                        required: true,
                        description: 'The JWT with pseudo and role'
                    },
                    {
                        name: 'pseudo',
                        in: 'params',
                        required: true,
                        description: 'Pseudo du joueur selectionné'
                    }
                ],
                responses: {
                }
            }
        },
    },
    "components": {
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "pseudo": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    }
                }
            },
            "Room": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "nbOfPlayers": {
                        "type": "number"
                    },
                    "userId": {
                        "type": "string"
                    },
                    "players": {
                        "type": "array [] of strings"
                    }
                }
            }
        }
    }
};
