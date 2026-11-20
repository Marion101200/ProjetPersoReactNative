import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import InscriptionScreen from '../screens/InscriptionScreen';
import ModifierCompteScreen from '../screens/ModifierCompteScreen';
import CommandesScreen from '../screens/CommandesScreen';
import DrawerNavigator from './DrawerNavigator';
import PanierScreen from '../screens/PanierScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  // Récupération de l'utilisateur depuis AuthContext
  const { utilisateur, setUtilisateur } = useContext(AuthContext);

  console.log('UTILISATEUR DANS TAB :', utilisateur);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Menu') {
            iconName = 'home-outline';
          } else if (route.name === 'Login') {
            iconName = 'log-in-outline';
          } else if (route.name === 'Inscription') {
            iconName = 'person-add-outline';
          } else if (route.name === 'ModifierCompte') {
            iconName = 'person-circle-outline';
          } else if (route.name === 'Commandes') {
            iconName = 'receipt-outline';
          } else if (route.name === 'Deconnexion') {
            iconName = 'log-out-outline';
          } else if (route.name === 'Panier') {
            iconName = 'cart-outline';
          }

          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}
    >

      <Tab.Screen
        name="Menu"
        options={{ tabBarLabel: 'Accueil' }}
      >
        {(props) => (
          <DrawerNavigator
            {...props}
            estConnecte={!!utilisateur}
            utilisateur={utilisateur}
            setUtilisateur={setUtilisateur}
          />
        )}
      </Tab.Screen>

      {!utilisateur ? (
        <>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
          />

          <Tab.Screen
            name="Inscription"
            component={InscriptionScreen}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Panier"
            options={{ tabBarLabel: 'Panier' }}
          >
            {(props) => (
              <PanierScreen
                {...props}
                utilisateur={utilisateur}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="ModifierCompte"
            options={{ tabBarLabel: 'Modifier compte' }}
          >
            {(props) => (
              <ModifierCompteScreen
                {...props}
                utilisateur={utilisateur}
                setUtilisateur={setUtilisateur}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Commandes"
            component={CommandesScreen}
            options={{ tabBarLabel: 'Mes commandes' }}
          />

          <Tab.Screen
            name="Deconnexion"
            component={() => null}
            options={{
              tabBarLabel: `${utilisateur.prenom} · Déconnexion`,
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                setUtilisateur(null);
              },
            }}
          />
        </>
      )}

    </Tab.Navigator>
  );
}
