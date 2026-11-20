import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, ImageBackground, StatusBar, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { listerProduits } from '../database';

const largeurEcran = Dimensions.get('window').width;
const ESPACEMENT = 20;
const largeurCarte = largeurEcran - 40;

const formaterPrix = (prix) =>
    Number(prix).toFixed(2).replace('.', ',') + ' €';

export const AccueilScreen = ({ estConnecte }) => {
    const [produits, setProduits] = useState([]);
    const [indexActuel, setIndexActuel] = useState(0);
    const carrouselRef = useRef(null);

    // Chargement des produits si l'utilisateur est connecté
    useEffect(() => {
        if (!estConnecte) {
            setProduits([]);
            return;
        }

        const chargerProduits = async () => {
            try {
                const resultat = await listerProduits({
                    limite: 8,
                    decalage: 0
                });

                setProduits(resultat);
            } catch (erreur) {
                console.log('Erreur chargement accueil :', erreur);
            }
        };

        chargerProduits();
    }, [estConnecte]);

    // Défilement automatique toutes les 20 secondes
    useEffect(() => {
        if (!estConnecte || produits.length <= 1) return;

        const intervalle = setInterval(() => {
            setIndexActuel((ancienIndex) => {
                const nouvelIndex =
                    (ancienIndex + 1) % produits.length;

                carrouselRef.current?.scrollToIndex({
                    index: nouvelIndex,
                    animated: true
                });

                return nouvelIndex;
            });
        }, 20000);

        return () => clearInterval(intervalle);
    }, [estConnecte, produits]);

    // Carte principale du carrousel
    const afficherProduit = ({ item }) => (
        <View style={{
            width: largeurCarte,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            overflow: 'hidden',
            marginRight: ESPACEMENT
        }}>
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={{
                        width: '100%',
                        height: 210
                    }}
                    resizeMode="cover"
                />
            ) : (
                <View style={{
                    height: 210,
                    backgroundColor: '#E8DED3',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: '#76685D' }}>
                        Image indisponible
                    </Text>
                </View>
            )}

            <View style={{ padding: 15 }}>
                <Text style={{
                    color: '#A18A76',
                    fontSize: 13,
                    marginBottom: 5
                }}>
                    {item.categorie}
                </Text>

                <Text style={{
                    fontSize: 19,
                    fontWeight: 'bold',
                    color: '#3D3530'
                }}>
                    {item.nom}
                </Text>

                <Text style={{
                    fontSize: 17,
                    color: '#A77B61',
                    fontWeight: 'bold',
                    marginTop: 8
                }}>
                    {formaterPrix(item.prix)}
                </Text>
            </View>
        </View>
    );

    // Petites cartes des autres sections
    const afficherPetiteCarte = ({ item }) => (
        <View style={{
            width: 165,
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            overflow: 'hidden',
            marginRight: 12
        }}>
            {item.image ? (
                <Image
                    source={{ uri: item.image }}
                    style={{
                        width: '100%',
                        height: 135
                    }}
                    resizeMode="cover"
                />
            ) : (
                <View style={{
                    height: 135,
                    backgroundColor: '#E8DED3'
                }} />
            )}

            <View style={{ padding: 10 }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontWeight: 'bold',
                        color: '#3D3530',
                        fontSize: 14
                    }}
                >
                    {item.nom}
                </Text>

                <Text style={{
                    color: '#A77B61',
                    fontWeight: 'bold',
                    marginTop: 5
                }}>
                    {formaterPrix(item.prix)}
                </Text>
            </View>
        </View>
    );

    // ACCUEIL POUR LES UTILISATEURS NON CONNECTÉS
    if (!estConnecte) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#3D3530'
            }}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />

                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end'
                    }}
                    resizeMode="cover"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                    }}>
                        <View style={{
                            backgroundColor: '#F7F3EF',
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            padding: 30,
                            alignItems: 'center',
                            paddingBottom: 45
                        }}>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 'bold',
                                color: '#3D3530',
                                textAlign: 'center',
                                marginBottom: 12
                            }}>
                                Bienvenue dans notre boutique !
                            </Text>

                            <Text style={{
                                fontSize: 16,
                                color: '#76685D',
                                textAlign: 'center',
                                lineHeight: 25
                            }}>
                                Connectez-vous pour découvrir notre catalogue
                                et retrouver tous nos produits de décoration.
                            </Text>

                            <Text style={{
                                fontSize: 14,
                                color: '#A77B61',
                                fontWeight: 'bold',
                                marginTop: 20,
                                textAlign: 'center'
                            }}>
                                Connectez-vous pour commencer votre découverte
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    // ACCUEIL POUR LES UTILISATEURS CONNECTÉS
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#F7F3EF'
        }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Bannière de bienvenue */}
                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'
                    }}
                    style={{
                        height: 300,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    resizeMode="cover"
                >
                    <View style={{
                        flex: 1,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.40)',
                        padding: 25
                    }}>
                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 34,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: 12
                        }}>
                            Bienvenue !
                        </Text>

                        <Text style={{
                            color: '#FFFFFF',
                            fontSize: 16,
                            textAlign: 'center',
                            lineHeight: 24
                        }}>
                            Découvrez notre univers de décoration
                            et trouvez l'inspiration pour votre intérieur.
                        </Text>
                    </View>
                </ImageBackground>

                {/* Carrousel automatique */}
                <View style={{ marginTop: 25 }}>
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        color: '#3D3530',
                        marginHorizontal: 20,
                        marginBottom: 15
                    }}>
                        À la une
                    </Text>

                    {produits.length > 0 ? (
                        <>
                            <FlatList
                                ref={carrouselRef}
                                data={produits}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={afficherProduit}
                                contentContainerStyle={{
                                    paddingHorizontal: 20
                                }}
                                snapToInterval={largeurCarte + ESPACEMENT}
                                snapToAlignment="start"
                                decelerationRate="fast"
                                getItemLayout={(data, index) => ({
                                    length: largeurCarte + ESPACEMENT,
                                    offset: (largeurCarte + ESPACEMENT) * index,
                                    index
                                })}
                                onScrollToIndexFailed={(info) => {
                                    carrouselRef.current?.scrollToOffset({
                                        offset: info.index * (largeurCarte + ESPACEMENT),
                                        animated: true
                                    });
                                }}
                                onMomentumScrollEnd={(event) => {
                                    const index = Math.round(
                                        event.nativeEvent.contentOffset.x /
                                        (largeurCarte + ESPACEMENT)
                                    );

                                    setIndexActuel(index);
                                }}
                            />

                            {/* Indicateurs du carrousel */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginTop: 15
                            }}>
                                {produits.map((produit, index) => (
                                    <View
                                        key={produit.id}
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginHorizontal: 4,
                                            backgroundColor:
                                                index === indexActuel
                                                    ? '#A77B61'
                                                    : '#D9CEC4'
                                        }}
                                    />
                                ))}
                            </View>
                        </>
                    ) : (
                        <Text style={{
                            marginHorizontal: 20,
                            color: '#76685D'
                        }}>
                            Aucun produit disponible pour le moment.
                        </Text>
                    )}
                </View>

                {/* Nouveautés du mois */}
                <View style={{ marginTop: 35 }}>
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        color: '#3D3530',
                        marginHorizontal: 20,
                        marginBottom: 15
                    }}>
                        Nouveautés du mois
                    </Text>

                    <FlatList
                        data={produits.slice(0, 4)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={afficherPetiteCarte}
                        contentContainerStyle={{
                            paddingHorizontal: 20
                        }}
                    />
                </View>

                {/* À découvrir */}
                <View style={{
                    marginTop: 35,
                    marginBottom: 30
                }}>
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        color: '#3D3530',
                        marginHorizontal: 20,
                        marginBottom: 15
                    }}>
                        À découvrir
                    </Text>

                    <FlatList
                        data={produits.slice(4, 8)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={afficherPetiteCarte}
                        contentContainerStyle={{
                            paddingHorizontal: 20
                        }}
                    />
                </View>

                {/* Avantages de la boutique */}
                <View style={{
                    marginTop: 15,
                    marginBottom: 35,
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: 23,
                        fontWeight: 'bold',
                        color: '#3D3530',
                        marginBottom: 20
                    }}>
                        Pourquoi choisir notre boutique ?
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>

                        {/* Livraison */}
                        <View style={{
                            width: '48%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            padding: 18,
                            alignItems: 'center',
                            marginBottom: 12
                        }}>
                            <Ionicons
                                name="car-outline"
                                size={32}
                                color="#A77B61"
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#3D3530',
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                Livraison à domicile
                            </Text>
                            <Text style={{
                                color: '#76685D',
                                fontSize: 12,
                                textAlign: 'center',
                                marginTop: 5
                            }}>
                                Recevez vos articles directement chez vous.
                            </Text>
                        </View>

                        {/* Paiement sécurisé */}
                        <View style={{
                            width: '48%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            padding: 18,
                            alignItems: 'center',
                            marginBottom: 12
                        }}>
                            <Ionicons
                                name="shield-checkmark-outline"
                                size={32}
                                color="#A77B61"
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#3D3530',
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                Paiement sécurisé
                            </Text>
                            <Text style={{
                                color: '#76685D',
                                fontSize: 12,
                                textAlign: 'center',
                                marginTop: 5
                            }}>
                                Vos achats en toute tranquillité.
                            </Text>
                        </View>

                        {/* Service client */}
                        <View style={{
                            width: '48%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            padding: 18,
                            alignItems: 'center',
                            marginBottom: 12
                        }}>
                            <Ionicons
                                name="headset-outline"
                                size={32}
                                color="#A77B61"
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#3D3530',
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                Service client
                            </Text>
                            <Text style={{
                                color: '#76685D',
                                fontSize: 12,
                                textAlign: 'center',
                                marginTop: 5
                            }}>
                                Une équipe à votre écoute.
                            </Text>
                        </View>

                        {/* Sélection des produits */}
                        <View style={{
                            width: '48%',
                            backgroundColor: '#FFFFFF',
                            borderRadius: 15,
                            padding: 18,
                            alignItems: 'center',
                            marginBottom: 12
                        }}>
                            <Ionicons
                                name="heart-outline"
                                size={32}
                                color="#A77B61"
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#3D3530',
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                Sélection soignée
                            </Text>
                            <Text style={{
                                color: '#76685D',
                                fontSize: 12,
                                textAlign: 'center',
                                marginTop: 5
                            }}>
                                Des articles choisis pour votre intérieur.
                            </Text>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </View>
    );
};
