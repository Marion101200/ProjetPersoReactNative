
import { useState, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, Pressable, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import styles from './ProduitsStyles';
import { initDb, listerFavoris, supprimerFavori } from '../database';

const formaterPrix = (prix) =>
    Number(prix).toFixed(2).replace('.', ',') + ' €';

export default function FavorisScreen() {

    // Récupérer l'utilisateur depuis AuthContext
    const { utilisateur } = useContext(AuthContext);

    const [favoris, setFavoris] = useState([]);

    const estFocus = useIsFocused();

    // Charger les favoris
    const chargerFavoris = async () => {
        try {
            await initDb();

            const liste = await listerFavoris(utilisateur.id);
            setFavoris(liste);

        } catch (e) {
            console.log('Erreur chargement favoris :', e);
        }
    };

    useEffect(() => {
        if (estFocus && utilisateur?.id) {
            chargerFavoris();
        }
    }, [estFocus, utilisateur?.id]);

    // Retirer un favori
    const retirerFavori = async (produitId) => {
        try {
            await supprimerFavori(utilisateur.id, produitId);

            setFavoris((anciens) =>
                anciens.filter((produit) => produit.id !== produitId)
            );

        } catch (e) {
            console.log('Erreur suppression favori :', e);
        }
    };

    // Afficher un produit
    const afficherProduit = ({ item }) => (
        <View style={styles.carte}>

            <View style={styles.ligneProduit}>

                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.carteGauche}>

                    <Text style={styles.nom}>
                        {item.nom}
                    </Text>

                    <Text style={styles.categorie}>
                        {item.categorie}
                    </Text>

                    <Text style={styles.prix}>
                        {formaterPrix(item.prix)}
                    </Text>

                </View>

                <Pressable
                    onPress={() => retirerFavori(item.id)}
                    style={styles.boutonFavori}
                >
                    <Ionicons
                        name="heart"
                        size={25}
                        color="#D96C75"
                    />
                </Pressable>

            </View>
        </View>
    );

    return (
        <SafeAreaView
            style={styles.ecran}
            edges={['left', 'right', 'bottom']}
        >

            <View style={styles.fixe}>

                <Text style={styles.titre}>
                    Mes favoris
                </Text>

                <Text style={styles.sousTitre}>
                    {favoris.length} produit(s) dans vos favoris
                </Text>

            </View>

            <FlatList
                data={favoris}
                keyExtractor={(item) => String(item.id)}
                renderItem={afficherProduit}
                ItemSeparatorComponent={() => (
                    <View style={styles.separateur} />
                )}
                contentContainerStyle={styles.liste}
                ListEmptyComponent={
                    <Text style={styles.vide}>
                        Vous n'avez pas encore de favoris ❤️
                    </Text>
                }
            />

        </SafeAreaView>
    );
}
