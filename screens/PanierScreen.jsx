
import { useState, useEffect, useMemo, useContext } from 'react';
import { View, Text, Image, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { initDb, listerPanier, modifierQuantitePanier, supprimerDuPanier } from '../database';

const formaterPrix = (prix) =>
    Number(prix).toFixed(2).replace('.', ',') + ' €';

export default function PanierScreen() {

    // Récupérer l'utilisateur depuis AuthContext
    const { utilisateur } = useContext(AuthContext);

    const [articles, setArticles] = useState([]);
    const [chargement, setChargement] = useState(true);

    const estActif = useIsFocused();

    // Charger le panier
    const chargerPanier = async () => {
        try {
            if (!utilisateur?.id) return;

            await initDb();

            const resultat = await listerPanier(utilisateur.id);
            setArticles(resultat);

        } catch (e) {
            console.log('Erreur chargement panier :', e);
            Alert.alert('Erreur', 'Impossible de charger le panier.');

        } finally {
            setChargement(false);
        }
    };

    useEffect(() => {
        if (estActif) {
            chargerPanier();
        }
    }, [estActif, utilisateur?.id]);

    // Modifier la quantité
    const modifierQuantite = async (article, nouvelleQuantite) => {
        try {
            if (nouvelleQuantite < 1) {

                await supprimerDuPanier(
                    utilisateur.id,
                    article.produit_id
                );

            } else {

                await modifierQuantitePanier(
                    utilisateur.id,
                    article.produit_id,
                    nouvelleQuantite
                );
            }

            await chargerPanier();

        } catch (e) {
            Alert.alert('Erreur', e.message);
        }
    };

    // Supprimer un article
    const supprimerArticle = async (article) => {
        try {
            await supprimerDuPanier(
                utilisateur.id,
                article.produit_id
            );

            await chargerPanier();

        } catch (e) {
            console.log(e);
            Alert.alert('Erreur', 'Impossible de supprimer cet article.');
        }
    };

    // Calculer le total avec useMemo
    const total = useMemo(() => {

        return articles.reduce(
            (somme, article) =>
                somme + Number(article.prix) * article.quantite,
            0
        );

    }, [articles]);

    // Afficher le chargement
    if (chargement) {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F8F4F0'
            }}>
                <ActivityIndicator size="large" color="#D9A5A0" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F8F4F0'
        }}>

            <View style={{
                padding: 20,
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 26,
                    fontWeight: 'bold',
                    color: '#5C4540'
                }}>
                    Mon panier
                </Text>

                <Text style={{
                    color: '#9A8580',
                    marginTop: 5
                }}>
                    {articles.length} article(s)
                </Text>
            </View>

            <FlatList
                data={articles}
                keyExtractor={(item) => String(item.produit_id)}
                contentContainerStyle={{
                    padding: 15,
                    flexGrow: 1
                }}
                renderItem={({ item }) => (
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 15,
                        padding: 12,
                        marginBottom: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 10
                            }}
                            resizeMode="cover"
                        />

                        <View style={{
                            flex: 1,
                            marginLeft: 12
                        }}>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#5C4540'
                            }}>
                                {item.nom}
                            </Text>

                            <Text style={{
                                color: '#9A8580',
                                marginTop: 3
                            }}>
                                {item.categorie}
                            </Text>

                            <Text style={{
                                color: '#D96C75',
                                fontWeight: 'bold',
                                marginTop: 5
                            }}>
                                {formaterPrix(item.prix)}
                            </Text>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10
                            }}>

                                <Pressable
                                    onPress={() => modifierQuantite(
                                        item,
                                        item.quantite - 1
                                    )}
                                    style={{
                                        backgroundColor: '#F3E5E2',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#5C4540'
                                    }}>
                                        −
                                    </Text>
                                </Pressable>

                                <Text style={{
                                    marginHorizontal: 15,
                                    fontWeight: 'bold',
                                    color: '#5C4540'
                                }}>
                                    {item.quantite}
                                </Text>

                                <Pressable
                                    onPress={() => modifierQuantite(
                                        item,
                                        item.quantite + 1
                                    )}
                                    disabled={item.quantite >= item.stock}
                                    style={{
                                        backgroundColor: item.quantite >= item.stock
                                            ? '#E5E0DC'
                                            : '#F3E5E2',
                                        width: 30,
                                        height: 30,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#5C4540'
                                    }}>
                                        +
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => supprimerArticle(item)}
                                    style={{
                                        marginLeft: 'auto',
                                        padding: 5
                                    }}
                                >
                                    <Text style={{
                                        color: '#D96C75',
                                        fontSize: 13
                                    }}>
                                        Supprimer
                                    </Text>
                                </Pressable>

                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 30
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#5C4540'
                        }}>
                            Votre panier est vide
                        </Text>

                        <Text style={{
                            color: '#9A8580',
                            marginTop: 8,
                            textAlign: 'center'
                        }}>
                            Découvrez nos produits et ajoutez vos coups de cœur !
                        </Text>
                    </View>
                }
            />

            {articles.length > 0 && (
                <View style={{
                    backgroundColor: '#FFFFFF',
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 15
                    }}>

                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#5C4540'
                        }}>
                            Total
                        </Text>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#D96C75'
                        }}>
                            {formaterPrix(total)}
                        </Text>

                    </View>
                </View>
            )}

        </SafeAreaView>
    );
}
