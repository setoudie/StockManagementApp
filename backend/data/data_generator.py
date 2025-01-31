import pandas as pd
import numpy as np
import csv
from datetime import datetime, timedelta

# Configuration initiale
np.random.seed(42)  # Reproductibilité

# ======================
# CONFIGURATION DES PRODUITS
# ======================

produits = {
    'Lait_1L': 'Laitage',
    'Yaourt': 'Laitage',
    'Tomates_kg': 'Légumes',
    'Oignons_kg': 'Légumes',
    'Bananes_kg': 'Fruits',
    'Poulet_frais': 'Viandes',
    'Poisson_frais': 'Poissons',
    'Riz_5kg': 'Epicerie',
    'Sucre_1kg': 'Epicerie',
    'Huile_1L': 'Epicerie',
    'Viandes_kg': 'Viandes',
}

parametres_produits = {
    'duree_peremption': {
        'Lait_1L': 7, 'Yaourt': 5, 'Tomates_kg': 5, 'Oignons_kg': 10,
        'Bananes_kg': 5, 'Poulet_frais': 3, 'Poisson_frais': 2,
        'Riz_5kg': 365, 'Sucre_1kg': 730, 'Huile_1L': 550, 'Viandes_kg': 5,
    },
    'prix_base': {
        'Lait_1L': 1200, 'Yaourt': 500, 'Tomates_kg': 300, 'Oignons_kg': 700,
        'Bananes_kg': 2500, 'Poulet_frais': 1500, 'Poisson_frais': 2000,
        'Riz_5kg': 400, 'Sucre_1kg': 800, 'Huile_1L': 600, 'Viandes_kg': 3700,
    },
    'stock_securite': {
        'Lait_1L': 50, 'Yaourt': 80, 'Tomates_kg': 60, 'Oignons_kg': 40,
        'Bananes_kg': 30, 'Poulet_frais': 25, 'Poisson_frais': 100,
        'Riz_5kg': 75, 'Sucre_1kg': 60, 'Huile_1L': 45, 'Viandes_kg': 90,
    }
}

# ======================
# CONFIGURATION DES ÉVÉNEMENTS
# ======================

evenements = {
    'Ramadan': [
        (datetime(2022, 4, 2), datetime(2022, 5, 5)),
        (datetime(2023, 3, 23), datetime(2023, 4, 24)),
        (datetime(2024, 3, 11), datetime(2024, 4, 12))
    ],
    'Tabaski': [
        (datetime(2022, 7, 8), datetime(2022, 7, 12)),
        (datetime(2023, 6, 27), datetime(2023, 7, 1)),
        (datetime(2024, 6, 15), datetime(2024, 6, 19))
    ]
}

augmentation_prix = {
    'Ramadan': {
        'Laitage': (1.25, 0.05),
        'Légumes': (1.30, 0.06),
        'Fruits': (1.35, 0.04),
        'Viandes': (1.50, 0.10),
    },
    'Tabaski': {
        'Viandes': (1.80, 0.10),
        'Epicerie': (1.20, 0.03),
        'Légumes': (1.40, 0.05)
    },
    'Aid_el_Fitr': {
        'Laitage': 1.35,
        'Fruits': 1.50,
        'Viandes': (1.80, 0.10),
    },
    'Tabaski_JourJ': {
        'Viandes': (2.01, 0.50),
        'Epicerie': (2.20, 0.30),
        'Légumes': (1.80, 0.20)
    },
}


# ======================
# FONCTIONS UTILITAIRES
# ======================

def determiner_evenement(date_str):
    date_obj = datetime.strptime(date_str, '%Y-%m-%d')

    # Vérification Ramadan
    for debut, fin in evenements['Ramadan']:
        if debut <= date_obj <= fin:
            if date_obj > fin - timedelta(days=3):
                return 'Aid_el_Fitr'
            return 'Ramadan'

    # Vérification Tabaski
    for debut, fin in evenements['Tabaski']:
        if debut <= date_obj <= fin:
            if date_obj == debut + timedelta(days=2):
                return 'Tabaski_JourJ'
            return 'Tabaski'

    return 'Aucun'


def ajuster_prix(row):
    prix_base = parametres_produits['prix_base'][row['produit']]
    event = row['evenement']
    categorie = row['categorie']

    if event in augmentation_prix:
        if categorie in augmentation_prix[event]:
            if isinstance(augmentation_prix[event][categorie], tuple):
                base_mult, _ = augmentation_prix[event][categorie]
            else:
                base_mult = augmentation_prix[event][categorie]
            return int(prix_base * base_mult)

    return prix_base


# ======================
# GÉNÉRATION DES DONNÉES
# ======================

dates = pd.date_range(start='2022-01-01', end='2024-12-31')
data = []

for date in dates:
    date_str = date.strftime('%Y-%m-%d')
    evenement = determiner_evenement(date_str)

    for produit, categorie in produits.items():
        stock_secu = parametres_produits['stock_securite'][produit]

        # Génération des données de base
        entry = {
            'date': date_str,
            'produit': produit,
            'categorie': categorie,
            'evenement': evenement,
            'duree_peremption': parametres_produits['duree_peremption'][produit],
            'stock_initial': np.random.randint(stock_secu, stock_secu * 3),
            'temperature': np.clip(np.random.normal(35, 3), 25, 45),
            'promotion': np.random.choice([0, 1], p=[0.9, 0.1]),
            'jour_semaine': date.strftime('%A'),
            'weekend': 1 if date.weekday() >= 5 else 0
        }

        # Prix dynamique
        entry['prix_vente'] = ajuster_prix(entry)

        # Génération de la demande
        demande_base = int(parametres_produits['stock_securite'][produit] * 1.7)
        if date.weekday() >= 5:
            demande_base = int(demande_base * 2.3)
        entry['demande_journaliere'] = np.random.poisson(demande_base)

        # Calcul des ventes
        entry['quantite_vendue'] = min(entry['demande_journaliere'], entry['stock_initial'])
        entry['ventes_perdues'] = max(0, entry['demande_journaliere'] - entry['quantite_vendue'])
        entry['chiffre_affaires'] = entry['quantite_vendue'] * entry['prix_vente']

        data.append(entry)

df = pd.DataFrame(data)

# ======================
# SAUVEGARDE FINALE
# ======================

colonnes = [
    'date', 'produit', 'categorie', 'prix_vente',
    'demande_journaliere', 'quantite_vendue', 'ventes_perdues',
    'stock_initial', 'duree_peremption', 'temperature',
    'promotion', 'jour_semaine', 'weekend', 'evenement',
    'chiffre_affaires'
]

df[colonnes].to_csv('dataset_final_dieupeul.csv',
                    index=False,
                    quoting=csv.QUOTE_NONE,
                    escapechar='\\')

print("Dataset généré avec succès !")
print("Exemple de ligne :")
print(df.iloc[100:105].to_string(index=False))