import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
{/* onFermer = Fonction appelée pour fermer la fenêtre. */ }
const ModalPersonnalisee = ({ visible, titre, onFermer, children }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onFermer}
        >
            <View style={styles.fond}>
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={onFermer}
                />

                <View style={styles.contenu}>
                    <View style={styles.entete}>
                        <Text style={styles.titre}>{titre}</Text>

                        <Pressable onPress={onFermer}>
                            <Text style={styles.fermer}>✕</Text>
                        </Pressable>

                    </View>
                    {/* Contenue afficher a l'interieur de la fenetre */}
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fond: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    contenu: {
        width: '100%',
        maxWidth: 450,
        maxHeight: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
    },
    entete: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    titre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5C4540',
    },
    fermer: {
        fontSize: 22,
        color: '#9A8580',
        padding: 5,
    },
});

export default ModalPersonnalisee;