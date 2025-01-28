### **Liste des Fonctionnalités de l'Application**

#### **Fonctionnalités Principales**

1. **Prédiction de la demande hebdomadaire** :  
     
   - Entrée : Période (ex. : *01/12 au 07/12*).  
   - Sortie : Quantité prévue pour chaque produit.

   

2. **Recommandation de commandes automatisée** :  
     
   - Calcul des quantités à commander (Prédiction \- Stock actuel \+ Stock de sécurité).

   

3. **Gestion des dates de péremption** :  
     
   - Tri des produits par date (urgents → non urgents).  
   - Alertes pour produits proches de la péremption.

   

4. **Tableau de bord interactif** :  
     
   - Graphiques des ventes vs. prévisions.  
   - Indicateurs : Taux de gaspillage, précision du modèle, coûts sauvés.

   

5. **Alertes intelligentes** :  
     
   - Surstockage, sous-stockage, promotions recommandées.  
   - Notifications in-app, SMS, ou e-mail.

   

6. **Gestion des utilisateurs** :  
     
   - Rôles : Gestionnaire (accès complet), Employé (accès limité).  
   - Authentification sécurisée (e-mail, Google).

---

#### **Fonctionnalités Secondaires**

7. **Promotions ciblées** :  
     
   - Création de soldes pour écouler les stocks urgents.  
   - Suivi de l’impact des promos sur les ventes.

   

8. **Intégration de données externes** :  
     
   - Météo, jours fériés, événements locaux (ex. : Ramadan).

   

9. **Rapports personnalisables** :  
     
   - Export PDF/Excel (hebdomadaires, mensuels).  
   - Comparaison entre magasins/régions.

   

10. **Simulation de scénarios** :  
      
    - Analyse d’impact des changements de prix, promotions, etc.

---

#### **Bonus (Optionnel)**

11. **Version mobile (PWA)** :  
    - Accès hors ligne aux stocks et alertes.  
12. **Chatbot d’assistance** :  
    - Aide à la navigation ou aux commandes.

---

**Stack Technique** :

- **Frontend** : React.js \+ Chart.js.  
- **Backend** : Python/Flask \+ LSTM.  
- **Base de données** : Firebase/Firestore.  
- **Stockage fichiers** : Cloudinary.  
- **Hébergement** : Firebase Hosting (frontend), Heroku (backend).

👉 **MVP (Minimum Viable Product)** : Fonctionnalités 1 à 6\.  