import { useState } from "react";
import { Pressable, Text, TextInput, ScrollView } from "react-native";
import styles from "../src/styles";
import { validerFormulaireContact } from "../utils/validation";

export const ContactScreen = () => {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [erreurs, setErreurs] = useState({});
    const [confirmation, setConfirmation] = useState("");

    const verifierFormulaire = () => {

        const form = {
            nom,
            prenom,
            email,
            message,
        };

        const nouvellesErreurs = validerFormulaireContact(form);

        setErreurs(nouvellesErreurs);

        if (Object.keys(nouvellesErreurs).length === 0) {

            setConfirmation("Votre message a bien été envoyé !");

            setNom("");
            setPrenom("");
            setEmail("");
            setMessage("");

        } else {
            setConfirmation("");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.conteneurContact}>

            <Text style={styles.login}>Contact</Text>

            <Text style={styles.texteContact}>
                Besoin d'aide ? N'hésitez pas à nous contacter.
            </Text>

            {/* Nom */}
            <TextInput
                placeholder="Saisir votre Nom"
                placeholderTextColor="#9CA3AF"
                value={nom}
                onChangeText={setNom}
                style={[
                    styles.champ,
                    { marginBottom: 15 },
                    erreurs.nom && styles.champErreur
                ]}
                autoCorrect={false}
            />
            {erreurs.nom && (
                <Text style={styles.erreur}>{erreurs.nom}</Text>
            )}

            {/* Prénom */}
            <TextInput
                placeholder="Saisir votre Prénom"
                placeholderTextColor="#9CA3AF"
                value={prenom}
                onChangeText={setPrenom}
                style={[
                    styles.champ,
                    { marginBottom: 15 },
                    erreurs.nom && styles.champErreur
                ]}
                autoCorrect={false}
            />
            {erreurs.prenom && (
                <Text style={styles.erreur}>{erreurs.prenom}</Text>
            )}

            {/* Email */}
            <TextInput
                placeholder="Saisir votre email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={[
                    styles.champ,
                    { marginBottom: 15 },
                    erreurs.nom && styles.champErreur
                ]}
                autoCorrect={false}
            />
            {erreurs.email && (
                <Text style={styles.erreur}>{erreurs.email}</Text>
            )}

            {/* Message */}
            <TextInput
                placeholder="Saisir votre Message"
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={100}
                textAlignVertical="top"
                style={[
                    styles.champMessage,
                    erreurs.message && styles.champErreur
                ]}
                autoCorrect={true}
            />
            {erreurs.message && (
                <Text style={styles.erreur}>{erreurs.message}</Text>
            )}

            {/* Confirmation */}
            {confirmation !== "" && (
                <Text style={styles.succes}>
                    {confirmation}
                </Text>
            )}

            {/* Bouton */}
            <Pressable
                onPress={verifierFormulaire}
                style={({ pressed }) => [
                    styles.bouton,
                    pressed && styles.boutonPresse,
                ]}
            >
                <Text style={styles.boutonTexte}>
                    Envoyer
                </Text>
            </Pressable>

        </ScrollView>
    );
};
