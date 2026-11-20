import { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { AccueilScreen } from '../screens/AccueilScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { ProduitsScreen } from '../screens/ProduitsScreen';
import FavorisScreen from '../screens/FavorisScreen';
import PanierScreen from '../screens/PanierScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  // Récupération de l'utilisateur depuis AuthContext
  const { utilisateur, setUtilisateur } = useContext(AuthContext);

  const estConnecte = !!utilisateur;

  console.log('UTILISATEUR DANS DRAWER :', utilisateur);

  return (
    <Drawer.Navigator initialRouteName="Accueil">

      {/* Accueil */}
      <Drawer.Screen
        name="Accueil"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {(props) => (
          <AccueilScreen
            {...props}
            estConnecte={estConnecte}
          />
        )}
      </Drawer.Screen>

      {/* Écrans accessibles uniquement si connecté */}
      {estConnecte && (
        <>
          <Drawer.Screen
            name="Produits"
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="albums-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {(props) => (
              <ProduitsScreen
                {...props}
                estConnecte={estConnecte}
                utilisateur={utilisateur}
                setUtilisateur={setUtilisateur}
              />
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="Favoris"
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons
                  name="heart-outline"
                  size={size}
                  color={color}
                />
              ),
            }}
          >
            {(props) => (
              <FavorisScreen
                {...props}
                utilisateur={utilisateur}
              />
            )}
          </Drawer.Screen>

        </>
      )}

      {/* Contact */}
      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="mail-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
}
